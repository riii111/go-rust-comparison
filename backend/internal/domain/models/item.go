package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	ID          string `json:"id"`
	Name        string `json:"name"`
	Price       uint   `json:"price"`
	Description string `json:"description"`
	SoldOut     bool   `json:"sold_out"`
}
