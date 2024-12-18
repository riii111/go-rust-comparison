import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"]; // 保護対象のルートをここに追加
const publicRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // APIルートは全て許可
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // TODO 一時的に許可する（API実装されたら削除！！）
  if (pathname.startsWith("/management")) {
    return NextResponse.next();
  }

  // 公開ルートは常に許可
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 保護対象のルートにアクセスする場合
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const accessToken = request.cookies.get("access_token");

    // アクセストークンが存在しない、または無効（期限切れを含む）の場合
    if (!accessToken || !accessToken.value) {
      try {
        // リフレッシュトークンを使用してアクセストークンを更新
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/`,
          {
            method: "POST",
            headers: {
              Cookie: request.headers.get("cookie") || "",
            },
          }
        );

        if (response.ok) {
          return NextResponse.next();
        } else {
          // リフレッシュに失敗した場合、ログイン画面にリダイレクト
          return NextResponse.redirect(new URL("/auth", request.url));
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        // エラーの場合、ログイン画面にリダイレクト
        return NextResponse.redirect(new URL("/auth", request.url));
      }
    }
  }

  return NextResponse.next();
}

// ミドルウェアを適用するルートを指定
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
