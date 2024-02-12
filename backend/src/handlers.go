package main

import (
	models "EET-Project/auth" // Make sure this import path is correct for your project
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Define your UserClaims for JWT
type UserClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

// RegisterHandler is now a function that returns a gin.HandlerFunc
func RegisterHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUser models.User
		if err := c.BindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while hashing password"})
			return
		}
		newUser.Password = string(hashedPassword)

		result := db.Create(&newUser)
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
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := c.BindJSON(&loginCredentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user models.User
		result := db.Where("email = ?", loginCredentials.Email).First(&user)
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

/* TO IMPROVE:

Validation and Error Handling: Ensure robust validation of user input (for both registration and login) and provide meaningful error messages. For example, you could validate the email format and password strength during registration and ensure that error messages do not reveal too much information about the database state or user existence to avoid enumeration attacks.

Duplicate Email Handling: When registering a new user, ensure you handle the case where the email already exists in the database gracefully. This involves checking for duplicate entries before attempting to save a new user and responding with an appropriate error message if a duplicate is found.

Email Verification: After registration, consider implementing an email verification step to confirm the user's email address. This typically involves sending an email with a verification link or code that the user must click or enter to activate their account.

Secure Password Storage: It looks like you're already hashing passwords before storing them, which is great. Ensure you're using a strong hash function (bcrypt is a good choice) and consider adding a salt to each password for additional security.

JWT Token Security: When generating JWT tokens, ensure you're using a secure signing key that's kept secret. Also, consider setting other JWT claims such as issuer (iss) and audience (aud) to add additional layers of validation for your tokens.

Refresh Tokens: For longer web sessions, you might want to implement refresh tokens that allow users to obtain a new access token without re-entering their credentials. This involves creating an additional endpoint to handle refresh token requests.

Logout Functionality: Implement a logout mechanism that invalidates the user's current session or JWT token. Depending on your authentication strategy, this could involve maintaining a list of valid tokens on the server side or simply directing users to a logout page that clears the client-side token.

Rate Limiting and Monitoring: To protect against brute-force attacks, consider adding rate limiting to your login attempts and monitoring for suspicious authentication patterns.

CORS Configuration: If your frontend and backend are served from different origins, you'll need to configure Cross-Origin Resource Sharing (CORS) in Gin to allow your frontend to make requests to your backend.

HTTPS: Ensure that your application is served over HTTPS in production to protect sensitive information transmitted between the client and server.

*/
