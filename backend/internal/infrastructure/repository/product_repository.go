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
        return err
    }
    return nil
}