package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
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
		// レスポンスのバリデーションエラーの場合
		if ve, ok := err.(validator.ValidationErrors); ok {
			validationErrors := make(map[string]string)

			for _, fieldError := range ve {
				field := fieldError.Field()
				tag := fieldError.Tag()

				// フィールド名を日本語に変換する
				jpfieldName, exists := requests.FieldNames[field]
				if !exists {
					jpfieldName = field
				}

				switch tag {
				case "required":
					validationErrors[field] = jpfieldName + requests.ErrMsgRequired
				case "price_range":
					validationErrors[field] = requests.ErrMsgPriceRange
				// 念の為defaultを設定
				default:
					validationErrors[field] = fieldError.Error()
				}
			}

			c.JSON(http.StatusBadRequest, responses.ErrorResponse{
				Errors: validationErrors,
			})
			return
		}

		c.JSON(http.StatusBadRequest, responses.ErrorResponse{
			Error: "入力内容に誤りがあります",
		})
		return
	}

	// TODO: 認証実装後に実際のoperatorのIDを取得するように修正
	userID := "00000000-0000-0000-0000-000000000000"

	if err := h.productUsecase.CreateProduct(req, userID); err != nil {
		// エラーの種類が不明な場合
		c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
			Error: "商品の登録に失敗しました。しばらく時間をおいて再度お試しください。",
		})
		// エラーログの出力
		log.Printf("サーバーエラー: %v", err)
	}

	c.JSON(http.StatusCreated, responses.StandardResponse{
		Message: "商品の作成に成功しました",
	})
}
