package usecase

import (
	"errors"

	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"golang.org/x/crypto/bcrypt"
)

// パスワード処理に関するエラー
var (
	ErrPasswordProcessing = errors.New("パスワードの処理に失敗しました。パスワードの要件を確認してください")
)

const (
	// システムデフォルトのUUID
	defaultSystemUUID = "00000000-0000-0000-0000-000000000000"
)

// オペレーターのユースケース構造体
type OperatorUsecase struct {
	operatorRepo repository.IOperatorRepository
}

// オペレーターユースケースのコンストラクタ
func NewOperatorUsecase(repo repository.IOperatorRepository) *OperatorUsecase {
	return &OperatorUsecase{
		operatorRepo: repo,
	}
}

// オペレーターを新規作成するメソッド
func (u *OperatorUsecase) CreateOperator(req requests.CreateOperatorRequest) error {

	// パスワードをハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return ErrPasswordProcessing
	}

	// セキュリティ対策：パスワードをメモリから消去
	// TODO: パスワードをメモリから消去する処理を追加
	// str := "password"        // 文字列（不変）
	// bytes := []byte(str)     // バイトスライス（可変）
	req.Password = ""

	// オペレーターモデルを作成
	operator := &models.Operator{
		Email:        req.Email,
		Username:     req.Username,
		PasswordHash: string(hashedPassword),
		Role:         req.Role,
		StoreID:      req.StoreID,
		AvatarURL:    req.AvatarURL,
		CreatedBy:    defaultSystemUUID,
		UpdatedBy:    defaultSystemUUID,
	}

	// リポジトリを通してオペレーターを保存
	return u.operatorRepo.Create(operator)
}
