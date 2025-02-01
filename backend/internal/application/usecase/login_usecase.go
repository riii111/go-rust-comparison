package usecase

import (
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
	Execute(email, password string) (*TokenPair, error)
}

type loginUseCase struct {
	loginRepository repository.LoginRepository
}

func NewLoginUseCase(loginRepository repository.LoginRepository) LoginUseCase {
	return &loginUseCase{loginRepository: loginRepository}
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

func (u *loginUseCase) Execute(email, password string) (*TokenPair, error) {
	operator, err := u.authenticateUser(email, password)
	if err != nil {
		return nil, err
	}

	return u.generateTokenPair(operator)
}

func (u *loginUseCase) authenticateUser(email, password string) (*models.Operator, error) {
	operator, err := u.loginRepository.FindOperatorByEmail(email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Printf("認証に失敗しました")
			return nil, &AuthError{}
		}
		log.Printf("データベースエラー: %s", err)
		return nil, &AuthError{}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(operator.PasswordHash), []byte(password)); err != nil {
		log.Printf("認証に失敗しました")
		return nil, &AuthError{}
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
