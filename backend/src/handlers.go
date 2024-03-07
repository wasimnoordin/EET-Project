package main

import (
	models "EET-Project/auth"
	"crypto/rand"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Define your UserClaims for JWT
type UserClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

// Define your UserCredentials struct for registration data
type UserCredentials struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// RegisterHandler is now a function that returns a gin.HandlerFunc
func RegisterHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUser UserCredentials
		if err := c.BindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Check if the email address is empty
		if newUser.Email == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email address cannot be empty"})
			return
		}

		// // Check if the email address ends with "@capgemini.com"
		// if !strings.HasSuffix(newUser.Email, "@capgemini.com") {
		// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email domain. Must be @capgemini.com"})
		// 	return
		// }

		// Check if the email address is already registered
		var existingUser models.User
		result := db.Where("email_address = ?", newUser.Email).First(&existingUser)
		if result.Error == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email address already registered"})
			return
		} else if result.Error != gorm.ErrRecordNotFound {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking email uniqueness"})
			return
		}

		// Now you can use newUser.Name, newUser.Email, and newUser.Password to create the new user account

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while hashing password"})
			return
		}

		// Create a new User model object
		user := models.User{
			Name:         newUser.Name,
			EmailAddress: newUser.Email,
			Password:     string(hashedPassword),
		}

		// Save the user to the database
		result = db.Create(&user)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving user to the database"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
	}
}

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
		claims := &UserClaims{
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

func echoHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		message, _ := c.Params.Get("message")
		log.Info(message)
		c.JSON(http.StatusOK, gin.H{"message": message})
	}
}

// Helper function to generate a secure token
func generateResetToken() (string, error) {
	token := make([]byte, 16) // Generates a 128-bit token
	_, err := rand.Read(token)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", token), nil
}

// Helper function to send email
func sendResetEmail(to, token string) error {
	from := os.Getenv("SMTP_FROM")
	password := os.Getenv("SMTP_PASS")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Updated URL pointing to NewPassword page
	url := "http://localhost:3000/NewPassword?token=" + token
	message := []byte("To: " + to + "\r\n" +
		"Subject: Password Reset Request\r\n" +
		"\r\n" +
		"You requested a password reset. Click the following link to reset your password:\r\n" + url +
		"\r\nIf you did not request a password reset, please ignore this email.\r\n")

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, message)
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

		token, err := generateResetToken()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate reset token"})
			return
		}

		// Set token and deadline (24 hours for token expiration)
		user.ResetToken = token
		user.ResetDeadline = time.Now().Add(24 * time.Hour)

		// Save changes to the database
		db.Save(&user)

		resetURL := "http://localhost:3000/Newpassword" + token // Adjust the URL to your frontend reset password page
		if err := sendResetEmail(requestBody.EmailAddress, resetURL); err != nil {
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

// GetUsernameHandler returns the username of the logged-in user.
func GetUsernameHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract token from Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader { // No Bearer prefix found
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Bearer token not found"})
			return
		}

		// Parse token
		token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		if claims, ok := token.Claims.(*UserClaims); ok && token.Valid {
			// Token is valid, get the user from the database
			var user models.User
			result := db.Where("email_address = ?", claims.Email).First(&user)
			if result.Error != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
				return
			}

			// Return the username
			c.JSON(http.StatusOK, gin.H{"username": user.Name})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
		}
	}
}
