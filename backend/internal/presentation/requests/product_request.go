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
	Price        decimal.Decimal `json:"price" binding:"required,min_price,max_price"`
	Category     string          `json:"category" binding:"required"`
	// TODO: 画像urlはpostgresで配列として保存、画像ファイルは別コンテナ(MinIO)で管理
	ImageURLs []string `json:"image_urls"`
}

// カスタムバリデーション登録
func RegisterCustomValidations(v *validator.Validate) {
	v.RegisterValidation("min_price", validateMinPrice)
	v.RegisterValidation("max_price", validateMaxPrice)
}

func validateMinPrice(fl validator.FieldLevel) bool {
	// decimal型として使うために。フィールドの値をinterface型に変換する
	price := fl.Field().Interface().(decimal.Decimal)
	return price.GreaterThan(decimal.Zero)
}
func validateMaxPrice(fl validator.FieldLevel) bool {
	price := fl.Field().Interface().(decimal.Decimal)
	maxPrice := decimal.NewFromInt(maxPriceValue)
	return price.LessThanOrEqual(maxPrice)
}

// バリデーションエラーメッセージはまとめとく()
var ValidationErrors = map[string]string{
	"min_price": "価格は0円より大きい値を入力してください",
	"max_price": "価格は1000万円以下で入力してください",
}
