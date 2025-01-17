package main

import (
	"log"

	"github.com/riii111/go-rust-comparison/internal/adapter/database"
	"github.com/riii111/go-rust-comparison/internal/domain/seed"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("パスワードのハッシュ化に失敗しました: %v", err)
	}
	return string(hashedPassword)
}

func main() {
	database.InitDB()

	// 店舗のシードデータを作成
	stores := seed.CreateStoreSeedData()
	storeIDs := make(map[string]string) // 店舗名とIDのマッピング
	successCount := 0

	for _, store := range stores {
		if err := database.DB.Create(&store).Error; err != nil {
			log.Printf("店舗データの作成に失敗しました: %v", err)
			continue
		}
		storeIDs[store.Name] = store.ID
		successCount++
	}
	log.Printf("店舗のシードデータを %d 件作成しました", successCount)

	// オペレーターのシードデータを作成
	operators := seed.CreateOperatorSeedData()
	successCount = 0

	for i := range operators {
		// パスワードをハッシュ化
		operators[i].PasswordHash = hashPassword(operators[i].PasswordHash)

		// 店舗管理者の場合、対応する店舗のIDを設定
		switch operators[i].Username {
		case "システム管理者1", "システム管理者2":
			operators[i].StoreID = storeIDs["東京本店"]
		case "東京店管理者1", "東京店管理者2":
			operators[i].StoreID = storeIDs["東京本店"]
		case "大阪店管理者1", "大阪店管理者2":
			operators[i].StoreID = storeIDs["大阪支店"]
		case "名古屋店管理者1":
			operators[i].StoreID = storeIDs["名古屋支店"]
		case "山科店管理者1":
			operators[i].StoreID = storeIDs["山科支店"]
		case "愛荘店管理者1", "愛荘店管理者2":
			operators[i].StoreID = storeIDs["愛荘支店"]
		default:
			// デフォルトで東京本店に割り当て
			operators[i].StoreID = storeIDs["東京本店"]
		}

		if err := database.DB.Create(&operators[i]).Error; err != nil {
			log.Printf("オペレーターデータの作成に失敗しました: %v", err)
			continue
		}
		successCount++
	}

	if successCount > 0 {
		log.Printf("オペレーターのシードデータを %d 件作成しました", successCount)
	}
}
