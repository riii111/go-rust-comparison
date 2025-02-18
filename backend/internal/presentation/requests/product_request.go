package requests

import (
	"fmt"
	"mime/multipart"

	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
)

const maxPriceValue = 10000000
const (
	ErrMsgRequired   = "を入力してください"
	ErrMsgPriceRange = "価格は0〜1000万円以下で入力してください"
	ErrMsgNoImage    = "商品画像を最低一枚は選択してください"
)
const (
	// 5MB
	MaxFileSize = 5 * 1024 * 1024
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
	// 画像urlはpostgresで配列として保存、画像ファイルは別コンテナ(MinIO)で管理
	Files     []*multipart.FileHeader `form:"files" binding:"required"`
	ImageURLs []string                `json:"image_urls"`

	allowedImageTypes map[string]bool
}

// カスタムバリデーション登録
func RegisterProductValidations(v *validator.Validate) {
	v.RegisterValidation("price_range", ValidatePriceRange)
}

func ValidatePriceRange(fl validator.FieldLevel) bool {
	price := fl.Field().Interface().(decimal.Decimal)
	maxPrice := decimal.NewFromInt(maxPriceValue)
	return price.GreaterThanOrEqual(decimal.Zero) && price.LessThanOrEqual(maxPrice)
}

var ValidationErrors = map[string]string{
	"required":    ErrMsgRequired,
	"price_range": ErrMsgPriceRange,
}

func ImageValidator() *CreateProductRequest {
	return &CreateProductRequest{
		allowedImageTypes: map[string]bool{
			"image/jpeg": true,
			"image/png":  true,
			"image/gif":  true,
			"image/webp": true,
		},
	}
}

// ValidateProductImage 画像バリデーション実行
func (r *CreateProductRequest) ValidateProductImage(file *multipart.FileHeader) error {
	// アップロードされたファイルのMIMEタイプを取得してmapで許可されている形式か確認
	contentType := file.Header.Get("Content-Type")
	if !r.allowedImageTypes[contentType] {
		return fmt.Errorf("不正なファイル形式です: %s. 許可されている形式: JPEG, PNG, GIF, WebP", contentType)
	}

	// ファイルサイズの検証
	if file.Size > MaxFileSize {
		return fmt.Errorf("ファイルサイズが大きすぎます（5MBまで）")
	}

	return nil
}
