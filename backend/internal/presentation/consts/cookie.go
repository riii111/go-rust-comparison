package consts

import (
	"net/http"
	"os"
	"time"
)

// Token関連の定数
const (
	AccessTokenDuration  = 1 * time.Hour       // 1時間
	RefreshTokenDuration = 24 * 30 * time.Hour // 30日
)

// Cookie関連の定数
const (
	CookiePath = "/" // クッキーが有効なパス

	AccessTokenCookieName  = "access_token"  // アクセストークンのクッキー名
	RefreshTokenCookieName = "refresh_token" // リフレッシュトークンのクッキー名
)

// CookieConfig クッキーの共通設定を保持する構造体
type CookieConfig struct {
	Domain   string        // クッキーのドメイン
	Secure   bool          // セキュアクッキーフラグ
	HttpOnly bool          // HttpOnlyフラグ
	SameSite http.SameSite // SameSite属性
}

// NewCookieConfig 環境変数から設定を読み込んでCookieConfigを生成
func NewCookieConfig() CookieConfig {

	return CookieConfig{
		Domain:   os.Getenv("DOMAIN"),
		Secure:   os.Getenv("COOKIE_SECURE") == "true",
		HttpOnly: os.Getenv("COOKIE_HTTP_ONLY") == "true",
		SameSite: parseSameSite(os.Getenv("COOKIE_SAME_SITE")),
	}
}

// parseSameSite 環境変数の値からSameSite属性を解析する
func parseSameSite(value string) http.SameSite {
	switch value {
	case "Strict":
		return http.SameSiteStrictMode
	default:
		return http.SameSiteLaxMode // デフォルト値
	}
}
