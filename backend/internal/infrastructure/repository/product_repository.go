package repository

import (
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

type IProductRepository interface {
	Create(product *models.Product) error
}

type ProductRepository struct {
	db *gorm.DB
}

func NewProductRepository() IProductRepository {
	return &ProductRepository{
		db: database.DB,
	}
}

func (r *ProductRepository) Create(product *models.Product) error {
	if err := r.db.Create(product).Error; err != nil {
		// TODO: products テーブルの created_by/updated_byに外部キー制約のエラーハンドリングを追加
		// if errors.Is(err, gorm.ErrForeignKeyViolated) {
		//                 return fmt.Errorf("該当するoperatorが存在: %w", err)
		// }
		return err
	}
	return nil
}
