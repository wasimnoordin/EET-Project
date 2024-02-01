package main

import (
	"log"
	"os"

	models "EET-Project/auth"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func init() {
	// Load .env file
	if err := godotenv.Load("environment_variables.env"); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	// Initialize Gin router
	r := gin.Default()

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
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	// Optionally, just to test the connection, you can ping the database
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("failed to get database: %v", err)
	}

	err = sqlDB.Ping()
	if err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	log.Println("Connected to database successfully")

	// Setup route group for API
	api := r.Group("/api")
	{
		api.POST("/register", RegisterHandler)
		api.POST("/login", LoginHandler)
	}

	// Protected API routes
	protectedApi := api.Group("/", AuthMiddleware())
	{
		// Define protected routes here
		protectedApi.GET("/protected-route", ProtectedRouteHandler)
	}

	// Start serving the application
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to port 8080 if not specified
	}
	r.Run(":" + port)
}
