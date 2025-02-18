package storage

import (
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
)

type S3Storage struct {
	client     *s3.S3
	bucketName string
}

// S3用の処理
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
