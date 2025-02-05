package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
	"log"
	"net/http"
)

// ProductHandler 商品に関する操作を管理する構造体
type ProductHandler struct {
	productUsecase *usecase.ProductUsecase
}

// NewProductHandler 商品ハンドラーのインスタンスを生成
func NewProductHandler(productUsecase *usecase.ProductUsecase) *ProductHandler {
	return &ProductHandler{
		productUsecase: productUsecase,
	}
}

// リクエストのバリデーション
func (h *ProductHandler) CreateProduct(c *gin.Context) {
	var req requests.CreateProductRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		errorResponse := responses.ErrorResponse{
			Error: "入力内容に誤りがあります。確認して再度お試しください",
		}

		// デバッグモードの場合のみエラー詳細を追加
		if gin.Mode() == gin.DebugMode {
			errorResponse.Details = err.Error()
		}

		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	// TODO: 認証実装後に実際のoperaterのIDを取得するように修正
	userID := "00000000-0000-0000-0000-000000000000"

	if err := h.productUsecase.CreateProduct(req, userID); err != nil {
		// エラーの種類に応じてレスポンスを返す
		switch err {
		case repository.ErrProductCreateFailed:
			c.JSON(http.StatusBadRequest, responses.ErrorResponse{
				Error: repository.ErrProductCreateFailed.Error(),
			})
		case usecase.ErrPriceZeroOrNegative:
			c.JSON(http.StatusBadRequest, responses.ErrorResponse{
				Error: usecase.ErrPriceZeroOrNegative.Error(),
			})
		case usecase.ErrPriceTooHigh:
			c.JSON(http.StatusBadRequest, responses.ErrorResponse{
				Error: usecase.ErrPriceTooHigh.Error(),
			})
		default:
			// エラーの種類が不明な場合
			c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
				Error: "システムエラーが発生しました。しばらく時間をおいて再度お試しください",
			})
			// エラーログの出力
			log.Printf("サーバーエラー: %v", err)
		}
		return
	}

	c.JSON(http.StatusCreated, responses.StandardResponse{
		Message: "商品の作成に成功しました",
	})
}
