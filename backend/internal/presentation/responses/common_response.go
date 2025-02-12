// 共通で使用するレスポンスはここで定義
package responses

// 標準的な成功レスポンス
type StandardResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// エラー時のレスポンス
type ErrorResponse struct {
	Error   string            `json:"error,omitempty"`
	Errors  map[string]string `json:"errors,omitempty"`
	Details string            `json:"details,omitempty"`
}
