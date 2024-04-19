package models

import (
	"EET-Project/internal/api/v1/token"
	"errors"
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

// HandleLogin handles user login logic and sets the HTTP response directly
func HandleLogin(db *gorm.DB, c *gin.Context) {
	var loginCredentials struct {
		EmailAddress string `json:"email"`
		Password     string `json:"password"`
	}

	log.Info("Login Handler")

	// Bind JSON payload to struct and handle any error
	if err := c.BindJSON(&loginCredentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Retrieve user from the database based on email
	var user User
	result := db.Where("email_address = ?", loginCredentials.EmailAddress).First(&user)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		}
		return
	}

	// Compare hashed password with the provided password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginCredentials.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
		return
	}

	// Generate JWT token
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := UserClaims{
		Email: user.EmailAddress,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create token"})
		return
	}

	// Send the token back to the client
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// HandleSessionID handles the logic for sending a password reset email
func HandleSessionID(db *gorm.DB, c *gin.Context) (gin.H, error) {
	var requestBody struct {
		EmailAddress string `json:"email"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		return nil, errors.New("invalid request")
	}
	user := User{}

	token, err := token.Generate()
	if err != nil {
		return nil, errors.New("Failed to generate session token")
	}

	// Set token and deadline (24 hours for token expiration)
	user.SessionToken = token
	user.SessionTokenDeadline = time.Now().Add(24 * time.Hour)

	// Save changes to the database
	if err := db.Save(&user).Error; err != nil {
		return nil, errors.New("Failed to save session token")
	}

	// If everything went fine, return a success message
	return gin.H{"message": "Session token generated successfully."}, nil
}

// HandleForgotPassword handles the logic for sending a password reset email
func HandleForgotPassword(db *gorm.DB, c *gin.Context) (gin.H, error) {
	var requestBody struct {
		EmailAddress string `json:"email"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		return nil, errors.New("invalid request")
	}

	user := User{}
	result := db.Where("email_address = ?", requestBody.EmailAddress).First(&user)
	if result.Error != nil {
		return gin.H{"message": "If your email is registered, you will receive a password reset link."}, nil
	}

	token, err := token.Generate()
	if err != nil {
		return nil, errors.New("Failed to generate reset token")
	}

	// Set token and deadline (24 hours for token expiration)
	user.ResetToken = token
	user.ResetTokenDeadline = time.Now().Add(24 * time.Hour)

	// Save changes to the database
	db.Save(&user)

	resetURL := "http://localhost:3000/NewPassword/" + token // Adjust the URL to frontend reset password page
	if err := sendResetEmail(requestBody.EmailAddress, resetURL); err != nil {
		log.Error(err)
		return nil, errors.New("Failed to send reset email")
	}

	return gin.H{"message": "If your email is registered, you will receive a password reset link."}, nil
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

// HandlePasswordReset handles the logic for password reset request
func HandlePasswordReset(db *gorm.DB, c *gin.Context) (gin.H, error) {
	var requestBody struct {
		Token    string `json:"token"`
		Password string `json:"newPassword"`
	}

	// Bind the incoming JSON to requestBody
	if err := c.BindJSON(&requestBody); err != nil {
		return nil, errors.New("invalid request")
	}

	// Find the user by reset token
	var user User
	result := db.Where("reset_token = ? AND reset_deadline > ?", requestBody.Token, time.Now()).First(&user)
	if result.Error != nil {
		return nil, errors.New("invalid or expired token")
	}

	// Hash the new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(requestBody.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("error while hashing new password")
	}

	// Update the user's password and clear the reset token and deadline
	user.Password = string(hashedPassword)
	user.ResetToken = ""
	user.ResetTokenDeadline = time.Time{} // Resets the time to zero value, clearing it

	// Save the user with updated information
	db.Save(&user)

	return gin.H{"message": "Password has been successfully reset"}, nil
}
