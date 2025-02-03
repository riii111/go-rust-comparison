package usecase

import (
    "errors"
    "github.com/riii111/go-rust-comparison/internal/domain/models"
    "github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
    "github.com/riii111/go-rust-comparison/internal/presentation/requests"
    "github.com/lib/pq"
    "github.com/shopspring/decimal"
)

var (
    ErrInvalidPrice = errors.New("無効な価格です")
)

type ProductUsecase struct {
    productRepo repository.IProductRepository
}

func NewProductUsecase(productRepo repository.IProductRepository) *ProductUsecase {
    return &ProductUsecase{
        productRepo: productRepo,
    }
}

func (u *ProductUsecase) CreateProduct(req requests.CreateProductRequest, userID string) error {

	// 価格が0以下の場合はエラーを返す
    if req.Price.LessThanOrEqual(decimal.Zero) {
        return ErrInvalidPrice
    }

    product := &models.Product{
        Name:         req.Name,
        Description:  req.Description,
        MaterialInfo: req.MaterialInfo,
        BasePrice:    req.Price,
        Category:     req.Category,
        ImageURLs:    pq.StringArray(req.ImageURLs),
        CreatedBy:    userID,
        UpdatedBy:    userID,
    }

    return u.productRepo.Create(product)
}