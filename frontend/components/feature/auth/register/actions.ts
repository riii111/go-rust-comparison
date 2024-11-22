"use server";

import { customFetch } from "@/lib/core";
import { AuthTokenCreatedResponse } from "@/config/types/user";
import { proxyServerCookies } from "@/lib/cookiesForServer";
import { redirect } from "next/navigation";
import { registerSchema } from "@/config/validations/register";
import { z } from "zod";

const ENDPOINT = "/auth";

export type RegisterActionResult = {
  success: boolean;
  error?: string;
};

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  storeId: string;
  role: string;
}

/**
 * ユーザー登録関数
 */
export async function registerAction(
  username: string,
  email: string,
  password: string,
  storeId: string,
  role: string
): Promise<RegisterActionResult> {
  let redirectFlag = false;
  try {
    // サーバーサイドでも入力値の検証を行う
    registerSchema.parse({
      lastName: username.split(" ")[0],
      firstName: username.split(" ")[1] || "",
      email,
      password,
      confirmPassword: password, // サーバーサイドでは既に確認済みの値
      storeId,
      role,
      agreedToTerms: true, // クライアントで確認済み
    });

    const { headers } = await customFetch<
      RegisterRequest,
      AuthTokenCreatedResponse
    >(`${ENDPOINT}/register/`, {
      method: "POST",
      body: { username, email, password, storeId, role },
    });

    // レスポンスヘッダーからCookieを設定
    await proxyServerCookies(headers);

    redirectFlag = true;
  } catch (error: unknown) {
    console.error("アカウント登録に失敗しました", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "入力内容が正しくありません。" };
    } else {
      return {
        success: false,
        error: error.message || "アカウント登録に失敗しました",
      };
    }
  }

  if (redirectFlag) {
    redirect("/dashboard");
  }
  return { success: true };
}
