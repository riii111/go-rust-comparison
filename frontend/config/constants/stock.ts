// 在庫が5個以下の場合を低在庫とする
export const LOW_STOCK_THRESHOLD = 5;

// 在庫状態のラベル
export const stockStatusConfig = {
  in_stock: { label: "在庫あり", variant: "default" as const },
  low_stock: { label: "残りわずか", variant: "secondary" as const },
  out_of_stock: { label: "在庫なし", variant: "destructive" as const },
  unavailable: { label: "取り扱い終了", variant: "outline" as const },
} as const;
