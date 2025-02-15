package responses

// 画像ファイルアップロード時のレスポンス
type DataResponse struct {
	StandardResponse
	Data interface{} `json:"data,omitempty"`
}
