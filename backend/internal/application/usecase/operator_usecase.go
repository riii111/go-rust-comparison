package usecase

import (
	"context"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"

	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/domain/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

var (
	ErrStoreNotFound  = errors.New("指定された店舗が存在しません")
	ErrDuplicateEmail = errors.New("このメールアドレスは既に使用されています")
	ErrPasswordHash   = errors.New("パスワードのハッシュ化に失敗しました")
)

type OperatorUsecase struct {
	operatorRepo repository.OperatorRepository
	storeRepo    repository.StoreRepository
}

func NewOperatorUsecase(
	operatorRepo repository.OperatorRepository,
	storeRepo repository.StoreRepository,
) *OperatorUsecase {
	return &OperatorUsecase{
		operatorRepo: operatorRepo,
		storeRepo:    storeRepo,
	}
}

func (u *OperatorUsecase) CreateOperator(ctx context.Context, req *requests.CreateOperatorRequest) (*models.Operator, error) {
	// 店舗の存在確認
	if _, err := u.storeRepo.FindByID(ctx, req.StoreID); err != nil {
		return nil, ErrStoreNotFound
	}

	// パスワードのハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, ErrPasswordHash
	}

	operator := &models.Operator{
		Email:        req.Email,
		Username:     req.Username,
		PasswordHash: string(hashedPassword),
		Role:         req.Role,
		StoreID:      req.StoreID,
		CreatedBy:    req.CreatedBy,
		AvatarURL:    req.AvatarURL,
	}

	if err := u.operatorRepo.Create(ctx, operator); err != nil {
		if errors.Is(err, repository.ErrDuplicateEmail) {
			return nil, ErrDuplicateEmail
		}
		return nil, fmt.Errorf("オペレーターの作成に失敗しました: %w", err)
	}

	operator.PasswordHash = "" // レスポンスからパスワードハッシュを除外
	return operator, nil
}
