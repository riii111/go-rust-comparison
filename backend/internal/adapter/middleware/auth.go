package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware は認証が必要なエンドポイントに使用するミドルウェア
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Cookieからアクセストークンを取得し、存在しない場合は401エラーを返す
		tokenString, err := c.Cookie("access_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "認証が必要です"})
			c.Abort()
			return
		}

		// JWTトークンの検証処理
		// HMAC-SHA署名方式の確認とシークレットキーの設定
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(os.Getenv("JWT_SECRET_KEY")), nil
		})

		// トークン検証エラーの処理
		// 期限切れの場合と他のエラーで異なるメッセージを返す
		if err != nil {
			if strings.Contains(err.Error(), "expired") {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "トークンの有効期限が切れています"})
			} else {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "無効なトークンです"})
			}
			c.Abort()
			return
		}

		// トークンが有効な場合、クレームからユーザー情報を取得し
		// Ginのコンテキストに設定して次のハンドラに進む
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("user_id", claims["sub"])
			c.Set("user_email", claims["email"])
			c.Set("user_role", claims["role"])
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "無効なトークンです"})
			c.Abort()
			return
		}
	}
}
