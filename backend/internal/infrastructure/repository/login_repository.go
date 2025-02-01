package repository

import (
	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

type LoginRepository interface {
	FindOperatorByEmail(email string) (*models.Operator, error)
}

type loginRepository struct{}

func NewLoginRepository() LoginRepository {
	return &loginRepository{}
}

func (r *loginRepository) FindOperatorByEmail(email string) (*models.Operator, error) {
	var operator models.Operator
	if err := database.DB.Where("email = ?", email).First(&operator).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, err
		}
		return nil, err
	}
	return &operator, nil
}
