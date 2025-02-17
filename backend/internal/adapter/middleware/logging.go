package middleware

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
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

// スキップするパスを定数として定義
var skipPaths = []string{
	".js",
	"/api/docs/",
	"/api/schema/",
}

// センシティブなヘッダーのリストを定数として定義
var sensitiveHeaders = []string{
	"Authorization",
	"Cookie",
	"X-API-Key",
	"X-Session-Token",
}

// isSensitiveHeader ヘッダーが機密情報かどうかを判定
func isSensitiveHeader(header string) bool {
	header = strings.ToLower(header)
	for _, sensitive := range sensitiveHeaders {
		if strings.ToLower(sensitive) == header {
			return true
		}
	}
	return false
}

// LoggingConfig ロギング設定を構造体として定義
type LoggingConfig struct {
	SkipPaths []string
	Logger    *zap.Logger
}

// NewLoggingConfig デフォルト設定で新しいLoggingConfigを作成
func NewLoggingConfig(logger *zap.Logger) *LoggingConfig {
	return &LoggingConfig{
		SkipPaths: skipPaths,
		Logger:    logger,
	}
}

// LoggingMiddleware APIのリクエストとレスポンスをロギングするミドルウェア
func LoggingMiddleware(config *LoggingConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		if shouldSkipLogging(c.Request.URL.Path, config.SkipPaths) {
			c.Next()
			return
		}

		startTime := time.Now()
		logID := generateLogID(startTime)
		c.Set("log_id", logID)

		commonFields := createCommonFields(c, logID)

		// リクエスト開始ログ
		config.Logger.Info("API開始", commonFields...)

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

		// エラーハンドリングの追加
		if len(c.Errors) > 0 {
			resultFields = append(resultFields, zap.Strings("errors", c.Errors.Errors()))
		}

		// ログメッセージの作成
		message := fmt.Sprintf("API終了_%s", responseDetail)

		// ログメッセージの作成
		message = fmt.Sprintf("API終了_%s", responseDetail)

		// ステータスコードに応じて適切なログレベルを選択
		logResponse(config.Logger, statusCode, message, resultFields)
	}
}

// createCommonFields 共通ログフィールドを作成
func createCommonFields(c *gin.Context, logID string) []zap.Field {
	return []zap.Field{
		zap.String("log_id", logID),
		zap.String("ip", c.ClientIP()),
		zap.String("user_info", getUserInfo(c)),
		zap.String("method", c.Request.Method),
		zap.String("path", c.Request.URL.Path),
		zap.Any("headers", sanitizeHeaders(c.Request.Header)),
	}
}

// shouldSkipLogging パスのスキップ判定
func shouldSkipLogging(path string, skipPaths []string) bool {
	for _, skipPath := range skipPaths {
		if strings.HasSuffix(path, skipPath) {
			return true
		}
	}
	return false
}

// sanitizeHeaders ヘッダーの機密情報をマスク
func sanitizeHeaders(headers http.Header) map[string]string {
	sanitized := make(map[string]string)
	for k, v := range headers {
		// 機密情報をマスク
		if isSensitiveHeader(k) {
			sanitized[k] = "[REDACTED]"
		} else {
			sanitized[k] = strings.Join(v, ",")
		}
	}
	return sanitized
}

// logResponse ステータスコードに応じたログ出力
func logResponse(logger *zap.Logger, statusCode int, message string, fields []zap.Field) {
	switch {
	case statusCode >= 500:
		logger.Error(message, fields...)
	case statusCode >= 400:
		logger.Warn(message, fields...)
	default:
		logger.Info(message, fields...)
	}
}

// getUserInfo ユーザー情報を取得する
func getUserInfo(c *gin.Context) string {
	userInfo := "未ログイン"
	if user, exists := c.Get("user"); exists {
		if u, ok := user.(interface {
			GetIdentifier() string
		}); ok {
			userInfo = u.GetIdentifier()
		}
	}
	return userInfo
}
