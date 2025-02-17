package usecase

import (
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

type StockUserCase interface {
	Create(requestBody *requests.CreateStockRequest) (*models.Stock, error)
}

type stockUserCase struct {
	stockRepository repository.StockRepository
}

func NewStockUseCase(stockRepository repository.StockRepository) *stockUserCase {
	return &stockUserCase{stockRepository: stockRepository}
}

func (s *stockUserCase) Create(requestBody *requests.CreateStockRequest) (*models.Stock, error) {
	stock := &models.Stock{
		ProductID:   requestBody.ProductID,
		StoreID:     requestBody.StoreID,
		Size:        requestBody.Size,
		Color:       requestBody.Color,
		Quantity:    requestBody.Quantity,
		Price:       requestBody.Price,
		IsAvailable: requestBody.IsAvailable,
	}
	return s.stockRepository.Create(stock)
}
