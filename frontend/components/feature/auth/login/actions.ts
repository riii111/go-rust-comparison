"use server";

// import { customFetch } from "@/lib/api/core";
// import { AuthResponse, LoginRequest } from "@/config/types/user";
// import { proxyServerCookies } from "@/lib/utils/cookies/cookiesForServer";
import { redirect } from "next/navigation";
import { loginSchema } from "@/components/feature/auth/validation";
import { z } from "zod";
import { LoginRequest } from "@/config/types/user";

// const ENDPOINT = "/auth";

type LoginActionResult = {
  success: boolean;
  error?: string;
};

/**
 * ユーザーログイン関数
 */
export async function loginAction(
  payload: LoginRequest
): Promise<LoginActionResult> {
  let redirectFlag = false;
  try {
    // セキュリティ対策としてサーバーサイドでもバリデーション
    loginSchema.parse(payload);

    // TODO: API実装されたら置き換え
    return { success: true };

    // const { headers } = await customFetch<LoginRequest, AuthResponse>(
    //   `${ENDPOINT}/login/`,
    //   {
    //     method: "POST",
    //     body: { email, password },
    //   }
    // );

    // // レスポンスヘッダーからCookieを設定
    // await proxyServerCookies(headers);

    redirectFlag = true;
  } catch (error) {
    console.error("ログインに失敗しました: ", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "入力内容が正しくありません。" };
    } else {
      return { success: false, error: "予期せぬエラーが発生しました。" };
    }
  }
  if (redirectFlag) {
    // サーバ側でリダイレクトすれば追加のラウンドトリップは発生せず、早く到達する
    redirect("/dashboard");
  }
  return { success: true };
}
