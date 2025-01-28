package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/application/usecase"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/riii111/go-rust-comparison/internal/presentation/requests"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

type OperatorHandler struct {
	operatorUsecase *usecase.OperatorUsecase
}

func NewOperatorHandler(operatorUsecase *usecase.OperatorUsecase) *OperatorHandler {
	return &OperatorHandler{
		operatorUsecase: operatorUsecase,
	}
}

func (h *OperatorHandler) CreateOperator(c *gin.Context) {
	var req requests.CreateOperatorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, responses.ErrorResponse{
			Error:   "入力内容に誤りがあります。確認して再度お試しください",
			Details: err.Error(),
		})
		return
	}

	err := h.operatorUsecase.CreateOperator(req)
	if err != nil {
		switch err {
		case repository.ErrDuplicateEmail:
			c.JSON(http.StatusConflict, responses.ErrorResponse{Error: repository.ErrDuplicateEmail.Error()})
		case usecase.ErrPasswordProcessing:
			c.JSON(http.StatusUnprocessableEntity, responses.ErrorResponse{
				Error: usecase.ErrPasswordProcessing.Error(),
			})
		default:
			c.JSON(http.StatusUnprocessableEntity, responses.ErrorResponse{
				Error: "オペレーターの登録に失敗しました。入力内容を確認してください",
			})
		}
		return
	}

	c.JSON(http.StatusCreated, responses.CreateOperatorResponse{
		Message: "オペレーターの登録に成功しました",
	})
}
