"use server";

// import { customFetch } from "@/lib/core";
// import { AuthTokenCreatedResponse, RegisterRequest } from "@/config/types/user";
// import { proxyServerCookies } from "@/lib/cookiesForServer";
import { redirect } from "next/navigation";
import { registerSchema } from "@/components/feature/auth/validation";
import { z } from "zod";
import { RegisterRequest } from "@/config/types/api/user";

// const ENDPOINT = "/auth";

export type RegisterActionResult = {
  success: boolean;
  error?: string;
  isPending?: boolean;
};

/**
 * ユーザー登録関数
 * @param state - 現在の状態
 * @param payload - 登録データ
 */
export async function registerAction(
  state: RegisterActionResult,
  payload: RegisterRequest
): Promise<RegisterActionResult> {
  let redirectFlag = false;
  try {
    // サーバーサイドでも入力値の検証を行う
    registerSchema.parse({
      lastName: payload.username.split(" ")[0],
      firstName: payload.username.split(" ")[1] || "",
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.password,
      storeId: payload.store_id,
      role: payload.role,
      agreedToTerms: true,
    });

    // TODO: API実装されたら置き換え
    return { success: true };

    // const { headers } = await customFetch<
    //   RegisterRequest,
    //   AuthTokenCreatedResponse
    // >(`${ENDPOINT}/register/`, {
    //   method: "POST",
    //   body: payload,
    // });

    // // レスポンスヘッダーからCookieを設定
    // await proxyServerCookies(headers);

    redirectFlag = true;
  } catch (error: unknown) {
    console.error("アカウント登録に失敗しました", error);
    if (error instanceof z.ZodError) {
      return {
        ...state,
        success: false,
        error: "入力内容が正しくありません。",
      };
    } else if (error instanceof Error) {
      return {
        ...state,
        success: false,
        error: error.message || "アカウント登録に失敗しました",
      };
    }
    return {
      ...state,
      success: false,
      error: "アカウント登録に失敗しました",
    };
  }

  if (redirectFlag) {
    redirect("/dashboard");
  }
  return { ...state, success: true };
}
