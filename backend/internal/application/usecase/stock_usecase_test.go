package usecase_test

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type mockStockRepository struct {
	mock.Mock
}

func NewMockStockRepository() *mockStockRepository {
	return &mockStockRepository{}
}

func (m *mockStockRepository) Create(stock *models.Stock) (*models.Stock, error) {
	args := m.Called(stock)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*models.Stock), args.Error(1)
}

func (m *mockStockRepository) Get(ID string) (*models.Stock, error) {
	args := m.Called(ID)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*models.Stock), args.Error(1)
}

type StockUseCaseSuite struct {
	suite.Suite
	stockUseCase usecase.StockUserCase
}

func TestStockUseCaseTestSuite(t *testing.T) {
	suite.Run(t, new(StockUseCaseSuite))
}

var (
	ID, _        = uuid.NewV7()
	productID, _ = uuid.NewV7()
	storeID, _   = uuid.NewV7()
	price        = decimal.New(1000, 0)
	now          = time.Now()
)

func (suite *StockUseCaseSuite) TestCreate() {
	mockStockRepository := NewMockStockRepository()
	suite.stockUseCase = usecase.NewStockUseCase(mockStockRepository)

	requestBody := &requests.CreateStockRequest{
		ProductID:   productID.String(),
		StoreID:     storeID.String(),
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       price,
		IsAvailable: true,
	}

	stock := &models.Stock{
		ProductID:   requestBody.ProductID,
		StoreID:     requestBody.StoreID,
		Size:        requestBody.Size,
		Color:       requestBody.Color,
		Quantity:    requestBody.Quantity,
		Price:       requestBody.Price,
		IsAvailable: requestBody.IsAvailable,
	}

	// Mockの返り値を定義
	mockStockRepository.On("Create", stock).Return(&models.Stock{
		ID:          ID.String(),
		ProductID:   requestBody.ProductID,
		StoreID:     requestBody.StoreID,
		Size:        requestBody.Size,
		Color:       requestBody.Color,
		Quantity:    requestBody.Quantity,
		Price:       requestBody.Price,
		IsAvailable: requestBody.IsAvailable,
		CreatedAt:   now,
		UpdatedAt:   now,
	}, nil)

	// テスト対象の実行
	createdStock, err := suite.stockUseCase.Create(requestBody)

	suite.Assert().Nil(err)
	suite.Assert().Equal(requestBody.ProductID, createdStock.ProductID)
	suite.Assert().Equal(requestBody.StoreID, createdStock.StoreID)
	suite.Assert().Equal(requestBody.Size, createdStock.Size)
	suite.Assert().Equal(requestBody.Color, createdStock.Color)
	suite.Assert().Equal(requestBody.Quantity, createdStock.Quantity)
	suite.Assert().Equal(requestBody.Price, createdStock.Price)
	suite.Assert().Equal(requestBody.IsAvailable, createdStock.IsAvailable)
	suite.Assert().Equal(now, createdStock.CreatedAt)
	suite.Assert().Equal(now, createdStock.UpdatedAt)
}

func (suite *StockUseCaseSuite) TestGet() {
	mockStockRepository := NewMockStockRepository()
	suite.stockUseCase = usecase.NewStockUseCase(mockStockRepository)

	stockID := ID.String()
	mockStockRepository.On("Get", stockID).Return(&models.Stock{
		ID:          stockID,
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

	stock, err := suite.stockUseCase.Get(stockID)
	suite.Assert().Nil(err)
	suite.Assert().Equal(stockID, stock.ID)
}
