// import { customFetch } from "@/lib/api/core";
import {
  ProductsResponse,
  ProductWithStockResponse,
  ProductWithStock,
} from "@/config/types/api/product";
// TODO: APIが実装されるまで、ダミーデータで返しておく
import { DUMMY_PRODUCTS } from "@/__mocks__/dashboard/products/dummy_data";

// const ENDPOINT = "/products";

/**
 * 商品一覧を取得する
 */
export async function getProducts(): Promise<ProductsResponse> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  await new Promise((resolve) => setTimeout(resolve, 600)); // ローディング確認用
  return DUMMY_PRODUCTS;
  //   const { data } = await customFetch<undefined, ProductsResponse>(ENDPOINT, {
  //     method: "GET",
  //   });
  //   return data;
}

/**
 * 指定した商品と在庫の情報を取得する
 */
export async function getProductWithStockById(
  id: string
): Promise<ProductWithStock | undefined> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく

  if (id === "5") return undefined;
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
export async function deleteProduct(_: string): Promise<boolean> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  return true;
  //   const { data } = await customFetch<undefined, void>(
  //     `${ENDPOINT}/${id}/`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
}
