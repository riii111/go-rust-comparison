package usecase

import (
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
)

type ImageUploadUsecase struct {
	imageRepository repository.ImageRepository
}

func NewImageUploadUsecase(imageRepository repository.ImageRepository) *ImageUploadUsecase {
	return &ImageUploadUsecase{
		imageRepository: imageRepository,
	}
}

// 画像のアップロードとそのURLを返却する処理
func (u *ImageUploadUsecase) UploadImages(req requests.ImageUploadRequest) ([]string, error) {
	var urls []string
	// リクエストに含まれるファイルたちを処理
	for _, file := range req.Files {
		// 画像を保存・URL取得
		url, err := u.imageRepository.SaveFile(file)
		if err != nil {
			return nil, err
		}
		// 取得したURLをリストに追加していく
		urls = append(urls, url)
	}
	// すべての画像のURLを返す
	return urls, nil
}
