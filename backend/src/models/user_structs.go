package models

import (
	"time"

	"gorm.io/gorm"
)

// User struct declaration
type User struct {
	gorm.Model
	Name          string
	EmailAddress  string `gorm:"type:varchar(100);unique_index"`
	Password      string `json:"Password"`
	ResetToken    string
	ResetDeadline time.Time
}
