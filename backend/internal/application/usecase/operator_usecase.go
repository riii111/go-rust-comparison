package usecase

import (
	"errors"
	"strings"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrDuplicateEmail     = errors.New("duplicate email")
	ErrPasswordProcessing = errors.New("password processing failed")
)

type OperatorUsecase struct{}

func NewOperatorUsecase() *OperatorUsecase {
	return &OperatorUsecase{}
}

func (u *OperatorUsecase) CreateOperator(req requests.CreateOperatorRequest) error {
	// UpdatedByが設定されていない場合、CreatedByの値を使用
	if req.UpdatedBy == "" {
		req.UpdatedBy = req.CreatedBy
	}

	// パスワードのハッシュ化
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

	if err := database.DB.Create(operator).Error; err != nil {
		if strings.Contains(err.Error(), "duplicate key") {
			return ErrDuplicateEmail
		}
		return err
	}

	return nil
}
