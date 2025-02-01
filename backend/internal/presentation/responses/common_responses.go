package responses

// 共通の基本レスポンス構造体
type ApiResponse struct {
	Message string `json:"message"`
}

// エラー時のレスポンス
type ErrorResponse struct {
	Error   string `json:"error"`
	Details string `json:"details,omitempty"`
}
