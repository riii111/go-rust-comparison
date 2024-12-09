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
	fmt.Printf("POSTGRES_USER: %s\n", user)
	password := os.Getenv("POSTGRES_PASSWORD")
	fmt.Printf("POSTGRES_PASSWORD: %s\n", password)
	// host := os.Getenv("POSTGRES_HOST")
	// fmt.Printf("POSTGRES_HOST: %s\n", host)
	host := "db"
	port := os.Getenv("POSTGRES_PORT")
	fmt.Printf("POSTGRES_PORT: %s\n", port)
	dbname := os.Getenv("POSTGRES_NAME")
	fmt.Printf("POSTGRES_NAME: %s\n", dbname)

	// DSN形式で結合
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		user, password, host, port, dbname,
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
}
