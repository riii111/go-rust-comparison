package requests

import (
	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
)

const maxPriceValue = 10000000
const (
	ErrMsgRequired   = "を入力してください"
	ErrMsgPriceRange = "価格は0〜1000万円以下で入力してください"
)

// フィールド名の日本語
var FieldNames = map[string]string{
	"Name":         "商品名",
	"Description":  "商品説明",
	"MaterialInfo": "素材情報",
	"Price":        "価格",
	"Category":     "カテゴリー",
	"ImageURLs":    "商品画像",
}

type CreateProductRequest struct {
	Name         string          `json:"name" binding:"required"`
	Description  string          `json:"description" binding:"required"`
	MaterialInfo string          `json:"material_info" binding:"required"`
	Price        decimal.Decimal `json:"price" binding:"required,price_range"`
	Category     string          `json:"category" binding:"required"`
	// TODO: 画像urlはpostgresで配列として保存、画像ファイルは別コンテナ(MinIO)で管理
	ImageURLs []string `json:"image_urls"`
}

// カスタムバリデーション登録
func RegisterProductValidations(v *validator.Validate) {
	v.RegisterValidation("price_range", validatePriceRange)
}

func validatePriceRange(fl validator.FieldLevel) bool {
	price := fl.Field().Interface().(decimal.Decimal)
	maxPrice := decimal.NewFromInt(maxPriceValue)
	return price.GreaterThanOrEqual(decimal.Zero) && price.LessThanOrEqual(maxPrice)
}

var ValidationErrors = map[string]string{
	"required":    ErrMsgRequired,
	"price_range": ErrMsgPriceRange,
}
