package repository

import (
	"context"
	"errors"

	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"gorm.io/gorm"
)

var (
	ErrInvalidCredentials = errors.New("メールアドレスまたはパスワードが正しくありません")
	ErrSystemError        = errors.New("システムエラーが発生しました")
)

// インターフェースの定義
type LoginRepository interface {
	FindOperatorByEmail(ctx context.Context, email string) (*models.Operator, error)
}

// loginRepository構造体の定義
type loginRepository struct {
	db *gorm.DB // データベース接続を保持
}

// 新しいLoginRepositoryを作成
func NewLoginRepository(db *gorm.DB) LoginRepository {
	return &loginRepository{
		db: db,
	}
}

// メールアドレスでオペレーターを検索するメソッド
func (r *loginRepository) FindOperatorByEmail(ctx context.Context, email string) (*models.Operator, error) {
	var operator models.Operator

	// データベースからメールアドレスでオペレーターを検索
	if err := r.db.WithContext(ctx).
		Where("email = ?", email).
		First(&operator).Error; err != nil {
		// レコードが見つからない場合のエラーハンドリング
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrInvalidCredentials
		}
		// その他のエラーの場合
		return nil, ErrSystemError
	}

	// オペレーターが見つかった場合
	return &operator, nil
}
