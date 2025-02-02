package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/riii111/go-rust-comparison/internal/application/usecase"
    "github.com/riii111/go-rust-comparison/internal/presentation/requests"
    "github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

// ProductHandler 商品に関する操作を管理する構造体
type ProductHandler struct {
    // db *gorm.DB
    productUsecase *usecase.ProductUsecase
}

// NewProductHandler 商品ハンドラーのインスタンスを生成
// func NewProductHandler(db *gorm.DB) *ProductHandler {
    // return &ProductHandler{db: db}
func NewProductHandler(productUsecase *usecase.ProductUsecase) *ProductHandler {
    return &ProductHandler{
        productUsecase: productUsecase,
    }
}

// リクエストのバリデーション
func (h *ProductHandler) CreateProduct(c *gin.Context) {
    
    // リクエストの構造体(/presentation/requests/product_requests.go)
    // var req struct {
    //     Name         string   `json:"name" binding:"required"`
    //     Description  string   `json:"description" binding:"required"`
    //     MaterialInfo string   `json:"material_info" binding:"required"`
    //     Price        float64  `json:"price" binding:"required,gt=0"`
    //     Category     string   `json:"category" binding:"required"`
    //     // TODO: 画像urlはpostgresで配列として保存、画像ファイルは別コンテナ(MinIO)で管理
    //     ImageURLs    []string `json:"image_urls"`
    // }
    var req requests.CreateProductRequest

    // バリデーション(/presentation/handlers/product_handler.go)
    // if err := c.ShouldBindJSON(&req); err != nil {
    //     c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    //     return
    // }
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, responses.ErrorResponse{
            Error: "入力内容に誤りがあります。確認して再度お試しください",
            Details: err.Error(),
        })
        return
    }


    // TODO: 認証実装後に実際のoperaterのIDを取得するように修正
    userID := "00000000-0000-0000-0000-000000000000"

    // モデル作成とDB保存処理(/usecase/product_usecase.go)
    // product := &models.Product{
    //     Name:         req.Name,
    //     Description:  req.Description,
    //     MaterialInfo: req.MaterialInfo,
    //     BasePrice:    decimal.NewFromFloat(req.Price),
    //     Category:     req.Category,
    //     ImageURLs:    pq.StringArray(req.ImageURLs),
    //     CreatedBy:    userID,
    //     UpdatedBy:    userID,        
    // }
    
    // 保存(/infrastructure/repository/product_repository.go →usecase内で使用する)
    // result := h.db.Create(product)
    // if result.Error != nil {
        //     c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        //     return
        // }
        
    if err := h.productUsecase.CreateProduct(req, userID); err != nil {
        c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
            Error: "商品の作成に失敗しました",
        })
        return
    }
        
    // レスポンス(/presentation/responses/product_response.go)
    // c.JSON(http.StatusOK, product)
    c.JSON(http.StatusCreated, responses.CreateProductResponse{
        Message: "商品の作成に成功しました",
    })
}