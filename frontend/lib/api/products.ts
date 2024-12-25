import {
  ProductsApiResponse,
  ProductFilter,
  ProductWithStock,
  ProductWithStockResponse,
} from "@/config/types/api/product";
import { DUMMY_PRODUCTS } from "@/__mocks__/dashboard/products/dummy_data";
import { ITEMS_PER_PAGE } from "@/config/constants/product";

// const ENDPOINT = "/products";

/**
 * 商品一覧を取得する
 */
export async function getProducts(
  filters?: ProductFilter
): Promise<ProductsApiResponse> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  await new Promise((resolve) => setTimeout(resolve, 600)); // ローディング確認用

  let filteredProducts: ProductWithStock[] = DUMMY_PRODUCTS;

  // 検索フィルタリング
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  // ページネーション
  const page = filters?.page || 1;
  const limit = filters?.limit || ITEMS_PER_PAGE;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    products: filteredProducts.slice(start, end),
    total: filteredProducts.length,
    page: page,
    limit: limit,
  };
}

/**
 * 指定した商品と在庫の情報を取得する
 */
export async function getProductWithStockById(
  id: string
): Promise<ProductWithStock | undefined> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく

  if (id === "5") return undefined;
  await new Promise((resolve) => setTimeout(resolve, 600)); // ローディング確認用

  return DUMMY_PRODUCTS.find(
    (product) => product.id === id
  ) as ProductWithStockResponse;
  //   const { data } = await customFetch<undefined, ProductWithStockResponse>(
  //     `${ENDPOINT}/${id}/`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   return data;
}

/**
 * 指定した商品を削除する
 */
export async function deleteProduct(id: string): Promise<boolean> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  console.log("deleteProduct", id);
  return true;
  //   const { data } = await customFetch<undefined, void>(
  //     `${ENDPOINT}/${id}/`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
}
