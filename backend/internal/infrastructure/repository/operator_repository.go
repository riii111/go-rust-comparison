package repository

import (
	"errors"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

var (
	ErrDuplicateEmail = errors.New("既に登録されているメールアドレスです")
)

type OperatorRepository struct {
	db *gorm.DB
}

func NewOperatorRepository() *OperatorRepository {
	return &OperatorRepository{
		db: database.DB,
	}
}

func (r *OperatorRepository) isEmailExists(email string) (bool, error) {
	var count int64
	if err := r.db.Model(&models.Operator{}).Where("email = ?", email).Count(&count).Error; err != nil {
		return false, err
	}
	return count > 0, nil
}

func (r *OperatorRepository) Create(operator *models.Operator) error {
	exists, err := r.isEmailExists(operator.Email)
	if err != nil {
		return err
	}
	if exists {
		return ErrDuplicateEmail
	}

	return r.db.Create(operator).Error
}
