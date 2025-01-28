package responses

import (
	"github.com/shopspring/decimal"
)

type CreateStockInput struct {
	ProductID   string          `json:"product_id" binding:"required"`
	StoreID     string          `json:"store_id" binding:"required"`
	Size        string          `json:"size" binding:"required"`
	Color       string          `json:"color" binding:"required"`
	Quantity    uint            `json:"quantity" binding:"required"`
	Price       decimal.Decimal `json:"price" binding:"required"`
	IsAvailable bool            `json:"is_available" binding:"required"`
	CreatedBy   *string         `json:"created_by" binding:""`
	UpdatedBy   *string         `json:"updated_by" binding:""`
}
