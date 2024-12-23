package requests

type CreateStoreRequest struct {
	Name          string `json:"name" validate:"required"`
	Address       string `json:"address" validate:"required"`
	PhoneNumber   string `json:"phone_number" validate:"required,numeric,len=11"`
	BusinessHours string `json:"business_hours" validate:"required"`
	ZipCode       string `json:"zip_code" validate:"required"`
	Description   string `json:"description" validate:"required"`
	IsActive      bool   `json:"is_active"`
	CreatedBy     string `json:"created_by" validate:"required,uuid"`
}
