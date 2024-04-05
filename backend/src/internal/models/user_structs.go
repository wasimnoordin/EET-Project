package models

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

// User struct declaration
type User struct {
	gorm.Model
	Name                 string
	EmailAddress         string `gorm:"type:varchar(100);unique_index"`
	Password             string `json:"Password"`
	ResetToken           string
	SessionToken         string
	SessionTokenDeadline time.Time
	ResetTokenDeadline   time.Time
}

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
