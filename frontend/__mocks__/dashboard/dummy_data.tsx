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
  sales: { amount: number; purchased_at: string }[];
}

// ランダムな売上データを生成する関数
const generateRandomSales = (startDate: Date, endDate: Date, minAmount: number, maxAmount: number) => {
  const sales = [];
  const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const numberOfSales = Math.floor(Math.random() * 20) + 10; // 10-30件のランダムな取引

  for (let i = 0; i < numberOfSales; i++) {
    const randomDayOffset = Math.floor(Math.random() * days);
    const date = new Date(startDate);
    date.setDate(date.getDate() + randomDayOffset);

    const amount = Math.floor(Math.random() * (maxAmount - minAmount)) + minAmount;
    sales.push({
      amount,
      purchased_at: date.toISOString()
    });
  }

  // 日付順にソート
  return sales.sort((a, b) =>
    new Date(a.purchased_at).getTime() - new Date(b.purchased_at).getTime()
  );
};

export const PLATFORM_DATA: PlatformData[] = [
  {
    name: "Twitter",
    revenue: 227459,
    percentage: 43,
    icon: <Twitter className="w-6 h-6" />,
    growth: 4.3,
    color: "bg-[#E4405F]",
    sales: generateRandomSales(
      new Date(2024, 10, 1), // 11月1日
      new Date(), // 現在
      5000,  // 最小金額
      50000  // 最大金額
    )
  },
  {
    name: "Instagram",
    revenue: 142823,
    percentage: 27,
    icon: <Instagram className="w-6 h-6" />,
    growth: 2.7,
    color: "bg-[#E4405F]",
    sales: generateRandomSales(
      new Date(2024, 10, 1),
      new Date(),
      3000,
      30000
    )
  },
  {
    name: "Youtube",
    revenue: 89935,
    percentage: 18,
    icon: <Youtube className="w-6 h-6" />,
    growth: 3.2,
    color: "bg-[#FF0000]",
    sales: [
      { amount: 100000, purchased_at: "2024-11-05T10:00:00Z" },
      { amount: 127459, purchased_at: "2024-12-01T10:00:00Z" },
    ]
  },
  {
    name: "Facebook",
    revenue: 67028,
    percentage: 12,
    icon: <Facebook className="w-6 h-6" />,
    growth: 1.5,
    color: "bg-[#1877F2]",
    sales: [
      { amount: 100000, purchased_at: "2024-11-05T10:00:00Z" },
      { amount: 127459, purchased_at: "2024-12-01T10:00:00Z" },
    ]
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
  purchased_at: string;
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
    purchased_at: "2024-11-30T10:00:00Z",
  },
  {
    name: "Mikasa A.",
    avatar: "https://github.com/shadcn.png",
    revenue: 156841,
    sales: 54,
    leads: 103,
    kpi: 0.89,
    winRate: { wins: 39, total: 21 },
    purchased_at: "2024-11-30T10:00:00Z",
  },
  {
    name: "Eren Y.",
    avatar: "https://github.com/shadcn.png",
    revenue: 117115,
    sales: 22,
    leads: 84,
    kpi: 0.79,
    winRate: { wins: 32, total: 7 },
    purchased_at: "2024-11-30T10:00:00Z",
  },
];

// RevenueSection用のデータ
export const REVENUE_DATA = {
  revenue: 528976.82,
  previousRevenue: 501641.73,
  increase: 7.9,
  increaseAmount: 27335.09,
  stats: [
    {
      avatar: "/images/dashboard/t-shirt-1.avif",
      name: "T-shirt",
      amount: 245000,
      percentage: 45,
      purchased_at: "2024-11-01T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/baby-cap-black.avif",
      name: "Baby Cap Black",
      amount: 184000,
      percentage: 35,
      purchased_at: "2024-11-10T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/mug-1.avif",
      name: "Mug",
      amount: 99976,
      percentage: 20,
      purchased_at: "2024-11-20T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/bag-1-dark.avif",
      name: "Mug",
      amount: 78900,
      percentage: 15,
      purchased_at: "2024-11-30T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/sticker.avif",
      name: "Sticker",
      amount: 70001,
      percentage: 13,
      purchased_at: "2024-12-05T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/baby-cap-gray.avif",
      name: "Baby Cap Gray",
      amount: 6690,
      percentage: 13,
      purchased_at: "2024-12-05T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/t-shirt-2.avif",
      name: "T-shirt-white",
      amount: 30000,
      percentage: 6,
      purchased_at: "2024-12-10T10:00:00Z",
    },
    {
      avatar: "/images/dashboard/t-shirt-color-pink.avif",
      name: "T-shirt-color-pink",
      amount: 20000,
      percentage: 4,
      purchased_at: "2024-12-12T10:00:00Z",
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
