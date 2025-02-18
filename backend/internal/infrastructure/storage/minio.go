package storage

import (
	"context"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioStorage struct {
	client     *minio.Client
	bucketName string
}

func NewMinioStorage() (*MinioStorage, error) {
	// コンテナ内からのアクセス用
	endpoint := os.Getenv("MINIO_ENDPOINT")
	// http://localhost:9001/browserにログインするときのパス
	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	secretKey := os.Getenv("MINIO_SECRET_KEY")
	bucketName := os.Getenv("MINIO_BUCKET_NAME")

	// 認証情報設定(https://github.com/minio/minio-go/blob/master/examples/s3/get-encrypted-object.go)
	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false, // 開発環境なのでHTTP接続で指定
	})
	if err != nil {
		return nil, fmt.Errorf("minioエラー: %w", err)
	}

	// contextはリクエストのキャンセルやタイムアウトを管理するための必要
	ctx := context.Background()
	// 指定したバケットが存在するかどうか
	exists, err := client.BucketExists(ctx, bucketName)
	if err != nil {
		return nil, fmt.Errorf("bucketエラー: %w", err)
	}

	// バケットが存在しない場合、新しいバケットを作成
	if !exists {
		if err = client.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{}); err != nil {
			return nil, fmt.Errorf("createエラー: %w", err)
		}
	}

	return &MinioStorage{
		client:     client,
		bucketName: bucketName,
	}, nil
}

func (s *MinioStorage) SaveFile(file *multipart.FileHeader) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("ファイルオープンエラー: %v", err)
	}
	defer src.Close()

	// UUIDでファイル名を生成
	ext := filepath.Ext(file.Filename)
	objectName := fmt.Sprintf("%s%s", uuid.New().String(), ext)

	fmt.Printf("MinIOに保存: %s\n", objectName)

	contentType := file.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	// MinIOへ保存
	_, err = s.client.PutObject(
		context.Background(),
		s.bucketName,
		objectName,
		src,
		file.Size,
		minio.PutObjectOptions{ContentType: contentType},
	)
	if err != nil {
		return "", fmt.Errorf("MinIO保存エラー: %v", err)
	}

	// 公開URLつくる
	return fmt.Sprintf("http://localhost:9000/%s/%s", s.bucketName, objectName), nil
}
