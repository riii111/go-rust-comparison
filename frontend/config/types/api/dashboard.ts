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
  stats: Record<string, any>;
  platforms: any[];
  salesRank: any[];
  revenue: Revenue;
}

export type MetricType = "revenue" | "leads" | "w-l";
