"use server";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/lib/cookies";
import setCookieParser from "set-cookie-parser";

export async function getServerSideCookie(
  key: string
): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

export async function getServerSideAuthHeader(): Promise<
  Record<string, string>
> {
  const accessToken = await getServerSideCookie(COOKIE_KEYS.ACCESS_TOKEN);
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

/**
 * サーバーからのレスポンスのCookieをクライアントに反映する
 */
export async function proxyServerCookies(headers: Headers) {
  const setCookie = headers.get("set-cookie");

  if (setCookie !== null) {
    const splitCookieHeaders = setCookieParser.splitCookiesString(setCookie);
    const cookieObjects = setCookieParser.parse(splitCookieHeaders);

    cookieObjects.forEach(async (cookieObject: unknown) => {
      const { name, value, sameSite, ...rest } = cookieObject as {
        name: string;
        value: string;
        sameSite: string;
        [key: string]: unknown;
      };
      (await cookies()).set(name, value, {
        sameSite: sameSite === "strict" ? "strict" : "lax",
        ...rest,
      });
    });
  }
}
