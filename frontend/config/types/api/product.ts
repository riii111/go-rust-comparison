import { Stock } from "@/config/types/api/stock";

export type ProductStatus = "active" | "inactive" | "deleted";
export type ProductCategory = "clothing" | "accessories" | "shoes" | "other"; // 仮で設定

// 商品
export interface Product {
  id: string;
  name: string;
  description: string;
  materialInfo: string;
  basePrice: number;
  category: ProductCategory;
  imageUrls: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 商品と在庫を結合した型
export interface ProductWithStock extends Product {
  stocks: Stock[];
}

// 商品作成・更新時のリクエスト型
export interface CreateProductRequest {
  name: string;
  description: string;
  materialInfo: string;
  basePrice: number;
  category: ProductCategory;
  imageUrls: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

// フィルタリング用の型
export interface ProductFilter {
  search?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  storeId?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// APIレスポンス用
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export type ProductResponse = ProductWithStock;

export type ProductsResponse = ProductWithStock[];
