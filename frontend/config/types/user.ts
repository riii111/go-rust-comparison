import { UserRole } from "@/config/constants/roles";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  role: UserRole;
  store_id: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
  role?: UserRole;
  store_id?: string;
}

export interface AuthResponse {
  token_type: string;
  expires_in: number;
}

export interface AuthTokenCreatedResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  store_id: string;
  role: UserRole;
}
