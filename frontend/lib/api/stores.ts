// import { customFetch } from "@/lib/api/core";
import { StoresApiResponse, StoreFilter } from "@/config/types/api/store";

// TODO: APIが実装されるまで、ダミーデータで返しておく
import { DUMMY_STORES } from "@/__mocks__/dashboard/stores/dummy_data";
import { ITEMS_PER_PAGE } from "@/config/constants/store";

// const ENDPOINT = "/stores";

/**
 * 店舗一覧を取得する
 */
export async function getStores(
  filters?: StoreFilter
): Promise<StoresApiResponse> {
  // TODO: APIが実装されるまで、ダミーデータで返しておく
  await new Promise((resolve) => setTimeout(resolve, 600)); // ローディング確認用

  // 検索フィルタリング
  let filteredStores = [...DUMMY_STORES];
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredStores = filteredStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchLower) ||
        store.address.toLowerCase().includes(searchLower)
    );
  }

  // ページネーション
  const page = filters?.page || 1;
  const limit = filters?.limit || ITEMS_PER_PAGE;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    stores: filteredStores.slice(start, end),
    total: filteredStores.length,
    page: page,
    limit: limit,
  };
  // const { data } = await customFetch<StoreFilter, StoresApiResponse>(ENDPOINT, {
  //     method: "GET",
  //     params: filters,
  // });
  // return data;
}

/**
 * 店舗を作成する
 */
// export async function createStore(
//   store: CreateStoreRequest
// ): Promise<StoreResponse> {
// const { data } = await customFetch<CreateStoreRequest, StoreResponse>(
//   ENDPOINT,
//   {
//     method: "POST",
//     data: store,
//   }
// );
// return data;
// }

/**
 * 店舗を更新する
 */
// export async function updateStore(
//   store: UpdateStoreRequest
// ): Promise<StoreResponse> {
// const { data } = await customFetch<UpdateStoreRequest, StoreResponse>(
//   `${ENDPOINT}/${store.id}`,
//   {
//     method: "PUT",
//     data: store,
//   }
// );
// return data;
// }

/**
 * 店舗を削除する
 */
// export async function deleteStore(id: string): Promise<void> {
// await customFetch(`${ENDPOINT}/${id}`, {
//   method: "DELETE",
// });
// }
