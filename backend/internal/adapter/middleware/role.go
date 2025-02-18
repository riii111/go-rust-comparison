package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

// SystemAdminOnly システム管理者のみアクセスを許可するミドルウェア
func SystemAdminOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		// コンテキストからロールを取得
		role, exists := c.Get("user_role")
		if !exists {
			c.JSON(http.StatusForbidden, responses.ErrorResponse{
				Error: "認証情報が見つかりません",
			})
			c.Abort()
			return
		}

		// システム管理者でない場合はアクセスを拒否
		if role != models.RoleSystemAdmin {
			c.JSON(http.StatusForbidden, responses.ErrorResponse{
				Error: "この操作を行う権限がありません",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
