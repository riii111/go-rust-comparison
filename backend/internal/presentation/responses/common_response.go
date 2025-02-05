// 共通で使用するレスポンスはここで定義
package responses

// 標準的な成功レスポンス
type StandardResponse struct {
	Message string `json:"message"`
}

// エラー時のレスポンス
type ErrorResponse struct {
	Error   string `json:"error"`
	Details string `json:"details,omitempty"`
}
