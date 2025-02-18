package requests

import (
	"unicode"

	"github.com/go-playground/validator/v10"
)

type CreateOperatorRequest struct {
	Email     string `json:"email" binding:"required,email"`
	Username  string `json:"username" binding:"required"`
	Password  string `json:"password" binding:"required,password"`
	Role      string `json:"role" binding:"required,oneof=system_admin store_admin"`
	StoreID   string `json:"store_id" binding:"required,uuid"`
	AvatarURL string `json:"avatar_url" binding:"omitempty,url"`
}

// パスワードの最小文字数
const minPasswordLength = 8

// カスタムバリデーション関数を登録
func RegisterOperatorValidations(v *validator.Validate) error {
	if err := v.RegisterValidation("password", validatePassword); err != nil {
		return err
	}
	return nil
}

// パスワードバリデーション関数
// パスワードは以下の条件を満たす必要があります:
// - 8文字以上であること
// - 大文字を1文字以上含むこと
// - 小文字を1文字以上含むこと
// - 数字を1文字以上含むこと
// - 記号を1文字以上含むこと
func validatePassword(fl validator.FieldLevel) bool {
	password := fl.Field().String()

	if len(password) < minPasswordLength {
		return false
	}

	return hasRequiredCharacterTypes(password)
}

// パスワードに必要な文字種が含まれているかチェックする
func hasRequiredCharacterTypes(password string) bool {
	var (
		hasUpper, hasLower, hasNumber, hasSymbol bool
	)

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSymbol = true
		}

		if hasUpper && hasLower && hasNumber && hasSymbol {
			return true
		}
	}

	return false
}
