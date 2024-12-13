import { ReactNode } from "react";

// プラットフォーム関連の型
export interface PlatformSale {
  amount: number;
  purchased_at: string;
}

export interface PlatformData {
  name: string;
  revenue: number;
  percentage: number;
  icon: ReactNode;
  growth: number;
  color?: string;
  sales: PlatformSale[];
}

// 売上ランキング関連の型
export interface WinRate {
  wins: number;
  total: number;
}

export interface SalesRankData {
  name: string;
  avatar: string;
  revenue: number;
  sales: number;
  leads: number;
  kpi: number;
  winRate: WinRate;
  purchased_at: string;
}

// 統計情報の型
export interface StatsConfig {
  value: string;
  subtitle?: string;
  trend?: string;
  dark?: boolean;
  highlight?: boolean;
  link?: boolean;
}

// 収益データの型
export interface RevenueStat {
  avatar: string;
  name: string;
  amount: number;
  percentage: number;
  purchased_at: string;
}

export interface RevenueData {
  revenue: number;
  previousRevenue: number;
  increase: number;
  increaseAmount: number;
  stats: RevenueStat[];
}

// メインのダッシュボードデータ型
export interface DashboardData {
  stats: Record<string, StatsConfig>;
  platforms: PlatformData[];
  salesRank: SalesRankData[];
  revenue: RevenueData;
}

export type MetricType = "revenue" | "leads" | "w-l";
