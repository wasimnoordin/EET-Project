package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware is a middleware that checks for a valid JWT token.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		const BearerSchema = "Bearer "
		// authHeader := c.GetHeader("Authorization")
		// if authHeader == "" {
		// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is not provided"})
		// 	return
		// }

		// tokenString := strings.TrimPrefix(authHeader, BearerSchema)
		// token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		// 	return []byte(os.Getenv("JWT_SECRET")), nil
		// })

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		// 	return
		// }

		// if claims, ok := token.Claims.(*UserClaims); ok && token.Valid {
		// 	c.Set("email", claims.Email)
		// } else {
		// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		// 	return
		// }

		c.Next()
	}
}

// ProtectedRouteHandler is an example handler for protected routes.
func ProtectedRouteHandler(c *gin.Context) {
	// Your protected route logic here (can add more)
	c.JSON(http.StatusOK, gin.H{"message": "You have accessed a protected route"})
}
