package repository

import (
	"errors"

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
	return &stockRepository{db: db}
}

// TODO:errorファイル作ってまとめた方が良いと思う
var (
	ErrForeignKey = errors.New("登録する外部キーが存在しません")
)

func (s *stockRepository) Create(stock *models.Stock) (*models.Stock, error) {
	userID := "00000000-0000-0000-0000-000000000000"
	stock.CreatedBy = userID
	stock.UpdatedBy = userID

	if err := s.db.Create(stock).Error; err != nil {
		switch {
		case errors.Is(err, gorm.ErrForeignKeyViolated):
			return nil, ErrForeignKey
		default:
			return nil, err
		}
	}

	return stock, nil
}
