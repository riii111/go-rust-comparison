export interface RevenueStats {
  avatar: string;
  name: string;
  amount: number;
  percentage: number;
}

export interface Revenue {
  revenue: number;
  previousRevenue: number;
  increase: number;
  increaseAmount: number;
  stats: RevenueStats[];
}

export interface DashboardData {
  stats: Record<string, any>; // 具体的な型に変更することを推奨
  platforms: any[]; // 具体的な型に変更することを推奨
  salesRank: any[]; // 具体的な型に変更することを推奨
  revenue: Revenue;
}

export type MetricType = "revenue" | "leads" | "w-l";
