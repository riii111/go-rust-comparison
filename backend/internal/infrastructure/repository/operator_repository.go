package repository

import (
	"context"
	"fmt"
	"strings"

	"gorm.io/gorm"

	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

type OperatorRepository interface {
	Create(ctx context.Context, operator *models.Operator) error
	FindByID(ctx context.Context, id string) (*models.Operator, error)
	FindByEmail(ctx context.Context, email string) (*models.Operator, error)
}

type operatorRepository struct {
	db *gorm.DB
}

func NewOperatorRepository(db *gorm.DB) OperatorRepository {
	return &operatorRepository{db: db}
}

func (r *operatorRepository) Create(ctx context.Context, operator *models.Operator) error {
	result := r.db.WithContext(ctx).Create(operator)
	if result.Error != nil {
		if strings.Contains(result.Error.Error(), "uni_operators_email") {
			return ErrDuplicateEmail
		}
		return fmt.Errorf("failed to create operator: %w", result.Error)
	}
	return nil
}
