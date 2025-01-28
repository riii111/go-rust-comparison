package repository

import (
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

type StockRepository interface {
	Create(stock *models.Stock) (*models.Stock, error)
}

type stockRepository struct {
	db *gorm.DB
}

func NewStockRepository(db *gorm.DB) StockRepository {
	return &stockRepository{db: database.DB}
}

func (s *stockRepository) Create(stock *models.Stock) (*models.Stock, error) {
	// UUID生成
	stock.BeforeCreate(s.db)

	if err := s.db.Create(stock).Error; err != nil {
		return nil, err
	}

	return stock, nil
}
