package usecase

import (
	"context"
	"fmt"
	"log"
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
	logger          *log.Logger
}

func NewLoginUseCase(loginRepository repository.LoginRepository) LoginUseCase {
	return &loginUseCase{
		loginRepository: loginRepository,
		logger:          log.New(os.Stdout, "[LoginUseCase] ", log.LstdFlags),
	}
}

type TokenPair struct {
	AccessToken  string
	RefreshToken string
}

type AuthError struct {
	message string
}

func (e *AuthError) Error() string {
	return e.message
}

func (u *loginUseCase) Execute(ctx context.Context, email, password string) (*TokenPair, error) {
	operator, err := u.authenticateUser(ctx, email, password)
	if err != nil {
		return nil, err
	}

	return u.generateTokenPair(ctx, operator)
}

func (u *loginUseCase) authenticateUser(ctx context.Context, email, password string) (*models.Operator, error) {
	operator, err := u.loginRepository.FindOperatorByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.logger.Printf("認証失敗: ユーザーが見つかりません - email: %s", email)
			return nil, &AuthError{message: "認証に失敗しました"}
		}
		u.logger.Printf("データベースエラー: %v", err)
		return nil, fmt.Errorf("データベース検索エラー: %w", err)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(operator.PasswordHash), []byte(password)); err != nil {
		u.logger.Printf("認証失敗: パスワードが一致しません - email: %s", email)
		return nil, &AuthError{message: "認証に失敗しました"}
	}

	return operator, nil
}

func (u *loginUseCase) generateTokenPair(ctx context.Context, user *models.Operator) (*TokenPair, error) {
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
		log.Printf("アクセストークンの生成に失敗しました: %v", err)
		return nil, fmt.Errorf("%w", err)
	}

	refreshTokenString, err := refreshToken.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET_KEY")))
	if err != nil {
		log.Printf("リフレッシュトークンの生成に失敗しました: %v", err)
		return nil, fmt.Errorf("%w", err)
	}

	return &TokenPair{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}
