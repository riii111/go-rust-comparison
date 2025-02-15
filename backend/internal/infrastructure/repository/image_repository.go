package repository

import (
	"github.com/riii111/go-rust-comparison/internal/infrastructure/storage"
	"mime/multipart"
)

type ImageRepository interface {
	SaveFile(file *multipart.FileHeader) (string, error)
}

type imageRepository struct {
	storage storage.Storage
}

func NewImageRepository(storage storage.Storage) ImageRepository {
	return &imageRepository{
		storage: storage,
	}
}

// 保存処理はinfrastrucure/storage/storage.goに定義
func (r *imageRepository) SaveFile(file *multipart.FileHeader) (string, error) {
	return r.storage.SaveFile(file)
}
