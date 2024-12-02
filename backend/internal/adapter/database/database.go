package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"auth-system/models"
)

var DB *gorm.DB

func InitDB() {
	// 環境変数をロード
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// PostgreSQLのDSN（データソース名）を取得
	dsn := os.Getenv("DATABASE_URL")

	// データベース接続
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// UUID拡張機能を有効化
	db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

	// マイグレーションを実行
	err = db.AutoMigrate(&models.Operator{}, &models.Store{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	DB = db
}
