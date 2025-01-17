package repository

import (
	"errors"
	"strings"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

type OperatorRepository struct {
	db *gorm.DB
}

func NewOperatorRepository() *OperatorRepository {
	return &OperatorRepository{
		db: database.DB,
	}
}

// CreateOperator オペレーターを作成する
func (r *OperatorRepository) CreateOperator(operator *models.Operator) error {
	result := r.db.Create(operator)
	if result.Error != nil {
		// PostgreSQLのユニーク制約違反エラーをチェック
		if strings.Contains(result.Error.Error(), "uni_operators_email") {
			return ErrDuplicateEmail
		}
		return result.Error
	}
	return nil
}

// FindByEmail メールアドレスでオペレーターを検索する
func (r *OperatorRepository) FindByEmail(email string) (*models.Operator, error) {
	var operator models.Operator
	result := r.db.Where("email = ?", email).First(&operator)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &operator, nil
}

// リポジトリ層で使用するエラー定義
var (
	ErrDuplicateEmail = errors.New("duplicate email")
)
