package login

import (
	"EET-Project/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// LoginHandler is now a function that returns a gin.HandlerFunc
func LoginHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		loginResp, err := models.HandleLogin(db, c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, loginResp)
	}
}

// ForgotPasswordHandler sends a password reset email to the user.
func ForgotPasswordHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		forgotPasswordResp, err := models.HandleForgotPassword(db, c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, forgotPasswordResp)
	}
}

// PasswordResetHandler handles the password reset request
func PasswordResetHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		passwordResetResp, err := models.HandlePasswordReset(db, c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, passwordResetResp)
	}
}
