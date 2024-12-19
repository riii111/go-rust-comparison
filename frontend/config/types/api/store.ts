export type StoreStatus = "active" | "inactive" | "deleted";

// 基本の店舗情報
export interface Store {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  businessHours: BusinessHours;
  isActive: boolean;
  description?: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 営業時間の型定義
export interface BusinessHours {
  start: string; // HH:mm形式
  end: string; // HH:mm形式
  regularHoliday?: string[]; // 定休日（曜日）
}

// 店舗作成・更新時のリクエスト型
export interface CreateStoreRequest {
  name: string;
  address: string;
  phoneNumber: string;
  businessHours: BusinessHours;
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

// フォーム用の型
export interface StoreFormData extends Omit<Store, "id"> {
  id?: string;
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
