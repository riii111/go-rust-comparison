package usecase

import (
	"errors"
	"strings"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var (
	ErrDuplicateEmail     = errors.New("duplicate email")
	ErrPasswordProcessing = errors.New("password processing failed")
	ErrStoreNotFound      = errors.New("store not found")
)

type OperatorUsecase struct{}

func NewOperatorUsecase() *OperatorUsecase {
	return &OperatorUsecase{}
}

func (u *OperatorUsecase) CreateOperator(req requests.CreateOperatorRequest) error {
	if req.UpdatedBy == "" {
		req.UpdatedBy = req.CreatedBy
	}

	// 店舗の存在確認
	var store models.Store
	if err := database.DB.First(&store, "id = ?", req.StoreID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return ErrStoreNotFound
		}
		return err
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

	if err := database.DB.Create(operator).Error; err != nil {
		if strings.Contains(err.Error(), "duplicate key") {
			return repository.ErrDuplicateEmail
		}
		return err
	}

	return nil
}
