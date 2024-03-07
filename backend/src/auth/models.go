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

// Office represents a physical location with multiple floors
type Office struct {
	gorm.Model
	Name        string
	Address     string
	Description string
}

// Floor represents a level within an office, containing multiple areas
type Floor struct {
	gorm.Model
	OfficeID    uint
	Name        string
	Description string
}

// Area represents a specific section of a floor, containing multiple desks
type Area struct {
	gorm.Model
	FloorID     uint
	Name        string
	Description string
}

// Desk represents an individual workspace in an area
type Desk struct {
	gorm.Model
	AreaID      uint
	Name        string
	Description string
}

// Booking represents a reservation of a desk by a user for a specific time period
type Booking struct {
	gorm.Model
	UserID    uint
	DeskID    uint
	Date      time.Time
	StartTime time.Time
	EndTime   time.Time
}
