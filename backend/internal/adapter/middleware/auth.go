package middleware

import (
	"net/http"
	"os"

	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/riii111/go-rust-comparison/internal/presentation/responses"
)

var (
	ErrAuthentication = errors.New("認証が必要です")
)

var jwtSecretKey = []byte(os.Getenv("JWT_SECRET_KEY"))

// 認証が必要なエンドポイントに使用するミドルウェア
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("access_token")
		if err != nil {
			handleError(c, err)
			return
		}

		claims, err := validateToken(tokenString)
		if err != nil {
			handleError(c, err)
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
		return jwtSecretKey, nil
	})

	if err != nil {
		log.Printf("トークンの解析エラー: %v", err)
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		log.Println("トークンが無効であるかクレームの取得に失敗しました")
		return nil, ErrAuthentication
	}

	return claims, nil
}

// handleError は共通のエラーハンドリングロジックを提供
func handleError(c *gin.Context, err error) {
	// エラーの種類に応じたロギング
	if errors.Is(err, jwt.ErrSignatureInvalid) {
		log.Printf("署名エラーが発生しました: %v", err)
	} else {
		log.Printf("認証エラーが発生しました: %v", err)
	}

	c.JSON(http.StatusUnauthorized, responses.ErrorResponse{
		Error: ErrAuthentication.Error(),
	})
	c.Abort()
}

// setUserContext はユーザー情報をGinのコンテキストに設定します
func setUserContext(c *gin.Context, claims jwt.MapClaims) {
	c.Set("user_id", claims["sub"])
	c.Set("user_email", claims["email"])
	c.Set("user_role", claims["role"])
}
