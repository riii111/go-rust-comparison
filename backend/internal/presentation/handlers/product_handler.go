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
    productUsecase *usecase.ProductUsecase
}

// NewProductHandler 商品ハンドラーのインスタンスを生成
func NewProductHandler(productUsecase *usecase.ProductUsecase) *ProductHandler {
    return &ProductHandler{
        productUsecase: productUsecase,
    }
}

// リクエストのバリデーション
func (h *ProductHandler) CreateProduct(c *gin.Context) {
    var req requests.CreateProductRequest

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, responses.ErrorResponse{
            Error: "入力内容に誤りがあります。確認して再度お試しください",
            Details: err.Error(),
        })
        return
    }


    // TODO: 認証実装後に実際のoperaterのIDを取得するように修正
    userID := "00000000-0000-0000-0000-000000000000"

    if err := h.productUsecase.CreateProduct(req, userID); err != nil {
        c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
            Error: "商品の作成に失敗しました",
        })
        return
    }
        
    c.JSON(http.StatusCreated, responses.CreateProductResponse{
        Message: "商品の作成に成功しました",
    })
}