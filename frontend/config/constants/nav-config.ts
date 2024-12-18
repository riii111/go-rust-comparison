export const navItems = [
  {
    title: "商品一覧",
    href: "/management/dashboard/products",
    iconName: "Package2",
  },
  {
    title: "在庫管理",
    href: "/management/dashboard/inventory",
    iconName: "BarChart3",
  },
  {
    title: "店舗一覧",
    href: "/management/dashboard/stores",
    iconName: "Store",
  },
  {
    title: "ユーザー一覧",
    href: "/management/dashboard/users",
    iconName: "Users",
  },
] as const;

export const settingsItem = {
  title: "システム設定",
  href: "/management/dashboard/settings",
  iconName: "Settings",
} as const;

export type NavItem = {
  title: string;
  href: string;
  iconName: string;
};
