package usecase_test

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
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

type StockUseCaseSuite struct {
	suite.Suite
	stockUseCase usecase.StockUserCase
}

func TestStockUseCaseTestSuite(t *testing.T) {
	suite.Run(t, new(StockUseCaseSuite))
}

func (suite *StockUseCaseSuite) TestCreate() {
	mockStockRepository := NewMockStockRepository()
	suite.stockUseCase = usecase.NewStockUseCase(mockStockRepository)

	productId, _ := uuid.NewV7()
	storeId, _ := uuid.NewV7()
	inputStock := &models.Stock{
		ProductID:   productId.String(),
		StoreID:     storeId.String(),
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       decimal.New(1000, 0),
		IsAvailable: true,
	}

	Id, _ := uuid.NewV7()
	now := time.Now()
	// Mockの返り値を定義
	mockStockRepository.On("Create", inputStock).Return(&models.Stock{
		ID:          Id.String(),
		ProductID:   productId.String(),
		StoreID:     storeId.String(),
		Size:        "large",
		Color:       "red",
		Quantity:    100,
		Price:       decimal.New(1000, 0),
		IsAvailable: true,
		CreatedAt:   now,
		UpdatedAt:   now,
	}, nil)

	// テスト対象の実行
	stock, err := suite.stockUseCase.Create(inputStock)

	suite.Assert().Nil(err)
	suite.Assert().Equal(inputStock.ProductID, stock.ProductID)
	suite.Assert().Equal(inputStock.StoreID, stock.StoreID)
	suite.Assert().Equal(inputStock.Size, stock.Size)
	suite.Assert().Equal(inputStock.Color, stock.Color)
	suite.Assert().Equal(inputStock.Quantity, stock.Quantity)
	suite.Assert().Equal(inputStock.Price, stock.Price)
	suite.Assert().Equal(inputStock.IsAvailable, stock.IsAvailable)
	suite.Assert().Equal(now, stock.CreatedAt)
	suite.Assert().Equal(now, stock.UpdatedAt)
}
