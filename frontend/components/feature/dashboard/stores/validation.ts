import { z } from "zod";

export const MESSAGES = {
  store: {
    required: "必須項目です",
    createFailed: "店舗の登録に失敗しました",
    updateFailed: "店舗情報の更新に失敗しました",
    name: {
      min: "店舗名は2文字以上で入力してください",
      max: "店舗名は50文字以下で入力してください",
    },
    phoneNumber: {
      invalid: "正しい電話番号形式で入力してください",
    },
    zipCode: {
      invalid: "正しい郵便番号形式で入力してください",
    },
  },
} as const;

export const storeSchema = z.object({
  name: z
    .string()
    .min(2, { message: MESSAGES.store.name.min })
    .max(50, { message: MESSAGES.store.name.max }),
  address: z.string().min(1, { message: MESSAGES.store.required }),
  phoneNumber: z.string().regex(/^[0-9]{2,4}-?[0-9]{2,4}-?[0-9]{3,4}$/, {
    message: MESSAGES.store.phoneNumber.invalid,
  }),
  businessHours: z.string().min(1, { message: MESSAGES.store.required }),
  zipCode: z.string().regex(/^\d{3}-?\d{4}$/, {
    message: MESSAGES.store.zipCode.invalid,
  }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type StoreFormData = z.infer<typeof storeSchema>;
