package requests

import (
	"github.com/shopspring/decimal"
)

type CreateStockInput struct {
	ProductID   string          `json:"product_id" binding:"required,uuid"`
	StoreID     string          `json:"store_id" binding:"required,uuid"`
	Size        string          `json:"size" binding:"required"`
	Color       string          `json:"color" binding:"required"`
	Quantity    uint            `json:"quantity" binding:"required,max=9999"`
	Price       decimal.Decimal `json:"price" binding:"required,price_range"`
	IsAvailable bool            `json:"is_available" binding:"required"`
}
