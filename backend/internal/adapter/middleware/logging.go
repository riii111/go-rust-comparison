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
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
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

// createCommonFields 共通ログフィールドを作成
func createCommonFields(c *gin.Context, logID string) string {
	return fmt.Sprintf("%s %s %s %s %s",
		c.ClientIP(),
		logID,
		getUserInfo(c),
		c.Request.Method,
		c.Request.URL.Path)
}

// LoggingMiddleware APIのリクエストとレスポンスをロギングするミドルウェア
func LoggingMiddleware(config *LoggingConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		// GORMのロガーを一時的に無効化
		db, ok := c.Keys["db"].(*gorm.DB)
		if ok {
			db = db.Session(&gorm.Session{
				Logger: logger.Default.LogMode(logger.Silent),
			})
			c.Set("db", db)
		}

		if shouldSkipLogging(c.Request.URL.Path, config.SkipPaths) {
			c.Next()
			return
		}

		startTime := time.Now()
		logID := generateLogID(startTime)
		c.Set("log_id", logID)

		commonFields := createCommonFields(c, logID)

		// リクエスト開始ログ
		fmt.Printf("%s [INFO] %s API開始\n",
			time.Now().Format("2006-01-02 15:04:05"),
			commonFields)

		blw := &bodyLogWriter{
			ResponseWriter: c.Writer,
			body:           bytes.NewBufferString(""),
		}
		c.Writer = blw

		c.Next()

		// レスポンス情報の収集
		statusCode := c.Writer.Status()
		responseDetail := parseResponseBody(blw.body.Bytes())
		if responseDetail == "" {
			responseDetail = getDefaultResponseMessage(statusCode)
		}

		// ログメッセージの作成
		logLevel := getLogLevel(statusCode)
		message := fmt.Sprintf("%s [%s] %s %d API終了_%s\n",
			time.Now().Format("2006-01-02 15:04:05"),
			logLevel,
			commonFields,
			statusCode,
			responseDetail)

		fmt.Print(message)
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

// getLogLevel ステータスコードに応じたログレベルを取得
func getLogLevel(statusCode int) string {
	switch {
	case statusCode >= 500:
		return "ERROR"
	case statusCode >= 400:
		return "WARNING"
	default:
		return "INFO"
	}
}

// getDefaultResponseMessage ステータスコードに応じたデフォルトメッセージを取得
func getDefaultResponseMessage(statusCode int) string {
	switch statusCode {
	case http.StatusOK:
		return "正常に処理が完了しました"
	case http.StatusCreated:
		return "リソースの作成が完了しました"
	case http.StatusBadRequest:
		return "リクエストの形式が正しくありません"
	case http.StatusUnauthorized:
		return "認証に失敗しました"
	case http.StatusForbidden:
		return "このアクションを実行する権限がありません"
	case http.StatusNotFound:
		return "リソースが見つかりません"
	case http.StatusInternalServerError:
		return "サーバー内部でエラーが発生しました"
	default:
		return "処理が完了しました"
	}
}
