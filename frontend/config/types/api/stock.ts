// 商品の在庫
export interface Stock {
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

// 商品作成時のリクエスト型
export interface CreateStockRequest {
  size: string;
  color: string;
  quantity: number;
  price: number;
  isAvailable: boolean;
}

// 商品更新時のリクエスト型
export interface UpdateStockRequest extends Partial<CreateStockRequest> {
  id: string;
}

// APIレスポンス用
export interface StockApiResponse {
  stocks: Stock[];
  total: number;
  page: number;
  limit: number;
}

export type StockResponse = Stock;

export type StockResponses = Stock[];
