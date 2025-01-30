package repository

import (
	"errors"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

// データベースエラーに関する定数
var (
	ErrDuplicateEmail     = errors.New("アカウント登録に失敗しました")
	ErrForeignKeyViolated = errors.New("該当する店舗が存在しません")
)

// オペレーターリポジトリのインターフェース
type IOperatorRepository interface {
	Create(operator *models.Operator) error
}

// オペレーターリポジトリの構造体
type OperatorRepository struct {
	db *gorm.DB
}

// オペレーターリポジトリのインスタンスを生成
func NewOperatorRepository() IOperatorRepository {
	return &OperatorRepository{
		db: database.DB,
	}
}

// オペレーターを新規作成
func (r *OperatorRepository) Create(operator *models.Operator) error {
	if err := r.db.Create(operator).Error; err != nil {
		// メールアドレスの重複チェック
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return ErrDuplicateEmail
		}
		// 外部キー制約違反のチェック
		if errors.Is(err, gorm.ErrForeignKeyViolated) {
			return ErrForeignKeyViolated
		}
		return err
	}
	return nil
}
