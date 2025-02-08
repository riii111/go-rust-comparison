package requests

import (
	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
)

const maxPriceValue = 10000000

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
	"price_range": "価格は0〜1000万円以下で入力してください",
}
