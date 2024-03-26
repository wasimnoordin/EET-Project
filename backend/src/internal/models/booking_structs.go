package models

import (
	"time"

	"gorm.io/gorm"
)

// Booking represents a reservation of a desk by a user for a specific time period
type Booking struct {
	gorm.Model
	UserID    uint
	DeskID    uint
	Date      time.Time
	StartTime time.Time
	EndTime   time.Time
}
