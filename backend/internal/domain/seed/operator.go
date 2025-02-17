package seed

import (
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

func CreateOperatorSeedData() []models.Operator {
	systemUUID := "00000000-0000-0000-0000-000000000000"
	deletedByPtr := &systemUUID

	return []models.Operator{
		// システム管理者
		{
			Email:        "system1@example.com",
			Username:     "システム管理者1",
			PasswordHash: "Password1!",
			Role:         models.RoleSystemAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "system2@example.com",
			Username:     "システム管理者2",
			PasswordHash: "Password1!",
			Role:         models.RoleSystemAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		// 店舗管理者
		{
			Email:        "tokyo1@example.com",
			Username:     "東京店管理者1",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "tokyo2@example.com",
			Username:     "東京店管理者2",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "osaka1@example.com",
			Username:     "大阪店管理者1",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "osaka2@example.com",
			Username:     "大阪店管理者2",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "nagoya1@example.com",
			Username:     "名古屋店管理者1",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "yamashina1@example.com",
			Username:     "山科店管理者1",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "aisho1@example.com",
			Username:     "愛荘店管理者1",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
		{
			Email:        "aisho2@example.com",
			Username:     "愛荘店管理者2",
			PasswordHash: "Password1!",
			Role:         models.RoleStoreAdmin,
			StoreID:      systemUUID,
			AvatarURL:    systemUUID,
			CreatedBy:    systemUUID,
			UpdatedBy:    systemUUID,
			DeletedBy:    deletedByPtr,
		},
	}
}
