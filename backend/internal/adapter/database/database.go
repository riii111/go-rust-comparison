package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// データベース接続用のグローバル変数
var DB *gorm.DB

// データベース接続情報の構造体
type DBConfig struct {
	User     string
	Password string
	Host     string
	Port     string
	DBName   string
}

// 環境変数からDB設定を取得
func getDBConfig() *DBConfig {
	return &DBConfig{
		User:     os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		Host:     os.Getenv("POSTGRES_HOST"),
		Port:     os.Getenv("POSTGRES_PORT"),
		DBName:   os.Getenv("POSTGRES_NAME"),
	}
}

// DSN文字列を生成
func (c *DBConfig) buildDSN() string {
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		c.User, c.Password, c.Host, c.Port, c.DBName,
	)
}

// データベース初期化
func InitDB() {
	config := getDBConfig()
	dsn := config.buildDSN()

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		TranslateError: true, // エラー翻訳機能を有効化
	})
	if err != nil {
		log.Fatalf("データベース接続失敗: %v", err)
	}

	DB = db
	log.Println("データベース接続に成功しました")
}
