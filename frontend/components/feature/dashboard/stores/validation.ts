import { z } from "zod";

export const RULES = {
  store: {
    name: {
      min: 2,
      max: 50,
    },
  },
} as const;

export const MESSAGES = {
  store: {
    name: {
      required: "店舗名を入力してください",
      min: `店舗名は${RULES.store.name.min}文字以上で入力してください`,
      max: `店舗名は${RULES.store.name.max}文字以下で入力してください`,
    },
    address: {
      required: "住所を入力してください",
    },
    phoneNumber: {
      required: "電話番号を入力してください",
      invalid: "正しい電話番号形式で入力してください",
    },
    businessHours: {
      required: "営業時間を入力してください",
    },
    zipCode: {
      required: "郵便番号を入力してください",
      invalid: "正しい郵便番号形式で入力してください",
    },
    createFailed: "店舗の登録に失敗しました",
    updateFailed: "店舗情報の更新に失敗しました",
  },
} as const;

// ----------------------------------------------------------------
// 各フィールドのバリデーション
// ----------------------------------------------------------------

// 店舗名
const nameSchema = z
  .string({
    required_error: MESSAGES.store.name.required,
  })
  .min(RULES.store.name.min, MESSAGES.store.name.min)
  .max(RULES.store.name.max, MESSAGES.store.name.max);

// 住所
const addressSchema = z.string({
  required_error: MESSAGES.store.address.required,
});

// 電話番号
const phoneNumberSchema = z
  .string({
    required_error: MESSAGES.store.phoneNumber.required,
  })
  .regex(/^[0-9]{2,4}-?[0-9]{2,4}-?[0-9]{3,4}$/, {
    message: MESSAGES.store.phoneNumber.invalid,
  });

// 営業時間
const businessHoursSchema = z.string({
  required_error: MESSAGES.store.businessHours.required,
});

// 郵便番号
const zipCodeSchema = z
  .string({
    required_error: MESSAGES.store.zipCode.required,
  })
  .regex(/^\d{3}-?\d{4}$/, {
    message: MESSAGES.store.zipCode.invalid,
  });

// ----------------------------------------------------------------
// 店舗登録フォームのバリデーション
// ----------------------------------------------------------------
export const storeSchema = z.object({
  name: nameSchema,
  address: addressSchema,
  phoneNumber: phoneNumberSchema,
  businessHours: businessHoursSchema,
  zipCode: zipCodeSchema,
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type StoreFormData = z.infer<typeof storeSchema>;
