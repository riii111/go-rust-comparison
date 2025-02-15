package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/storage"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
	"log"
	"mime/multipart"
	"net/http"
)

type ImageHandler struct {
	storage storage.Storage
}

func NewImageHandler(storage storage.Storage) *ImageHandler {
	return &ImageHandler{
		storage: storage,
	}
}

func (h *ImageHandler) UploadImage(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, responses.ErrorResponse{
			Error: "マルチパートフォームの解析に失敗しました",
		})
		return
	}

	// "images" または "image" のパラメータを確認
	var files []*multipart.FileHeader
	if formFiles := form.File["images"]; len(formFiles) > 0 {
		files = formFiles
	} else if formFiles := form.File["image"]; len(formFiles) > 0 {
		files = formFiles
	}

	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, responses.ErrorResponse{
			Error: "画像ファイルが必要です",
		})
		return
	}

	urls := make([]string, 0, len(files))
	for _, file := range files {
		if !isValidImageType(file.Header.Get("Content-Type")) {
			c.JSON(http.StatusBadRequest, responses.ErrorResponse{
				Error: "無効なファイル形式です",
			})
			return
		}

		url, err := h.storage.SaveFile(file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
				Error: "画像のアップロードに失敗しました",
			})
			log.Printf("アップロードエラー: %v", err)
			return
		}
		urls = append(urls, url)
	}

	c.JSON(http.StatusOK, responses.StandardResponse{
		Message: "アップロード成功",
		Data: map[string]interface{}{
			"urls":  urls,
			"count": len(urls),
		},
	})
}

func isValidImageType(contentType string) bool {
	validTypes := map[string]bool{
		"image/jpeg": true,
		"image/png":  true,
		"image/gif":  true,
		"image/webp": true,
	}
	return validTypes[contentType]
}
