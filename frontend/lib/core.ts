import { toast } from "@/hooks/ui/use-toast";
import { getClientSideAuthHeader } from "@/lib/utils/cookies";
import { redirect } from "next/navigation";

// APIのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// HTTPメソッド
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type CustomFetchResponse<T> = {
  data: T;
  headers: Headers;
  ok: boolean;
  status: number;
};

// フェッチオプションのインターフェース定義
interface IFetchOptions<T extends Record<string, any>> {
  headers?: Record<string, any>;
  method: HttpMethod;
  credentials?: RequestCredentials;
  params?: T;
  body?: T | FormData;
  cache?: RequestCache;
  next?: Record<string, unknown>;
}

// APIエラーを表すカスタムエラークラス
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// サーバーサイドかクライアントサイドか
const isServerSide = typeof window === "undefined";

// リクエスト設定の共通化
const createRequestConfig = (
  options: Partial<IFetchOptions<any>>,
  headers: Headers
): RequestInit => ({
  method: options.method,
  headers,
  mode: "cors",
  credentials: options.credentials,
  cache: options.cache ?? "no-cache",
  next: options.next,
});

// カスタムフェッチ関数
export async function customFetch<
  RequestInput extends Record<string, any> | undefined = Record<string, any>,
  RequestResult = unknown
>(
  endpoint: string,
  options: IFetchOptions<
    RequestInput extends Record<string, any>
      ? RequestInput
      : Record<string, never>
  >
): Promise<CustomFetchResponse<RequestResult>> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  // 末尾にスラッシュ追加する事でプロキシ・バックエンドなどのサーバー側のリダイレクトを回避し、パフォーマンスを僅かに向上させる
  let url = `${API_BASE_URL}${endpoint}${endpoint.endsWith("/") ? "" : "/"}`;

  async function getAuthHeader(): Promise<Record<string, string>> {
    if (isServerSide) {
      const { getServerSideAuthHeader } = await import(
        "@/lib/utils/cookiesForServer"
      );
      return getServerSideAuthHeader();
    } else {
      return getClientSideAuthHeader();
    }
  }

  let authHeader = await getAuthHeader();
  let headers = new Headers({
    ...options.headers,
    ...authHeader,
  });

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let fetchOptions = createRequestConfig(options, headers);

  if (options.body) {
    fetchOptions.body =
      options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body);
  }

  if (options.params && options.method === "GET") {
    const searchParams = new URLSearchParams(
      options.params as Record<string, string>
    );
    url += `?${searchParams.toString()}`;
  }

  async function performFetch(): Promise<Response> {
    const response = await fetch(url, fetchOptions);
    if (response.status === 401) {
      // リフレッシュトークンを使用してアクセストークンを更新
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // 新しいアクセストークンでリトライ（循環参照防止のためにcustomFetchを使用しない）
        authHeader = await getAuthHeader();
        headers = new Headers({
          ...options.headers,
          ...authHeader,
        });
        // TODO: 新しいアクセストークンを反映してリクエストできないので別途調査
        fetchOptions = createRequestConfig(options, headers);
        const retryResponse = await fetch(url, fetchOptions);
        if (retryResponse.status === 401) {
          // 再試行しても401の場合、認証エラーを投げる
          throw new ApiError(
            401,
            "認証に失敗しました。再度ログインしてください。"
          );
        }
        return retryResponse;
      } else {
        // リフレッシュトークンの更新に失敗した場合、認証エラーを投げる
        throw new ApiError(
          401,
          "認証に失敗しました。再度ログインしてください。"
        );
      }
    }
    return response;
  }

  try {
    const response = await performFetch();

    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      throw new ApiError(response.status, errorMessage);
    }

    const data = await handleResponse(response);
    return {
      data,
      headers: response.headers,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    handleFetchError(error);
    throw error;
  }
}

// アクセストークンの更新とリトライ
async function refreshAccessToken(): Promise<boolean> {
  try {
    console.log("Refreshing access token...");

    let fetchOptions: RequestInit = {
      method: "POST",
    };

    if (isServerSide) {
      // サーバーサイド
      const { cookies } = await import("next/headers");
      fetchOptions.headers = {
        Cookie: cookies().toString(),
      };
    } else {
      // クライアントサイド
      fetchOptions.credentials = "include";
    }
    // 循環参照を防ぐため、customFetchは使わない
    const response = await fetch(`${API_BASE_URL}/auth/refresh/`, fetchOptions);
    return response.ok;
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
}

// 認証画面にリダイレクト
function redirectToAuth() {
  if (isServerSide) {
    // サーバーサイド
    redirect("/auth");
  } else {
    // クライアントサイド
    window.location.href = "/auth";
    // TODO: 以下のtoastの動作未確認
    toast({
      variant: "destructive",
      title: "エラー",
      description: "認証に失敗しました。再度ログインしてください。",
    });
  }
}

// レスポンスハンドリング
async function handleResponse(response: Response): Promise<any> {
  if (response.status === 204) {
    return {};
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {};
}

// エラーハンドリング
function handleFetchError(error: unknown) {
  if (error instanceof ApiError) {
    const message = `${error.status}: ${error.message}`;
    if (!isServerSide) {
      // クライアントサイドの場合はtoastを使用
      toast({
        variant: "destructive",
        title: "エラー",
        description: message,
      });
    } else {
      // サーバーサイドの場合はコンソールにエラーを出力
      console.error("API Error:", message);
    }
    // 401エラーの場合は認証画面にリダイレクト
    if (error.status === 401) {
      redirectToAuth();
    }
  } else {
    const message = "予期せぬエラーが発生しました。";
    if (!isServerSide) {
      // クライアントサイドの場合はtoastを使用
      toast({
        variant: "destructive",
        title: "エラー",
        description: message,
      });
    } else {
      // サーバーサイドの場合はコンソールにエラーを出力
      console.error("Unexpected Error:", error);
    }
  }
}

// エラーメッセージを取得
function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "リクエストに問題があります。入力内容を確認してください。";
    case 401:
      return "認証に失敗しました。再度ログインしてください。";
    case 403:
      return "アクセス権限がありません。";
    case 404:
      return "リソースが見つかりません。";
    case 413:
      return "アップロードされたファイルが大きすぎます。より小さいファイルを選択してください。";
    case 422:
      return "入力内容に誤りがあります。確認して再度お試しください。";
    case 500:
      return "サーバーエラーが発生しました。しばらく経ってから再度お試しください。";
    case 502:
      return "アクセスが集中しています。しばらく経ってから再度お試しください。";
    default:
      return "予期せぬエラーが発生しました。";
  }
}
