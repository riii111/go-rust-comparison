package middleware

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type bodyLogWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (w bodyLogWriter) Write(b []byte) (int, error) {
	w.body.Write(b)
	return w.ResponseWriter.Write(b)
}

// generateLogID ログIDを生成する
func generateLogID(t time.Time) string {
	return fmt.Sprintf("%s%04d",
		t.Format("20060102"),
		rand.Intn(9000)+1000)
}

// parseResponseBody レスポンスボディを解析する
func parseResponseBody(body []byte) string {
	if len(body) == 0 {
		return ""
	}

	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return ""
	}

	if detail, ok := result["detail"].(string); ok {
		return detail
	}
	return ""
}

// LoggingMiddleware APIのリクエストとレスポンスをロギングするミドルウェア
func LoggingMiddleware(logger *zap.Logger) gin.HandlerFunc {
	// スキップするパスを定数として定義
	var skipPaths = []string{
		".js",
		"/api/docs/",
		"/api/schema/",
	}

	return func(c *gin.Context) {
		// スキップパスのチェックを関数化
		if shouldSkipLogging(c.Request.URL.Path, skipPaths) {
			c.Next()
			return
		}

		startTime := time.Now()
		logID := generateLogID(startTime)
		clientIP := c.ClientIP()

		// 共通のログフィールドを定義
		commonFields := []zap.Field{
			zap.String("log_id", logID),
			zap.String("ip", clientIP),
			zap.String("user_info", getUserInfo(c)),
			zap.String("method", c.Request.Method),
			zap.String("path", c.Request.URL.Path),
		}

		// リクエスト開始ログ
		logger.Info("API開始", commonFields...)

		blw := &bodyLogWriter{
			ResponseWriter: c.Writer,
			body:           bytes.NewBufferString(""),
		}
		c.Writer = blw

		c.Next()

		// レスポンス情報の収集
		duration := time.Since(startTime)
		statusCode := c.Writer.Status()
		responseDetail := parseResponseBody(blw.body.Bytes())

		// 実行結果のフィールドを追加
		resultFields := append(commonFields,
			zap.Duration("duration", duration),
			zap.Int("status", statusCode),
		)

		// ログメッセージの作成
		message := fmt.Sprintf("API終了_%s", responseDetail)

		// ステータスコードに応じてログレベルを変更
		if statusCode >= 200 && statusCode < 400 {
			logger.Info(message, resultFields...)
		} else {
			logger.Warn(message, resultFields...)
		}
	}
}

// shouldSkipLogging ロギングをスキップすべきパスかどうかを判定する
func shouldSkipLogging(path string, skipPaths []string) bool {
	for _, skip := range skipPaths {
		if strings.HasSuffix(path, skip) {
			return true
		}
	}
	return false
}

// getUserInfo ユーザー情報を取得する
func getUserInfo(c *gin.Context) string {
	userInfo := "未ログイン"
	if _, exists := c.Get("user"); exists {
		// Note: ここでユーザー情報の型に応じて適切な処理を行う
		// 例: userInfo = fmt.Sprintf("社員番号:%s", user.EmployeeNumber)
	}
	return userInfo
}
