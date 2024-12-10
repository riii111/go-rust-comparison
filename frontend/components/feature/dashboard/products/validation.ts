import { z } from "zod";

export const MESSAGES = {
  product: {
    createFailed: "商品の登録に失敗しました",
    updateFailed: "商品の更新に失敗しました",
    name: {
      required: "商品名を入力してください",
    },
    description: {
      required: "商品説明を入力してください",
    },
    materialInfo: {
      required: "素材・製品仕様を入力してください",
    },
    basePrice: {
      required: "価格を入力してください",
      invalid: "価格は0以上で入力してください",
    },
    category: {
      required: "カテゴリを選択してください",
    },
    images: {
      required: "商品画像を1枚以上アップロードしてください",
    },
  },
} as const;

// ----------------------------------------------------------------
// 商品登録フォームのバリデーション
// ----------------------------------------------------------------
export const productSchema = z.object({
  name: z
    .string({
      required_error: MESSAGES.product.name.required,
    })
    .min(1, MESSAGES.product.name.required),

  description: z
    .string({
      required_error: MESSAGES.product.description.required,
    })
    .min(1, MESSAGES.product.description.required),

  materialInfo: z
    .string({
      required_error: MESSAGES.product.materialInfo.required,
    })
    .min(1, MESSAGES.product.materialInfo.required),

  basePrice: z
    .number({
      required_error: MESSAGES.product.basePrice.required,
    })
    .min(0, MESSAGES.product.basePrice.invalid),

  category: z
    .string({
      required_error: MESSAGES.product.category.required,
    })
    .min(1, MESSAGES.product.category.required),

  imageUrls: z.array(z.string()).min(1, MESSAGES.product.images.required),
});
