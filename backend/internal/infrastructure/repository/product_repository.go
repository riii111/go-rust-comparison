package repository

import (
	"errors"
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

// データベースエラーに関する定数
var (
	ErrProductCreateFailed = errors.New("商品の登録に失敗しました")
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
		return ErrProductCreateFailed
	}
	return nil
}
