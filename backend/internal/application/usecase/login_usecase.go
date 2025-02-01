package usecase

import (
	"context"
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginUseCase interface {
	Execute(ctx context.Context, email, password string) (*TokenPair, error)
}

type loginUseCase struct {
	loginRepository repository.LoginRepository
}

func NewLoginUseCase(loginRepository repository.LoginRepository) LoginUseCase {
	return &loginUseCase{
		loginRepository: loginRepository,
	}
}

type TokenPair struct {
	AccessToken  string
	RefreshToken string
}

var (
	ErrInvalidCredentials = errors.New("メールアドレスまたはパスワードが正しくありません")
	ErrSystemError        = errors.New("システムエラーが発生しました")
)

func (u *loginUseCase) Execute(ctx context.Context, email, password string) (*TokenPair, error) {
	operator, err := u.authenticateUser(ctx, email, password)
	if err != nil {
		return nil, err
	}

	return u.generateTokenPair(operator)
}

func (u *loginUseCase) authenticateUser(ctx context.Context, email, password string) (*models.Operator, error) {
	operator, err := u.loginRepository.FindOperatorByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, ErrSystemError
	}

	if err := bcrypt.CompareHashAndPassword([]byte(operator.PasswordHash), []byte(password)); err != nil {
		return nil, ErrInvalidCredentials
	}

	return operator, nil
}

func (u *loginUseCase) generateTokenPair(user *models.Operator) (*TokenPair, error) {
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	accessTokenString, err := accessToken.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	if err != nil {
		return nil, ErrSystemError
	}

	refreshTokenString, err := refreshToken.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET_KEY")))
	if err != nil {
		return nil, ErrSystemError
	}

	return &TokenPair{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}
