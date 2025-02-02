package middleware

import (
	"net/http"
	"os"
	"strings"

	"errors"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

// パッケージレベルでエラーを定義
var (
	ErrAuthRequired       = errors.New("認証が必要です")
	ErrTokenExpired       = errors.New("トークンの有効期限が切れています")
	ErrInvalidTokenFormat = errors.New("無効なトークン形式です")
)

// 認証が必要なエンドポイントに使用するミドルウェア
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Cookieからアクセストークンを取得し、存在しない場合は401エラーを返す
		tokenString, err := c.Cookie("access_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, responses.ErrorResponse{
				Error: ErrAuthRequired.Error(),
			})
			c.Abort()
			return
		}

		// JWT検証処理を分離
		claims, err := validateToken(tokenString)
		if err != nil {
			handleTokenError(c, err)
			return
		}

		// ユーザー情報をコンテキストに設定
		setUserContext(c, claims)
		c.Next()
	}
}

// validateToken はJWTトークンを検証し、クレームを返します
func validateToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(os.Getenv("JWT_SECRET_KEY")), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, ErrInvalidTokenFormat
	}

	return claims, nil
}

// handleTokenError はトークン検証エラーを適切に処理します
func handleTokenError(c *gin.Context, err error) {
	switch {
	case strings.Contains(err.Error(), "expired"):
		c.JSON(http.StatusUnauthorized, responses.ErrorResponse{
			Error: ErrTokenExpired.Error(),
		})
	case err == jwt.ErrSignatureInvalid:
		c.JSON(http.StatusUnauthorized, responses.ErrorResponse{
			Error: ErrInvalidTokenFormat.Error(),
		})
	default:
		c.JSON(http.StatusUnauthorized, responses.ErrorResponse{
			Error: ErrInvalidTokenFormat.Error(),
		})
	}
	c.Abort()
}

// setUserContext はユーザー情報をGinのコンテキストに設定します
func setUserContext(c *gin.Context, claims jwt.MapClaims) {
	c.Set("user_id", claims["sub"])
	c.Set("user_email", claims["email"])
	c.Set("user_role", claims["role"])
}
