import { ProductStock } from "@/config/types/api/product";
import { LOW_STOCK_THRESHOLD } from "@/config/constants/stock";
import type { StockStatus } from "@/config/types/ui/stock";

export const getStockStatus = (stocks: ProductStock[]): StockStatus => {
  if (!stocks || stocks.length === 0) return "unavailable";

  const totalQuantity = stocks.reduce(
    (sum, stock) => (stock.isAvailable ? sum + stock.quantity : sum),
    0
  );

  if (totalQuantity === 0) return "out_of_stock";
  if (totalQuantity < LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
};
