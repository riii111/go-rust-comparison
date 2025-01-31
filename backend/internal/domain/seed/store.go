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
			PhoneNumber:   "03123456789",
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
			PhoneNumber:   "06123456789",
			BusinessHours: "10:00-19:00",
			ZipCode:       "542-0085",
			Description:   "大阪支店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
		{
			Name:          "山科支店",
			Address:       "京都府京都市山科区竹鼻竹ノ街道町1-1",
			PhoneNumber:   "07512345678",
			BusinessHours: "10:00-19:00",
			ZipCode:       "607-8075",
			Description:   "山科支店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
		{
			Name:          "名古屋支店",
			Address:       "愛知県名古屋市中区栄3-1-1",
			PhoneNumber:   "05212345678",
			BusinessHours: "10:00-19:00",
			ZipCode:       "460-0008",
			Description:   "名古屋支店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
		{
			Name:          "愛荘支店",
			Address:       "滋賀県愛知郡愛荘町愛知川1-1",
			PhoneNumber:   "07492345678",
			BusinessHours: "10:00-19:00",
			ZipCode:       "529-1313",
			Description:   "愛荘支店です",
			IsActive:      true,
			CreatedBy:     systemUUID,
			UpdatedBy:     systemUUID,
		},
	}
}
