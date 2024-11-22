import Cookies from "js-cookie";

export const COOKIE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export function getClientSideCookie(key: string): string | undefined {
  const value = Cookies.get(key);
  return value;
}

export function setClientSideCookie(
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
): void {
  Cookies.set(key, value, options);
}

export function removeClientSideCookie(key: string): void {
  Cookies.remove(key);
}

export function getClientSideAuthHeader(): Record<string, string> {
  const accessToken = getClientSideCookie(COOKIE_KEYS.ACCESS_TOKEN);
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}
