export type StoreStatus = "active" | "inactive" | "deleted";

// 基本の店舗情報
export interface Store {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  businessHours: string;
  isActive: boolean;
  description?: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 店舗作成・更新時のリクエスト型
export interface CreateStoreRequest {
  name: string;
  address: string;
  phoneNumber: string;
  businessHours: string;
  description?: string;
  imageUrl?: string;
}

export interface UpdateStoreRequest extends Partial<CreateStoreRequest> {
  id: string;
}

// フィルタリング用の型
export interface StoreFilter {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// APIレスポンス用
export interface StoresApiResponse {
  stores: Store[];
  total: number;
  page: number;
  limit: number;
}

export type StoreResponse = Store;
export type StoresResponse = Store[];
