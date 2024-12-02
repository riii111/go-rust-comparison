package utils

import (
	"errors"
	"regexp"

	"golang.org/x/crypto/bcrypt"
)

// パスワードポリシーを定義
var passwordRegex = regexp.MustCompile(`^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`)

// パスワードのバリデーション
func ValidatePassword(password string) error {
	if !passwordRegex.MatchString(password) {
		return errors.New("password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters")
	}
	return nil
}

// パスワードをハッシュ化
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// ハッシュされたパスワードを検証
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
