import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";

// TODO: APIが実装されたら消します

// 統計情報の型定義
interface StatsConfig {
  value: string;
  subtitle?: string;
  trend?: string;
  dark?: boolean;
  highlight?: boolean;
  link?: boolean;
}

// 統計情報の設定
export const STATS_CONFIG: Record<string, StatsConfig> = {
  "Top sales": {
    value: "72",
    subtitle: "Rolf Inc.",
    link: true,
  },
  "Best deal": {
    value: "¥42,300",
    subtitle: "Rolf Inc.",
    dark: true,
  },
  Deals: {
    value: "256",
    trend: "↑ 5",
  },
  Value: {
    value: "528k",
    trend: "↑ 7.9%",
    highlight: true,
  },
  "Win rate": {
    value: "44%",
    trend: "↑ 1.2%",
  },
};

interface PlatformData {
  name: string;
  revenue: number;
  percentage: number;
  icon: React.ReactNode;
  growth: number;
  color?: string;
}

export const PLATFORM_DATA: PlatformData[] = [
  {
    name: "X (Twitter)",
    revenue: 227459,
    percentage: 43,
    icon: <Twitter className="w-6 h-6" />,
    growth: 4.3,
    color: "bg-black",
  },
  {
    name: "Instagram",
    revenue: 142823,
    percentage: 27,
    icon: <Instagram className="w-6 h-6" />,
    growth: 2.7,
    color: "bg-[#E4405F]",
  },
  {
    name: "Youtube",
    revenue: 89935,
    percentage: 18,
    icon: <Youtube className="w-6 h-6" />,
    growth: 3.2,
    color: "bg-[#FF0000]",
  },
  {
    name: "Facebook",
    revenue: 67028,
    percentage: 12,
    icon: <Facebook className="w-6 h-6" />,
    growth: 1.5,
    color: "bg-[#1877F2]",
  },
];

interface SalesRankData {
  name: string;
  avatar: string;
  revenue: number;
  sales: number;
  leads: number;
  kpi: number;
  winRate: {
    wins: number;
    total: number;
  };
}

export const SALES_RANK_DATA: SalesRankData[] = [
  {
    name: "Armin A.",
    avatar: "https://github.com/shadcn.png",
    revenue: 209633,
    sales: 41,
    leads: 118,
    kpi: 0.84,
    winRate: { wins: 31, total: 12 },
  },
  {
    name: "Mikasa A.",
    avatar: "https://github.com/shadcn.png",
    revenue: 156841,
    sales: 54,
    leads: 103,
    kpi: 0.89,
    winRate: { wins: 39, total: 21 },
  },
  {
    name: "Eren Y.",
    avatar: "https://github.com/shadcn.png",
    revenue: 117115,
    sales: 22,
    leads: 84,
    kpi: 0.79,
    winRate: { wins: 32, total: 7 },
  },
];

// RevenueSection用のデータを追加
export const REVENUE_DATA = {
  revenue: 528976.82,
  previousRevenue: 501641.73,
  increase: 7.9,
  increaseAmount: 27335.09,
  stats: [
    {
      avatar: "https://github.com/shadcn.png",
      name: "Product A",
      amount: 245000,
      percentage: 45
    },
    {
      avatar: "https://github.com/shadcn.png",
      name: "Product B",
      amount: 184000,
      percentage: 35
    },
    {
      avatar: "https://github.com/shadcn.png",
      name: "Product C",
      amount: 99976,
      percentage: 20
    }
  ]
}

// メインのデータオブジェクトを更新
export const DASHBOARD_DATA = {
  stats: STATS_CONFIG,
  platforms: PLATFORM_DATA,
  salesRank: SALES_RANK_DATA,
  revenue: REVENUE_DATA
}
