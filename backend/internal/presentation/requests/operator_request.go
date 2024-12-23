package requests

type CreateOperatorRequest struct {
	Email     string `json:"email" validate:"required,email"`
	Username  string `json:"username" validate:"required"`
	Password  string `json:"password" validate:"required,password"`
	Role      string `json:"role" validate:"required,oneof=system_admin store_admin"`
	StoreID   string `json:"store_id" validate:"required,uuid"`
	AvatarURL string `json:"avatar_url,omitempty" validate:"omitempty,url"`
	CreatedBy string `json:"created_by" validate:"required,uuid"`
}
