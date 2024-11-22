export const ROLE_OPTIONS = [
  { value: "store_owner", label: "店舗オーナー" },
  { value: "store_manager", label: "店舗管理者" },
  { value: "staff", label: "スタッフ" },
] as const;

export type UserRole = (typeof ROLE_OPTIONS)[number]["value"];
