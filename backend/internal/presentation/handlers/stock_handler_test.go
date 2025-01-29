package handlers

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
	"github.com/google/uuid"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
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

func (m *MockStockUseCase) Create(stock *models.Stock) (*models.Stock, error) {
	args := m.Called(stock)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*models.Stock), args.Error(1)
}

type StockHandlersSuite struct {
	suite.Suite
	stockHandler *StockHandler
}

func TestStockHandlersTestSuite(t *testing.T) {
	suite.Run(t, new(StockHandlersSuite))
}

func (suite *StockHandlersSuite) TestCreate() {
	mockUseCase := NewMockStockUseCase()

	productId := uuid.New().String()
	storeId := uuid.New().String()
	price := decimal.New(1000, 0)
	inputStock := &models.Stock{
		ProductID:   productId,
		StoreID:     storeId,
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       price,
		IsAvailable: true,
	}

	uuid := "0194a588-bd91-729e-bcfb-2d2e7b19e1ef"
	now := time.Now()
	mockUseCase.On("Create", inputStock).Return(&models.Stock{
		ID:          uuid,
		ProductID:   productId,
		StoreID:     storeId,
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       price,
		IsAvailable: true,
		CreatedAt:   now,
		UpdatedAt:   now,
	}, nil)

	suite.stockHandler = NewStockHandler(mockUseCase)

	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)
	stockJson, _ := json.Marshal(inputStock)
	req, _ := http.NewRequest("POST", "/stock", strings.NewReader(string(stockJson)))
	req.Header.Add("Content-Type", "application/json")
	ginContext.Request = req

	suite.stockHandler.CreateStock(ginContext)

	suite.Assert().Equal(http.StatusCreated, w.Code)

	bodyBytes, _ := io.ReadAll(w.Body)
	var StockResponse models.Stock
	err := json.Unmarshal(bodyBytes, &StockResponse)

	suite.Assert().Nil(err)
	suite.Assert().Equal(inputStock.ProductID, StockResponse.ProductID)
	suite.Assert().Equal(inputStock.StoreID, StockResponse.StoreID)
	suite.Assert().Equal(inputStock.Size, StockResponse.Size)
	suite.Assert().Equal(inputStock.Color, StockResponse.Color)
	suite.Assert().Equal(inputStock.Quantity, StockResponse.Quantity)
	suite.Assert().Equal(inputStock.Price, StockResponse.Price)
	suite.Assert().Equal(inputStock.IsAvailable, StockResponse.IsAvailable)
	suite.Assert().NotNil(StockResponse.CreatedAt)
	suite.Assert().NotNil(StockResponse.UpdatedAt)
}

func (suite *StockHandlersSuite) TestCreateRequestBodyFailure() {
	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)

	req, _ := http.NewRequest("POST", "/stock", nil)
	req.Header.Add("Content-Type", "application/json")
	ginContext.Request = req

	suite.stockHandler.CreateStock(ginContext)
	suite.Assert().Equal(http.StatusBadRequest, w.Code)
	suite.Assert().JSONEq(`{"error": "invalid request"}`, w.Body.String())
}

func (suite *StockHandlersSuite) TestCreateFailure() {
	mockUseCase := NewMockStockUseCase()

	productId := uuid.New().String()
	storeId := uuid.New().String()
	price := decimal.New(1000, 0)
	inputStock := &models.Stock{
		ProductID:   productId,
		StoreID:     storeId,
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       price,
		IsAvailable: true,
	}

	mockUseCase.On("Create", inputStock).Return(nil,
		errors.New("invalid"))
	suite.stockHandler = NewStockHandler(mockUseCase)

	w := httptest.NewRecorder()
	ginContext, _ := gin.CreateTestContext(w)
	stockJson, _ := json.Marshal(inputStock)
	req, _ := http.NewRequest("POST", "/stock", strings.NewReader(string(stockJson)))
	req.Header.Add("Content-Type", "application/json")
	ginContext.Request = req

	suite.stockHandler.CreateStock(ginContext)

	suite.Assert().Equal(http.StatusInternalServerError, w.Code)
	suite.Assert().JSONEq(`{"error":"invalid"}`, w.Body.String())
}
