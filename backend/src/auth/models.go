package models

import (
	"gorm.io/gorm"
)

// User struct declaration
type User struct {cd
	gorm.Model
	Name     string
	Email    string `gorm:"type:varchar(100);unique_index"`
	Gender   string `json:"Gender"`
	Password string `json:"Password"`
}
