// import { customFetch } from "@/lib/api/core";
import { ProductsResponse, ProductResponse } from "@/config/types/api/product";

// const ENDPOINT = "/products";

// TODO: APIが実装されるまで、ダミーデータで返しておく
// 開発用のダミーデータ
const DUMMY_PRODUCTS = [
  {
    id: "1",
    name: "ベーシックTシャツ",
    category: "clothing",
    basePrice: 2500,
    imageUrl: "",
    description: "シンプルで着やすい定番Tシャツ",
    stockStatus: "在庫あり",
  },
  {
    id: "2",
    name: "デニムパンツ",
    category: "clothing",
    basePrice: 5900,
    imageUrl: "",
    description: "クラシックなストレートデニム",
    stockStatus: "残りわずか",
  },
  {
    id: "3",
    name: "レザーベルト",
    category: "accessories",
    basePrice: 3900,
    imageUrl: "",
    description: "上質な本革を使用したカジュアルベルト",
    stockStatus: "在庫あり",
  },
  {
    id: "4",
    name: "ランニングシューズ",
    category: "shoes",
    basePrice: 8900,
    imageUrl: "",
    description: "クッション性に優れた軽量ランニングシューズ",
    stockStatus: "残りわずか",
  },
  {
    id: "5",
    name: "404エラーテスト用商品",
    category: "other",
    basePrice: 999,
    imageUrl: "",
    description: "このデータをクリックすると404エラーが表示されます",
    stockStatus: "在庫なし",
  },
];

/**
 * 商品一覧を取得する
 */
export async function getProducts(): Promise<ProductsResponse> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  return DUMMY_PRODUCTS;
  //   const { data } = await customFetch<undefined, ProductsResponse>(ENDPOINT, {
  //     method: "GET",
  //   });
  //   return data;
}

/**
 * 指定した商品を取得する
 */
export async function getProductById(id: string): Promise<ProductResponse> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  return DUMMY_PRODUCTS.find((product) => product.id === id);
  //   const { data } = await customFetch<undefined, ProductResponse>(
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
