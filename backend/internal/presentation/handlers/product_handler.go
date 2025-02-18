package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/storage"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
	"github.com/shopspring/decimal"
)

// ProductHandler 商品に関する操作を管理する構造体
type ProductHandler struct {
	productUsecase usecase.IProductUsecase
	storage        storage.Storage
}

// NewProductHandler 商品ハンドラーのインスタンスを生成
func NewProductHandler(productUsecase usecase.IProductUsecase, storage storage.Storage) *ProductHandler {
	return &ProductHandler{
		productUsecase: productUsecase,
		storage:        storage,
	}
}

// リクエストのバリデーション
func (h *ProductHandler) CreateProduct(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusUnsupportedMediaType, responses.ErrorResponse{
			Error: "リクエストの解析に失敗しました",
		})
		return
	}

	var req requests.CreateProductRequest

	// productフィールドからJSONデータを取得して解析
	if productData, exists := form.Value["productData"]; exists && len(productData) > 0 {
		var productMap map[string]interface{}
		// JSON 文字列をparse
		if err := json.Unmarshal([]byte(productData[0]), &productMap); err != nil {
			c.JSON(http.StatusBadRequest, responses.ErrorResponse{
				Error: "商品データの解析に失敗しました",
			})
			return
		}

		// interface{}型の値をstring型に変換してreqに格納
		req.Name = productMap["name"].(string)
		req.Description = productMap["description"].(string)
		req.MaterialInfo = productMap["material_info"].(string)
		// priceはdecimal.Decimal 型に変換
		req.Price = decimal.RequireFromString(productMap["price"].(string))
		req.Category = productMap["category"].(string)
	}

	// 画像ファイルの処理
	imageValidator := requests.ImageValidator()
	if files := form.File["images"]; len(files) > 0 {
		// 画像形式のバリデーション
		for _, file := range files {
			if err := imageValidator.ValidateProductImage(file); err != nil {
				c.JSON(http.StatusBadRequest, responses.ErrorResponse{
					Error: err.Error(),
				})
				return
			}
		}
		req.Files = files

		// 画像のアップロードとURL取得
		var urls []string
		for _, file := range files {
			url, err := h.storage.SaveFile(file)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
					Error: "画像のアップロードに失敗しました",
				})
				return
			}
			urls = append(urls, url)
		}
		req.ImageURLs = urls
	}

	// バリデーション
	if err := c.ShouldBind(&req); err != nil {
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

				// Filesフィールドで選択されなかった場合
				if field == "Files" && tag == "required" {
					validationErrors[field] = requests.ErrMsgNoImage
					continue
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

	// TODO: 認証実装後に実際のoperaterのIDを取得するように修正
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
