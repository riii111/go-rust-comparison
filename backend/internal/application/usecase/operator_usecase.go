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

// オペレーターのユースケース構造体
type OperatorUsecase struct{}

// オペレーターユースケースのコンストラクタ
func NewOperatorUsecase() *OperatorUsecase {
	return &OperatorUsecase{}
}

// オペレーターを新規作成するメソッド
func (u *OperatorUsecase) CreateOperator(req requests.CreateOperatorRequest) error {
	// 更新者が未設定の場合は作成者を設定
	if req.UpdatedBy == "" {
		req.UpdatedBy = req.CreatedBy
	}

	// パスワードをハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return ErrPasswordProcessing
	}

	// セキュリティ対策：パスワードをメモリから消去
	req.Password = ""

	// オペレーターモデルを作成
	operator := &models.Operator{
		Email:        req.Email,
		Username:     req.Username,
		PasswordHash: string(hashedPassword),
		Role:         req.Role,
		StoreID:      req.StoreID,
		AvatarURL:    req.AvatarURL,
		CreatedBy:    req.CreatedBy,
		UpdatedBy:    req.CreatedBy,
	}

	// リポジトリを通してオペレーターを保存
	operatorRepo := repository.NewOperatorRepository()
	return operatorRepo.Create(operator)
}
