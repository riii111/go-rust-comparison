package handlers

import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/lib/pq"
    "github.com/riii111/go-rust-comparison/internal/domain/models"
    "github.com/riii111/go-rust-comparison/internal/infrastructure/storage"
    "github.com/shopspring/decimal"
    "gorm.io/gorm"
)

// ProductHandler 商品に関する操作を管理する構造体
type ProductHandler struct {
    db *gorm.DB
    storage *storage.MinioStorage
}

// NewProductHandler 商品ハンドラーのインスタンスを生成
func NewProductHandler(db *gorm.DB, storage *storage.MinioStorage) *ProductHandler {
    return &ProductHandler{
        db:      db,
        storage: storage, // MinIOのストレージを初期化
    }
}

// 画像アップロード用ハンドラ
func (h *ProductHandler) UploadImage(c *gin.Context) {
    // 1. マルチパートフォームを解析(複数の画像受信)
    form, err := c.MultipartForm()
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "マルチパートフォームの解析エラー",
        })
        return
    }

    // 2. ファイル配列取得
    files := form.File["image"]
    fmt.Printf("ファイル数: %d\n", len(files))

    if len(files) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "画像ファイルが必要です",
        })
        return
    }

    // 3. 各ファイル処理
    urls := []string{}
    for i, file := range files {
        fmt.Printf("処理中のファイル %d: %s\n", i, file.Filename) // デバッグログ

        // 4. 画像タイプ検証
        if !isValidImageType(file.Header.Get("Content-Type")) {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "無効なファイル形式です",
            })
            return
        }

        // 5. MinIOへ保存(SaveFileはminio.goで定義)
        url, err := h.storage.SaveFile(file)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": "アップロードエラー",
            })
            return
        }
        // 6. URL配列に追加
        urls = append(urls, url)
    }

    c.JSON(http.StatusOK, gin.H{
        "urls": urls,
        "count": len(urls),
        "message": "アップロード成功",
    })
}

// リクエストのバリデーション
func (h *ProductHandler) CreateProduct(c *gin.Context) {
    // フォームデータのバインド
    var req struct {
        Name         string   `json:"name" binding:"required"`
        Description  string   `json:"description" binding:"required"`
        MaterialInfo string   `json:"material_info" binding:"required"`
        Price        float64  `json:"price" binding:"required,gt=0"`
        Category     string   `json:"category" binding:"required"`
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
        // CreatedAt:    time.Now(), // gormが勝手にやってくれる？
        // UpdatedAt:    time.Now(),
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

// 画像タイプの検証
func isValidImageType(contentType string) bool {
    validTypes := map[string]bool{
        "image/jpeg": true,
        "image/png":  true,
        "image/gif":  true,
        "image/jpg":  true, // JPEGの別形式
    }
    fmt.Printf("Checking content type: %s\n", contentType)
    return validTypes[contentType]
}