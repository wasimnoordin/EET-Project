package registration

import (
	"EET-Project/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// RegisterHandler is now a function that returns a gin.HandlerFunc
func RegisterHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUser models.UserCredentials
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
