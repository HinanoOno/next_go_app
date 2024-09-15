package main

import (
	"fmt"
	"time"

	"next_go_app/backend/usecase"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	// CORS設定を追加
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // フロントエンドのURL
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/", func(c *gin.Context) {
		fmt.Println("Hello")
		c.JSON(200, gin.H{
			"message": "Hello",
		})
	})

	router.POST("/upload", func(c *gin.Context) {
		usecase.UploadImg(c)
	})

	router.Run(":8080")
}
