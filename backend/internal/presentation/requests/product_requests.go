package requests

type CreateProductRequest struct {
    Name         string   `json:"name" binding:"required"`
    Description  string   `json:"description" binding:"required"`
    MaterialInfo string   `json:"material_info" binding:"required"`
    Price        float64  `json:"price" binding:"required,gt=0"`
    Category     string   `json:"category" binding:"required"`
    // TODO: 画像urlはpostgresで配列として保存、画像ファイルは別コンテナ(MinIO)で管理
    ImageURLs    []string `json:"image_urls"`
}