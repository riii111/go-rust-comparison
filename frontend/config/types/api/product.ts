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

// 商品の在庫
export interface ProductStock {
  id: string;
  productId: string;
  storeId: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  isAvailable: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 商品と在庫を結合した型
export interface ProductWithStock extends Product {
  stocks: ProductStock[];
}

// APIレスポンス用
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
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

export type ProductResponse = Product;

export type ProductsResponse = Product[];
