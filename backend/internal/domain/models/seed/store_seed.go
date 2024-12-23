package seed

import (
	"github.com/riii111/go-rust-comparison/internal/domain/models"
)

func CreateStoreSeedData() []models.Store {
	// システム用の固定UUIDを作成
	systemUUID := "00000000-0000-0000-0000-000000000000"

	return []models.Store{
		{
			Name:          "東京本店",
			Address:       "東京都渋谷区神宮前1-1-1",
			PhoneNumber:   "03123456789", // ハイフンなしの11桁に修正
			BusinessHours: "10:00-19:00",
			ZipCode:       "150-0001",
			Description:   "東京本店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
		{
			Name:          "大阪支店",
			Address:       "大阪府大阪市中央区心斎橋1-1-1",
			PhoneNumber:   "06123456789", // ハイフンなしの11桁に修正
			BusinessHours: "10:00-19:00",
			ZipCode:       "542-0085",
			Description:   "大阪支店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
		{
			Name:          "福岡支店",
			Address:       "福岡県福岡市博多区博多駅前1-1-1",
			PhoneNumber:   "09212345678", // ハイフンなしの11桁に修正
			BusinessHours: "10:00-19:00",
			ZipCode:       "812-0011",
			Description:   "福岡支店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
	}
}
