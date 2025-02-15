package requests

import (
	"mime/multipart"
)

type ImageUploadRequest struct {
	// Filesフィールドはアップロードされたファイルのヘッダー情報を保持
	Files []*multipart.FileHeader `form:"files" binding:"required"`
}

// 返り値のイメージ
// Files: []*multipart.FileHeader{
// 	&multipart.FileHeader{Filename: "file1.jpg", ...},
// 	&multipart.FileHeader{Filename: "file2.jpg", ...},
// },
