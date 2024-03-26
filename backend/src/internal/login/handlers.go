package login

import (
	"EET-Project/internal/models"
	"EET-Project/internal/token"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// LoginHandler is now a function that returns a gin.HandlerFunc
func LoginHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var loginCredentials struct {
			EmailAddress string `json:"email"`
			Password     string `json:"password"`
		}

		log.Info("Login Handler")

		if err := c.BindJSON(&loginCredentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Log the entire request body content
		bodyContent, _ := c.GetRawData()
		fmt.Printf("Request Body: %s\n", bodyContent)

		var user models.User
		result := db.Where("email_address = ?", loginCredentials.EmailAddress).First(&user)
		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Error finding user"})
			}
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginCredentials.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
			return
		}

		expirationTime := time.Now().Add(1 * time.Hour)
		claims := models.UserClaims{
			Email: user.EmailAddress,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while signing the token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"token": tokenString})
	}
}

// ForgotPasswordHandler sends a password reset email to the user.
func ForgotPasswordHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var requestBody struct {
			EmailAddress string `json:"email"`
		}
		if err := c.BindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		user := models.User{}
		result := db.Where("email_address = ?", requestBody.EmailAddress).First(&user)
		if result.Error != nil {
			c.JSON(http.StatusOK, gin.H{"message": "If your email is registered, you will receive a password reset link."})
			return
		}

		token, err := token.Generate()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate reset token"})
			return
		}

		// Set token and deadline (24 hours for token expiration)
		user.ResetToken = token
		user.ResetDeadline = time.Now().Add(24 * time.Hour)

		// Save changes to the database
		db.Save(&user)

		resetURL := "http://localhost:3000/NewPassword/" + token // Adjust the URL to frontend reset password page
		if err := sendResetEmail(requestBody.EmailAddress, resetURL); err != nil {
			log.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send reset email"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "If your email is registered, you will receive a password reset link."})
	}
}

// PasswordResetHandler handles the password reset request
func PasswordResetHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var requestBody struct {
			Token    string `json:"token"`
			Password string `json:"newPassword"`
		}

		// Bind the incoming JSON to requestBody
		if err := c.BindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		// Find the user by reset token
		var user models.User
		result := db.Where("reset_token = ? AND reset_deadline > ?", requestBody.Token, time.Now()).First(&user)
		if result.Error != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			return
		}

		// Hash the new password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(requestBody.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while hashing new password"})
			return
		}

		// Update the user's password and clear the reset token and deadline
		user.Password = string(hashedPassword)
		user.ResetToken = ""
		user.ResetDeadline = time.Time{} // Resets the time to zero value, clearing it

		// Save the user with updated information
		db.Save(&user)

		c.JSON(http.StatusOK, gin.H{"message": "Password has been successfully reset"})
	}
}

// Helper function to send email
func sendResetEmail(to, passwordResetUrl string) error {
	from := os.Getenv("SMTP_FROM")
	password := os.Getenv("SMTP_PASS")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	message := []byte("To: " + to + "\r\n" +
		"Subject: Password Reset Request\r\n" +
		"\r\n" +
		"You requested a password reset. Click the following link to reset your password:\r\n" + passwordResetUrl +
		"\r\nIf you did not request a password reset, please ignore this email.\r\n")

	log.Info("smtpHost", smtpHost)
	log.Info("smtpPort", smtpPort)
	log.Info("auth", auth)
	log.Info("from", from)
	log.Info("to", to)
	log.Info("message", string(message))

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, message)

}
