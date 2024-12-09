package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name        string `json:"name"`
	Price       uint   `json:"price"`
	Description string `json:"description"`
	SoldOut     bool   `json:"sold_out"`
}
