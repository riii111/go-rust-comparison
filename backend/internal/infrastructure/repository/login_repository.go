package repository

import (
	"context"
	"errors"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

var (
	ErrInvalidCredentials = errors.New("メールアドレスまたはパスワードが正しくありません")
	ErrSystemError        = errors.New("システムエラーが発生しました")
)

type LoginRepository interface {
	FindOperatorByEmail(ctx context.Context, email string) (*models.Operator, error)
}

type loginRepository struct {
	db *gorm.DB
}

func NewLoginRepository() LoginRepository {
	return &loginRepository{
		db: database.DB,
	}
}

func (r *loginRepository) FindOperatorByEmail(ctx context.Context, email string) (*models.Operator, error) {
	var operator models.Operator

	if err := r.db.WithContext(ctx).
		Where("email = ?", email).
		First(&operator).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, ErrSystemError
	}

	return &operator, nil
}
