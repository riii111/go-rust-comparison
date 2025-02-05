package usecase

import (
	"github.com/lib/pq"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
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
