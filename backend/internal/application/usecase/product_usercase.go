package usecase

import (
	"errors"
	"github.com/lib/pq"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/shopspring/decimal"
)

// 上限値は一旦、1000万に
const maxPriceValue = 10000000

var (
	MaxPrice               = decimal.NewFromInt(maxPriceValue)
	ErrPriceTooHigh        = errors.New("価格は1000万円以下で入力してください")
	ErrPriceZeroOrNegative = errors.New("価格は0円より大きい値を入力してください")
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
	// 価格が上限を超える場合はエラーを返す
	if req.Price.GreaterThan(MaxPrice) {
		return ErrPriceTooHigh
	}
	// 価格が0以下の場合はエラーを返す
	if req.Price.LessThanOrEqual(decimal.Zero) {
		return ErrPriceZeroOrNegative
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
