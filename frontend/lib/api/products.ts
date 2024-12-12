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
    imageUrls: [
      "https://picsum.photos/seed/fashion1/400/400", // ファッション系の画像
      "https://picsum.photos/seed/fashion2/400/400",
      "https://picsum.photos/seed/fashion3/400/400",
      "https://picsum.photos/seed/fashion4/400/400",
      "https://picsum.photos/seed/fashion5/400/400",
    ],
    description: "シンプルで着やすい定番Tシャツ",
    stockStatus: "在庫あり",
  },
  {
    id: "2",
    name: "Tシャツ",
    category: "clothing",
    basePrice: 5900,
    imageUrls: [
      "https://picsum.photos/seed/casual1/400/400", // カジュアル系の画像
      "https://picsum.photos/seed/casual2/400/400",
      "https://picsum.photos/seed/casual3/400/400",
    ],
    description: "クラシックなストレートデニム",
    stockStatus: "残りわずか",
  },
  {
    id: "3",
    name: "キャップ",
    category: "accessories",
    basePrice: 3900,
    imageUrls: [
      "https://picsum.photos/seed/outdoor1/400/400", // アウトドア系の画像
      "https://picsum.photos/seed/outdoor2/400/400", // 異なるシーン
      "https://picsum.photos/seed/outdoor3/400/400", // 異なる角度
    ],
    description: "誰でも着れるキャップ",
    stockStatus: "在庫あり",
  },
  {
    id: "4",
    name: "マグカップ",
    category: "accessories",
    basePrice: 8900,
    imageUrls: [
      "https://picsum.photos/seed/lifestyle1/400/400", // ライフスタイル系の画像
      "https://picsum.photos/seed/lifestyle2/400/400",
    ],
    description: "サイズが大きいマグカップ",
    stockStatus: "残りわずか",
  },
  {
    id: "5",
    name: "404エラーテスト用商品",
    category: "other",
    basePrice: 999,
    imageUrls: ["https://picsum.photos/400/400"],
    description: "このデータをクリックすると404エラーが表示されます",
    stockStatus: "在庫なし",
  },
];

/**
 * 商品一覧を取得する
 */
export async function getProducts(): Promise<ProductsResponse> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  await new Promise((resolve) => setTimeout(resolve, 800)); // ローディング確認用
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

  if (id === "5") return undefined;
  return DUMMY_PRODUCTS.find((product) => product.id === id) as ProductResponse;
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
