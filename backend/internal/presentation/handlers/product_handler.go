package handlers

import (
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/lib/pq"
    "github.com/riii111/go-rust-comparison/internal/domain/models"
    "github.com/shopspring/decimal"
    "gorm.io/gorm"
)

// ProductHandler 商品に関する操作を管理する構造体
type ProductHandler struct {
    db *gorm.DB
}

// NewProductHandler 商品ハンドラーのインスタンスを生成
func NewProductHandler(db *gorm.DB) *ProductHandler {
    return &ProductHandler{db: db}
}

// リクエストのバリデーション
func (h *ProductHandler) CreateProduct(c *gin.Context) {
    var req struct {
        Name         string   `json:"name" binding:"required"`
        Description  string   `json:"description" binding:"required"`
        MaterialInfo string   `json:"material_info" binding:"required"`
        Price        float64  `json:"price" binding:"required,gt=0"`
        Category     string   `json:"category" binding:"required"`
        // TODO: 画像urlはpostgresで配列として保存、画像ファイルは別コンテナ(MinIO)で管理
        ImageURLs    []string `json:"image_urls"`
    }

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // TODO: 認証実装後に実際のoperaterのIDを取得するように修正
    userID := "00000000-0000-0000-0000-000000000000"

    // モデルの作成
    product := &models.Product{
        Name:         req.Name,
        Description:  req.Description,
        MaterialInfo: req.MaterialInfo,
        BasePrice:    decimal.NewFromFloat(req.Price),
        Category:     req.Category,
        ImageURLs:    pq.StringArray(req.ImageURLs),
        CreatedBy:    userID,
        UpdatedBy:    userID,
        
    }

    // 保存
    result := h.db.Create(product)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    // レスポンス
    c.JSON(http.StatusOK, product)
}