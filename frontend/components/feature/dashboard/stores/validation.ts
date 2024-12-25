import { z } from "zod";

export const RULES = {
  store: {
    name: {
      min: 2,
      max: 50,
    },
    address: {
      max: 200,
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
      empty: "空白のみの住所は入力できません",
      max: `住所は${RULES.store.address.max}文字以下で入力してください`,
    },
    phoneNumber: {
      required: "電話番号を入力してください",
      invalid: "正しい電話番号形式で入力してください",
    },
    businessHours: {
      required: "営業時間を入力してください",
      invalidTime: "正しい時刻形式で入力してください（例: 09:00）",
      invalidRange: "開始時刻は終了時刻より前である必要があります",
    },
    zipCode: {
      required: "郵便番号を入力してください",
      invalid: "半角数字7桁で入力してください（例: 123-4567）",
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
const addressSchema = z
  .string({
    required_error: MESSAGES.store.address.required,
  })
  .min(1, MESSAGES.store.address.required)
  .max(RULES.store.address.max, MESSAGES.store.address.max)
  .refine((val) => val.trim().length > 0, {
    message: MESSAGES.store.address.empty,
  });

// 電話番号
const phoneNumberSchema = z
  .string({
    required_error: MESSAGES.store.phoneNumber.required,
  })
  .regex(/^[0-9]{2,4}-?[0-9]{2,4}-?[0-9]{3,4}$/, {
    message: MESSAGES.store.phoneNumber.invalid,
  });

// バリデーションスキーマ
const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

// 時刻のバリデーション関数
const isValidTime = (time: string): boolean => {
  if (!time) return false;
  const [hours, minutes] = time.split(":");
  return Boolean(hours && minutes);
};

const businessHoursSchema = z.object({
  start: z
    .string()
    .refine(isValidTime, {
      message: "営業開始時刻を正しく入力してください",
    })
    .refine((val) => timePattern.test(val), {
      message: MESSAGES.store.businessHours.invalidTime,
    }),
  end: z
    .string()
    .refine(isValidTime, {
      message: "営業終了時刻を正しく入力してください",
    })
    .refine((val) => timePattern.test(val), {
      message: MESSAGES.store.businessHours.invalidTime,
    }),
  regularHoliday: z
    .array(z.enum(["月", "火", "水", "木", "金", "土", "日"]))
    .optional()
    .default([]),
});

// 郵便番号のフォーマット関数
export const formatZipCode = (value: string): string => {
  // 数字以外を除去
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length >= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}`;
  }
  return numbers;
};

// 郵便番号のバリデーションスキーマ
const zipCodeSchema = z
  .string({
    required_error: MESSAGES.store.zipCode.required,
  })
  .transform((val) => val.replace(/[^\d]/g, "")) // 数字以外を除去
  .refine((val) => /^\d{7}$/.test(val), {
    message: MESSAGES.store.zipCode.invalid,
  })
  .transform((val) => `${val.slice(0, 3)}-${val.slice(3)}`); // ハイフンを付与

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
