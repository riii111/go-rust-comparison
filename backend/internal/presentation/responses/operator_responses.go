package responses

// CreateOperatorResponse オペレーター作成時のレスポンス
type CreateOperatorResponse struct {
	Message string `json:"message"`
}

// ErrorResponse エラー時のレスポンス
type ErrorResponse struct {
	Error   string `json:"error"`
	Details string `json:"details,omitempty"`
}
