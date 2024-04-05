package main

import (
	"log"
	"os"
	"time"

	"EET-Project/internal/api/v1/login"
	"EET-Project/internal/api/v1/registration"
	"EET-Project/internal/api/v1/user"
	"EET-Project/internal/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load .env file
	if err := godotenv.Load("environment_variables.env"); err != nil {
		log.Print("No .env file found")
	}

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS to allow specific origin
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowWildcard:    true,
		MaxAge:           12 * time.Hour,
	}))

	// Use environment variables
	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	// Database connection string
	dsn := "host=" + dbHost + " user=" + dbUser + " password=" + dbPass + " dbname=" + dbName + " port=" + dbPort + " sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Automigrate your User struct to create a table
	if err := db.AutoMigrate(&models.User{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	// Setup route group for API
	api := r.Group("/api")
	{
		api.POST(registration.ApiPathRegister, registration.RegisterHandler(db))
		api.POST(login.ApiPathLogin, login.LoginHandler(db))
		api.POST(login.ApiPathForgotPassword, login.ForgotPasswordHandler(db))
		api.POST(login.ApiPathPasswordReset, login.PasswordResetHandler(db))
		api.GET(user.ApiPathGetUsername, user.GetUsernameHandler(db))
		//api.GET("/getBookings")
		api.GET("/echo/:message", echoHandler(db))
	}

	// Start serving the application
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to port 8080 if not specified
	}
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
