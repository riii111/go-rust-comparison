package requests

type CreateOperatorRequest struct {
	Email     string `json:"email" binding:"required,email"`
	Username  string `json:"username" binding:"required"`
	Password  string `json:"password" binding:"required,min=8"`
	Role      string `json:"role" binding:"required,oneof=system_admin store_admin"`
	StoreID   string `json:"store_id" binding:"required,uuid"`
	AvatarURL string `json:"avatar_url" binding:"omitempty,url"`
}
