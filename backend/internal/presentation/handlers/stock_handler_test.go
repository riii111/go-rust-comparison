package handlers_test

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/handlers"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type MockStockUseCase struct {
	mock.Mock
}

func NewMockStockUseCase() *MockStockUseCase {
	return &MockStockUseCase{}
}

func (m *MockStockUseCase) Create(requestBody *requests.CreateStockRequest) (*models.Stock, error) {
	args := m.Called(requestBody)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*models.Stock), args.Error(1)
}

type StockHandlersSuite struct {
	suite.Suite
	stockHandler *handlers.StockHandler
}

func TestStockHandlersTestSuite(t *testing.T) {
	suite.Run(t, new(StockHandlersSuite))
}

func (s *StockHandlersSuite) SetupSuite() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		requests.RegisterProductValidations(v)
	}
}

var (
	productID, _ = uuid.NewV7()
	storeID, _   = uuid.NewV7()
	price        = decimal.New(1000, 0)
	now          = time.Now()
	requestBody  = &requests.CreateStockRequest{
		ProductID:   productID.String(),
		StoreID:     storeID.String(),
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       price,
		IsAvailable: true,
	}
)

func (suite *StockHandlersSuite) TestCreate() {
	ID, _ := uuid.NewV7()
	mockUseCase := NewMockStockUseCase()
	mockUseCase.On("Create", requestBody).Return(&models.Stock{
		ID:          ID.String(),
		ProductID:   productID.String(),
		StoreID:     storeID.String(),
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       price,
		IsAvailable: true,
		CreatedAt:   now,
		UpdatedAt:   now,
	}, nil)

	suite.stockHandler = handlers.NewStockHandler(mockUseCase)

	stockJson, _ := json.Marshal(requestBody)
	req, _ := http.NewRequest(http.MethodPost, "/api/stocks", strings.NewReader(string(stockJson)))
	req.Header.Add("Content-Type", "application/json")

	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)
	ginContext.Request = req

	suite.stockHandler.CreateStock(ginContext)

	suite.Assert().Equal(http.StatusCreated, w.Code)

	bodyBytes, _ := io.ReadAll(w.Body)
	var StockResponse models.Stock
	err := json.Unmarshal(bodyBytes, &StockResponse)

	suite.Assert().Nil(err)
	suite.Assert().Equal(ID.String(), StockResponse.ID)
}

func (suite *StockHandlersSuite) TestCreateRequestBodyFailure() {
	req, _ := http.NewRequest(http.MethodPost, "/api/stocks", nil)
	req.Header.Add("Content-Type", "application/json")

	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)
	ginContext.Request = req

	suite.stockHandler.CreateStock(ginContext)

	suite.Assert().Equal(http.StatusBadRequest, w.Code)
	suite.Assert().JSONEq(`{"error": "入力内容に誤りがあります"}`, w.Body.String())
}

func (suite *StockHandlersSuite) TestCreateFailure() {
	mockUseCase := NewMockStockUseCase()
	mockUseCase.On("Create", requestBody).Return(nil,
		errors.New("システムエラーが発生しました。しばらく時間をおいて再度お試しください"))

	suite.stockHandler = handlers.NewStockHandler(mockUseCase)

	stockJson, _ := json.Marshal(requestBody)
	req, _ := http.NewRequest(http.MethodPost, "/api/stocks", strings.NewReader(string(stockJson)))
	req.Header.Add("Content-Type", "application/json")

	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)
	ginContext.Request = req

	suite.stockHandler.CreateStock(ginContext)

	suite.Assert().Equal(http.StatusInternalServerError, w.Code)
	suite.Assert().JSONEq(`{"error":"システムエラーが発生しました。しばらく時間をおいて再度お試しください"}`, w.Body.String())
}
