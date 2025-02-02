package responses

type CreateProductResponse struct {
    Message string `json:"message"`
}

// 共通で使用するエラーレスポンスは別のところに定義した方がいい？
// type ErrorResponse struct {
//     Error   string `json:"error"`
//     Details string `json:"details,omitempty"`
// }