package models

import (
	"errors"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// HandleRegister handles the logic for registering a new user
func HandleRegister(db *gorm.DB, c *gin.Context) (gin.H, error) {
	var newUser UserCredentials
	if err := c.BindJSON(&newUser); err != nil {
		return nil, errors.New("Invalid request")
	}

	// Check if the email address is empty
	if newUser.Email == "" {
		return nil, errors.New("Email address cannot be empty")
	}

	// Check if the email address is already registered
	var existingUser User
	result := db.Where("email_address = ?", newUser.Email).First(&existingUser)
	if result.Error == nil {
		return nil, errors.New("Email address already registered")
	} else if result.Error != gorm.ErrRecordNotFound {
		return nil, errors.New("Error checking email uniqueness")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("Error while hashing password")
	}

	// Create a new User model object
	user := User{
		Name:         newUser.Name,
		EmailAddress: newUser.Email,
		Password:     string(hashedPassword),
	}

	// Save the user to the database
	result = db.Create(&user)
	if result.Error != nil {
		return nil, errors.New("Error saving user to the database")
	}
	return gin.H{"message": "User registered successfully"}, nil
}
