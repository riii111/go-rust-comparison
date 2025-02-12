package storage

import (
	"context"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	// インポートが競合するのでエイリアスつける(MinIO用とAWS用のcredentialsを区別)
	minioCredentials "github.com/minio/minio-go/v7/pkg/credentials"
)

// Storage インターフェースを定義
type Storage interface {
	SaveFile(file *multipart.FileHeader) (string, error)
}

type MinioStorage struct {
	client     *minio.Client
	bucketName string
}

type S3Storage struct {
	client     *s3.S3
	bucketName string
}

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

func NewMinioStorage() (*MinioStorage, error) {
	// コンテナ内からのアクセス用
	endpoint := os.Getenv("MINIO_ENDPOINT")
	// http://localhost:9001/browserにログインするときのパス
	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	secretKey := os.Getenv("MINIO_SECRET_KEY")
	bucketName := os.Getenv("MINIO_BUCKET_NAME")

	// 認証情報設定(https://github.com/minio/minio-go/blob/master/examples/s3/get-encrypted-object.go)
	client, err := minio.New(endpoint, &minio.Options{
		Creds:  minioCredentials.NewStaticV4(accessKey, secretKey, ""),
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

// S3用の処理(共通化したい)
func NewS3Storage() (*S3Storage, error) {
	region := os.Getenv("AWS_REGION")
	accessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	secretKey := os.Getenv("AWS_SECRET_ACCESS_KEY")
	bucketName := os.Getenv("S3_BUCKET_NAME")

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(region),
		Credentials: credentials.NewStaticCredentials(accessKey, secretKey, ""),
	})
	if err != nil {
		return nil, fmt.Errorf("AWSセッションエラー: %w", err)
	}

	client := s3.New(sess)

	return &S3Storage{
		client:     client,
		bucketName: bucketName,
	}, nil
}

func (s *S3Storage) SaveFile(file *multipart.FileHeader) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("ファイルオープンエラー: %v", err)
	}
	defer src.Close()

	ext := filepath.Ext(file.Filename)
	objectName := fmt.Sprintf("%s%s", uuid.New().String(), ext)

	contentType := file.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	_, err = s.client.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String(s.bucketName),
		Key:         aws.String(objectName),
		Body:        src,
		ContentType: aws.String(contentType),
	})
	if err != nil {
		return "", fmt.Errorf("S3保存エラー: %v", err)
	}

	return fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", s.bucketName, os.Getenv("AWS_REGION"), objectName), nil
}
