export interface AccountInfo {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface StoreInfo {
  storeId: string;
  role: string;
  agreedToTerms: boolean;
}

export interface RegisterFormData extends AccountInfo, StoreInfo {}
