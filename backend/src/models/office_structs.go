package models

import (
	"gorm.io/gorm"
)

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
