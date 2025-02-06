package consts

import "time"

// クッキー設定の定数
const (
	AccessTokenDuration  = 24 * time.Hour
	RefreshTokenDuration = 30 * 24 * time.Hour
	CookiePath           = "/"  // クッキーが有効なパス
	CookieSecure         = true // true: HTTPSのみ
	CookieHttpOnly       = true // true: JavaScriptからアクセス不可
)
