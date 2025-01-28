package usecase

import (
	"errors"

	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrPasswordProcessing = errors.New("パスワードの処理に失敗しました。パスワードの要件を確認してください")
)

type OperatorUsecase struct{}

func NewOperatorUsecase() *OperatorUsecase {
	return &OperatorUsecase{}
}

func (u *OperatorUsecase) CreateOperator(req requests.CreateOperatorRequest) error {
	if req.UpdatedBy == "" {
		req.UpdatedBy = req.CreatedBy
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return ErrPasswordProcessing
	}

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

	operatorRepo := repository.NewOperatorRepository()
	return operatorRepo.Create(operator)
}
