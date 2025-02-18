package handler_test

import (
	"bytes"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"

	"fmt"
	"net/textproto"
	"testing"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type MockProductUseCase struct {
	mock.Mock
}

func (m *MockProductUseCase) CreateProduct(req requests.CreateProductRequest, userID string) error {
	args := m.Called(req, userID)
	return args.Error(0)
}

type MockStorage struct {
	mock.Mock
}

func (m *MockStorage) SaveFile(file *multipart.FileHeader) (string, error) {
	args := m.Called(file)
	return args.String(0), args.Error(1)
}

type ProductHandlerSuite struct {
	suite.Suite
	productHandler *handlers.ProductHandler
}

func (suite *ProductHandlerSuite) SetupSuite() {
	// バリデーターの設定
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("price_range", requests.ValidatePriceRange)
	}
}

// 正常系のリクエストをテスト
func TestProductHandlerTestSuite(t *testing.T) {
	suite.Run(t, new(ProductHandlerSuite))
}

func (suite *ProductHandlerSuite) TestCreateProduct() {
	// モックの設定
	mockUseCase := new(MockProductUseCase)
	mockStorage := new(MockStorage)

	// SaveFileのモック設定
	mockStorage.On("SaveFile", mock.AnythingOfType("*multipart.FileHeader")).
		Return("http://localhost:9000/test-bucket/test-image.png", nil)

	// CreateProductのモック設定
	mockUseCase.On("CreateProduct", mock.AnythingOfType("requests.CreateProductRequest"), "00000000-0000-0000-0000-000000000000").
		Return(nil)

	suite.productHandler = handlers.NewProductHandler(mockUseCase, mockStorage)

	// マルチパートフォームの作成
	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	// 商品データの追加
	productData := map[string]interface{}{
		"name":          "商品",
		"description":   "テスト商品の説明",
		"material_info": "テスト素材",
		"price":         "1",
		"category":      "テストカテゴリ",
	}
	productJSON, _ := json.Marshal(productData)
	_ = writer.WriteField("productData", string(productJSON))

	// テスト画像のパスを定義
	testImagePath := "../testdata/test_image.png"

	// テスト画像の追加
	file, err := os.Open(testImagePath)
	suite.Require().NoError(err)
	defer file.Close()

	fileContent, err := os.ReadFile(testImagePath)
	suite.Require().NoError(err)

	// マルチパートヘッダーの作成
	h := make(textproto.MIMEHeader)
	h.Set("Content-Disposition", fmt.Sprintf(`form-data; name="%s"; filename="%s"`, "images", "test_image.png"))
	h.Set("Content-Type", "image/png")

	// パートの作成
	part, err := writer.CreatePart(h)
	suite.Require().NoError(err)

	_, err = part.Write(fileContent)
	suite.Require().NoError(err)

	writer.Close()

	// リクエストの作成
	req, err := http.NewRequest(http.MethodPost, "/api/products", body)
	suite.Require().NoError(err)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// レスポンスの記録
	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)
	ginContext.Request = req

	// ハンドラの実行
	suite.productHandler.CreateProduct(ginContext)

	// レスポンスの検証
	suite.Assert().Equal(http.StatusCreated, w.Code)
	suite.Assert().JSONEq(`{"message": "商品の作成に成功しました"}`, w.Body.String())

	mockStorage.AssertExpectations(suite.T())
	mockUseCase.AssertExpectations(suite.T())
}

// 異常系
// エラーケース(細かいバリデーションはrequestのテストに記載)
func (suite *ProductHandlerSuite) TestCreateProductErrors() {
	testCases := []struct {
		name           string
		productData    map[string]interface{}
		imageFile      bool // 画像ファイルを含めるかどうか
		expectedStatus int
		expectedError  string
	}{
		{
			name: "画像選択してない",
			productData: map[string]interface{}{
				"name":          "商品",
				"description":   "説明",
				"material_info": "素材",
				"price":         "1",
				"category":      "カテゴリ",
			},
			imageFile:      false,
			expectedStatus: http.StatusBadRequest,
			expectedError:  "商品画像を最低一枚は選択してください\"",
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			mockUseCase := new(MockProductUseCase)
			mockStorage := new(MockStorage)

			// モックの振る舞いを設定
			if tc.imageFile {
				mockStorage.On("SaveFile", mock.AnythingOfType("*multipart.FileHeader")).
					Return("http://localhost:9000/test-bucket/test-image.png", nil)
			}

			suite.productHandler = handlers.NewProductHandler(mockUseCase, mockStorage)

			body := new(bytes.Buffer)
			writer := multipart.NewWriter(body)

			// 商品データの追加
			productJSON, _ := json.Marshal(tc.productData)
			writer.WriteField("productData", string(productJSON))

			// // 画像の追加が必要な場合
			// if tc.imageFile {
			// 	addTestImage(suite, writer)
			// }

			writer.Close()

			// リクエストの作成と実行
			w := httptest.NewRecorder()
			req, _ := http.NewRequest(http.MethodPost, "/api/products", body)
			req.Header.Set("Content-Type", writer.FormDataContentType())

			ginContext, _ := gin.CreateTestContext(w)
			ginContext.Request = req

			suite.productHandler.CreateProduct(ginContext)

			// レスポンスの検証
			suite.Equal(tc.expectedStatus, w.Code)
			suite.Contains(w.Body.String(), tc.expectedError)
		})
	}
}

// 異常系で画像の選択を行う場合に使用
// func addTestImage(suite *ProductHandlerSuite, writer *multipart.Writer) {
// 	file, err := os.Open("../testdata/test_image.png")
// 	suite.Require().NoError(err)
// 	defer file.Close()

// 	fileContent, err := os.ReadFile("../testdata/test_image.png")
// 	suite.Require().NoError(err)

// 	h := make(textproto.MIMEHeader)
// 	h.Set("Content-Disposition", `form-data; name="images"; filename="test_image.png"`)
// 	h.Set("Content-Type", "image/png")

// 	part, err := writer.CreatePart(h)
// 	suite.Require().NoError(err)
// 	part.Write(fileContent)
// }
