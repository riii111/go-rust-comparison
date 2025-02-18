package middleware

import (
	"net/http"
	"os"
	"strings"

	"errors"
	"log"
	"time"

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
		// Authorizationヘッダーを取得
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			handleError(c, ErrAuthentication)
			return
		}

		// Bearer スキームの確認
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			handleError(c, ErrAuthentication)
			return
		}

		tokenString := parts[1]
		claims, err := validateToken(tokenString)
		if err != nil {
			// トークン検証エラー時の処理
			handleError(c, err)
			return
		}

		// ユーザー情報をコンテキストに設定
		setUserContext(c, claims)
		// 次のハンドラーに処理を渡す
		c.Next()
	}
}

// validateToken はJWTトークンを検証し、クレームを返却
func validateToken(tokenString string) (jwt.MapClaims, error) {
	// トークンを解析し、署名方法を確認
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// 署名方法がHMACであることを確認
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return jwtSecretKey, nil
	})

	if err != nil {
		// トークン解析エラーのログ出力
		log.Printf("トークンの解析エラー: %v", err)
		return nil, err
	}

	// クレームを取得し、トークンの有効性を確認
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		// トークンが無効またはクレーム取得失敗時のログ出力
		log.Println("トークンが無効であるかクレームの取得に失敗しました")
		return nil, ErrAuthentication
	}

	return claims, nil
}

// 共通のエラーハンドリングロジックを提供
func handleError(c *gin.Context, err error) {
	// エラーの種類に応じたロギング
	if errors.Is(err, jwt.ErrSignatureInvalid) {
		log.Printf("署名エラーが発生しました: %v", err)
	} else {
		log.Printf("認証エラーが発生しました: %v", err)
	}

	// エラーレスポンスを返し、リクエストを中止
	c.JSON(http.StatusUnauthorized, responses.ErrorResponse{
		Error: ErrAuthentication.Error(),
	})
	c.Abort()
}

// ユーザー情報をGinのコンテキストに設定
func setUserContext(c *gin.Context, claims jwt.MapClaims) {
	c.Set("user_id", claims["sub"])
	c.Set("user_role", claims["role"])

	// ログアウトエンドポイントの場合はログ出力をスキップ
	if c.Request.URL.Path == "/api/logout" {
		return
	}
	// TODO:現状だと、ログアウト時に誰がログアウトしたのかわからない
	// この関数を通ると、ログアウトした後でも、ユーザーID と ロールが表示される
	// そのための、上記if文を追記しているが、いい解決策ではない
	// LoggingMiddleware と AuthMiddleware の通る順番を意識してロギング構築する必要がある
	// 後他のエラー時のログもフォーマットを統一する必要がある
	// 共通のログフォーマットを使用するように全体を修正したい
	logID := c.GetString("log_id")
	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")
	log.Printf("%s [INFO] IP: %s Log ID: %s 認証情報 - ユーザーID: %v, ロール: %v",
		time.Now().Format("2006-01-02 15:04:05"),
		c.ClientIP(),
		logID,
		userID,
		userRole)
}
