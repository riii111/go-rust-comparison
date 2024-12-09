package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func buildDSN() string {
	// 環境変数から値を取得
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	port := os.Getenv("POSTGRES_PORT")
	dbname := os.Getenv("POSTGRES_NAME")

	// DSN形式で結合
	return fmt.Sprintf(
		"postgres://%s:%s@db:%s/%s?sslmode=disable",
		user, password, port, dbname,
	)
}

func InitDB() {
	// DSNを構築
	dsn := buildDSN()

	// Gormを使用してデータベースに接続
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("データベース接続失敗: %v", err)
	}

	// グローバル変数に設定
	DB = db
	log.Println("データベース接続に成功しました")
}
