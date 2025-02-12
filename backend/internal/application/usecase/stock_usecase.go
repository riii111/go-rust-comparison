package usecase

import (
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
)

type StockUserCase interface {
	Create(stock *models.Stock) (*models.Stock, error)
}

type stockUserCase struct {
	stockRepository repository.StockRepository
}

func NewStockUseCase(stockRepository repository.StockRepository) *stockUserCase {
	return &stockUserCase{stockRepository: stockRepository}
}

func (s *stockUserCase) Create(stock *models.Stock) (*models.Stock, error) {
	return s.stockRepository.Create(stock)
}
