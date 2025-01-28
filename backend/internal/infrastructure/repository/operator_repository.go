package repository

import (
	"errors"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

var (
	ErrDuplicateEmail     = errors.New("既に登録されているメールアドレスです")
	ErrForeignKeyViolated = errors.New("該当する店舗が存在しません")
)

type OperatorRepository struct {
	db *gorm.DB
}

func NewOperatorRepository() *OperatorRepository {
	return &OperatorRepository{
		db: database.DB,
	}
}

func (r *OperatorRepository) Create(operator *models.Operator) error {
	if err := r.db.Create(operator).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return ErrDuplicateEmail
		}
		if errors.Is(err, gorm.ErrForeignKeyViolated) {
			return ErrForeignKeyViolated
		}
		return err
	}
	return nil
}
