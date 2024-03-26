package main

import (
	"EET-Project/internal/models"
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

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
		token, err := jwt.ParseWithClaims(tokenString, models.UserClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		if claims, ok := token.Claims.(models.UserClaims); ok && token.Valid {
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
