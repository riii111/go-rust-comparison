package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
	"mime/multipart"
	"net/http"
)

type ImageUploadHandler struct {
	imageUploadUsecase *usecase.ImageUploadUsecase
}

func NewImageUploadHandler(imageUploadUsecase *usecase.ImageUploadUsecase) *ImageUploadHandler {
	return &ImageUploadHandler{
		imageUploadUsecase: imageUploadUsecase,
	}
}

// 画像アップロードの処理
func (h *ImageUploadHandler) UploadImage(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		// Content-Type: multipart/form-data で送信されていない場合
		// https://developer.mozilla.org/ja/docs/Web/HTTP/Status/415
		c.JSON(http.StatusUnsupportedMediaType, responses.ErrorResponse{
			Error: "リクエストの解析に失敗しました",
		})
		return
	}

	// フロントではbodyのキー名をimageにする
	var files []*multipart.FileHeader
	if formFiles := form.File["image"]; len(formFiles) > 0 {
		files = formFiles
	}

	// ファイルが存在しない場合(画像選択せずに送信とかを想定)
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, responses.ErrorResponse{
			Error: "画像ファイルが必要です",
		})
		return
	}

	req := requests.ImageUploadRequest{
		Files: files,
	}

	// ユースケースを呼び出して画像をアップロード
	urls, err := h.imageUploadUsecase.UploadImages(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
			Error: "画像のアップロードに失敗しました",
		})
		return
	}

	c.JSON(http.StatusOK, responses.DataResponse{
		StandardResponse: responses.StandardResponse{
			Message: "アップロード成功",
		},
		Data: urls,
	})
}
