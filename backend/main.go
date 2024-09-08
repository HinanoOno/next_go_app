package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"next_go_app/backend/usecase"
)

func main() {

	router := gin.Default()

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
