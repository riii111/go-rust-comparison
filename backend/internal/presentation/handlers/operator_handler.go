package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

// オペレーターハンドラーの構造体
type OperatorHandler struct {
	operatorUsecase *usecase.OperatorUsecase
}

// オペレーターハンドラーのコンストラクタ
func NewOperatorHandler(operatorUsecase *usecase.OperatorUsecase) *OperatorHandler {
	return &OperatorHandler{
		operatorUsecase: operatorUsecase,
	}
}

// オペレーターを新規作成するハンドラー
func (h *OperatorHandler) CreateOperator(c *gin.Context) {
	// リクエストボディをバインド
	var req requests.CreateOperatorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		errorResponse := responses.ErrorResponse{
			Error: "入力内容に誤りがあります。確認して再度お試しください",
		}

		// デバッグモードの場合のみエラー詳細を追加
		if gin.Mode() == gin.DebugMode {
			errorResponse.Details = err.Error()
		}

		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	// オペレーター作成処理を実行
	err := h.operatorUsecase.CreateOperator(req)
	if err != nil {
		// エラーの種類に応じてレスポンスを返す
		switch err {
		case repository.ErrDuplicateEmail:
			c.JSON(http.StatusConflict, responses.ErrorResponse{Error: repository.ErrDuplicateEmail.Error()})
		case repository.ErrForeignKeyViolated:
			c.JSON(http.StatusConflict, responses.ErrorResponse{Error: repository.ErrForeignKeyViolated.Error()})
		case usecase.ErrPasswordProcessing:
			c.JSON(http.StatusUnprocessableEntity, responses.ErrorResponse{
				Error: usecase.ErrPasswordProcessing.Error(),
			})
		default:
			// エラーの種類が不明な場合
			c.JSON(http.StatusInternalServerError, responses.ErrorResponse{
				Error: "システムエラーが発生しました。しばらく時間をおいて再度お試しください",
			})
			// エラーログの出力
			log.Printf("サーバーエラー: %v", err)
		}
		return
	}

	// 成功レスポンスを返す
	c.JSON(http.StatusCreated, responses.CreateOperatorResponse{
		Message: "オペレーターの登録に成功しました",
	})
}
