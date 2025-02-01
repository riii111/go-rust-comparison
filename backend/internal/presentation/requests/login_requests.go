package requests

// LoginRequest ログインリクエストの構造体
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}
