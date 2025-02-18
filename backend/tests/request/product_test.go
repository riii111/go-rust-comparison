package request_test

import (
	"fmt"
	"mime/multipart"
	"testing"

	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/suite"
)

type ProductRequestSuite struct {
	suite.Suite
	validator *validator.Validate
}

func (suite *ProductRequestSuite) SetupSuite() {
	suite.validator = validator.New()
	requests.RegisterProductValidations(suite.validator)
}

func TestProductRequestSuite(t *testing.T) {
	suite.Run(t, new(ProductRequestSuite))
}

// カスタムバリデーションの境界値テスト
// priceの範囲は0〜10000000(1000万円)
func (suite *ProductRequestSuite) TestPriceRangeValidation() {
	testCases := []struct {
		name    string
		price   string
		isValid bool
	}{
		{"最小値(0円)", "0", true},
		{"最大値(1000万円)", "10000000", true},
		{"範囲外:マイナス", "-1", false},
		{"範囲外:上限超過", "10000001", false},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			// テスト用の構造体を作成
			testStruct := struct {
				Price decimal.Decimal `validate:"price_range"`
			}{
				Price: decimal.RequireFromString(tc.price),
			}

			// バリデーション実行
			err := suite.validator.Struct(testStruct)

			if tc.isValid {
				suite.NoError(err, "価格は許容範囲内です")
			} else {
				suite.Error(err, "価格は許容範囲外です")
			}
		})
	}
}

func (suite *ProductRequestSuite) TestImageValidation() {
	validator := requests.ImageValidator()

	testCases := []struct {
		name        string
		contentType string
		size        int64
		expectError bool
		errorMsg    string
	}{
		{"PNG画像(正常)", "image/png", 1024 * 1024, false, ""},
		{"JPEG画像(正常)", "image/jpeg", 1024 * 1024, false, ""},
		{"GIF画像(正常)", "image/gif", 1024 * 1024, false, ""},
		{"WebP画像(正常)", "image/webp", 1024 * 1024, false, ""},
		{"不正な形式", "image/zip", 1024 * 1024, true, "不正なファイル形式です"},
		{"サイズ超過", "image/png", 6 * 1024 * 1024, true, "ファイルサイズが大きすぎます"},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			// テスト用のファイルヘッダを作成
			file := &multipart.FileHeader{
				Size: tc.size,
				Header: map[string][]string{
					"Content-Type": {tc.contentType},
				},
			}

			err := validator.ValidateProductImage(file)
			if tc.expectError {
				suite.Error(err)
				// デバッグ出力を追加
				fmt.Printf("テストケース: %s\n", tc.name)
				fmt.Printf("期待エラー: %s\n", tc.errorMsg)
				fmt.Printf("実際のエラー: %s\n", err.Error())
				// エラーメッセージの内容が含まれてたらok
				suite.Contains(err.Error(), tc.errorMsg)
			} else {
				suite.NoError(err)
			}
		})
	}
}
