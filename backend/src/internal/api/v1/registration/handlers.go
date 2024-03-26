package registration

import (
	"EET-Project/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// RegisterHandler is now a function that returns a gin.HandlerFunc
func RegisterHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		registerResp, err := models.HandleRegister(db, c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, registerResp)
	}
}
