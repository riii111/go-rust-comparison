import { ApiRequestBody } from "@/config/types/api/core";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  store_id: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest extends ApiRequestBody {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
  store_id?: string;
}

export interface AuthResponse {
  token_type: string;
  expires_in: number;
}

export interface AuthTokenCreatedResponse {
  message: string;
}

export interface LoginRequest extends ApiRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequest extends ApiRequestBody {
  username: string;
  email: string;
  password: string;
  store_id: string;
}
