package token

import (
	"crypto/rand"
	"fmt"
)

// Helper function to Generate a secure token
func Generate() (string, error) {
	token := make([]byte, 16) // Generates a 128-bit token
	_, err := rand.Read(token)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", token), nil
}
