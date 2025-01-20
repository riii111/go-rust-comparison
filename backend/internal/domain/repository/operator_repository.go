package repository

import (
	"context"
	"errors"

	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

var (
	ErrDuplicateEmail = errors.New("duplicate email")
)

type OperatorRepository interface {
	Create(ctx context.Context, operator *models.Operator) error
	FindByID(ctx context.Context, id string) (*models.Operator, error)
}

type StoreRepository interface {
	FindByID(ctx context.Context, id string) (*models.Store, error)
}
