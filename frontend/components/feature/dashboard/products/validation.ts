import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "商品名は必須です"),
  description: z.string().min(1, "商品説明は必須です"),
  materialInfo: z.string().min(1, "素材・製品仕様は必須です"),
  basePrice: z.number().min(0, "価格は0以上で入力してください"),
  category: z.string().min(1, "カテゴリーは必須です"),
  imageUrls: z.array(z.string()).min(1, "商品画像は1枚以上必要です"),
});

export const MESSAGES = {
  // 既存のメッセージに追加
  product: {
    createFailed: "商品の登録に失敗しました",
    updateFailed: "商品の更新に失敗しました",
  },
} as const;
