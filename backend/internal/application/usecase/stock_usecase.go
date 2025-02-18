package usecase

import (
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

type StockUserCase interface {
	Create(requestBody *requests.CreateStockRequest) (*models.Stock, error)
	Get(ID string) (*models.Stock, error)
	Delete(ID string) error
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

func (s *stockUserCase) Get(ID string) (*models.Stock, error) {
	return s.stockRepository.Get(ID)
}

func (s *stockUserCase) Delete(ID string) error {
	return s.stockRepository.Delete(ID)
}
