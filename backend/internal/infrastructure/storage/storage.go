package storage

import (
	"fmt"
	"mime/multipart"
	"os"
)

// Storage インターフェースを定義
type Storage interface {
	SaveFile(file *multipart.FileHeader) (string, error)
}

// ローカルではMinIO、本番ではS3
func NewStorage() (Storage, error) {
	storageType := os.Getenv("STORAGE_TYPE")
	switch storageType {
	case "minio":
		return NewMinioStorage()
	case "s3":
		return NewS3Storage()
	default:
		return nil, fmt.Errorf("不明なストレージタイプ: %s", storageType)
	}
}
