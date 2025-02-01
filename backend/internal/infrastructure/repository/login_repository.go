package repository

import (
	"context"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

type LoginRepository interface {
	FindOperatorByEmail(ctx context.Context, email string) (*models.Operator, error)
}

type loginRepository struct{}

func NewLoginRepository() LoginRepository {
	return &loginRepository{}
}

func (r *loginRepository) FindOperatorByEmail(ctx context.Context, email string) (*models.Operator, error) {
	var operator models.Operator
	if err := database.DB.WithContext(ctx).Where("email = ?", email).First(&operator).Error; err != nil {
		return nil, err
	}
	return &operator, nil
}
