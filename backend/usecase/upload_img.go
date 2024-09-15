package usecase

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"net/http"
	"path/filepath"
)

func UploadImg(c *gin.Context) {
	file, err := c.FormFile("file")

	if err != nil {
		c.String(http.StatusBadRequest, "get form err: %s", err.Error())
		return
	}

	savepath := filepath.Join("./images", file.Filename)

	if err := c.SaveUploadedFile(file, savepath); err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("upload error: %s", err.Error()))
		return
	}
	c.String(http.StatusOK, fmt.Sprintf("success", file.Filename))
}
