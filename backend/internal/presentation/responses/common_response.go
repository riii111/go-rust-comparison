// 共通で使用するレスポンスはここで定義
package responses

// ErrorResponse エラー時のレスポンス
type ErrorResponse struct {
	Error   string `json:"error"`
	Details string `json:"details,omitempty"`
}