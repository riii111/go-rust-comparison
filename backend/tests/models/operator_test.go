package models_test

import (
	"testing"

	"github.com/go-playground/validator/v10"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPasswordValidation(t *testing.T) {
	validate := validator.New()
	models.RegisterCustomValidations(validate)

	tests := []struct {
		name     string
		password string
		wantErr  bool
	}{
		{
			name:     "有効なパスワード",
			password: "Password1!",
			wantErr:  false,
		},
		{
			name:     "8文字未満",
			password: "Pass1!",
			wantErr:  true,
		},
		{
			name:     "大文字なし",
			password: "password1!",
			wantErr:  true,
		},
		{
			name:     "小文字なし",
			password: "PASSWORD1!",
			wantErr:  true,
		},
		{
			name:     "数字なし",
			password: "Password!",
			wantErr:  true,
		},
		{
			name:     "記号なし",
			password: "Password1",
			wantErr:  true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			operator := &models.Operator{
				Email:        "test@example.com",
				Username:     "testuser",
				PasswordHash: tt.password,
				Role:         "operator",
				StoreID:      "550e8400-e29b-41d4-a716-446655440000",
				CreatedBy:    "550e8400-e29b-41d4-a716-446655440001",
				UpdatedBy:    "550e8400-e29b-41d4-a716-446655440001",
				Store: models.Store{
					PhoneNumber: "09012345678",
				},
			}

			err := validate.Struct(operator)

			if tt.wantErr {
				require.Error(t, err)
				assert.Contains(t, err.Error(), "password")
			} else {
				assert.NoError(t, err)
			}
		})
	}
}
