import { z } from "zod";

export const RULES = {
  password: {
    min: 8,
    max: 72, // bcryptの制限に基づく一般的な上限
  },
  steps: {
    account: 1,
    store: 2,
    total: 2,
  },
} as const;

export const MESSAGES = {
  email: {
    invalid: "有効なメールアドレスを入力してください",
    required: "メールアドレスを入力してください",
  },
  password: {
    tooShort: `パスワードは${RULES.password.min}文字以上の大文字、小文字、数字、特殊文字を含めて入力してください`,
    tooLong: `パスワードは${RULES.password.max}文字以下の大文字、小文字、数字、特殊文字を含めて入力してください`,
    required: "パスワードを入力してください",
    requirements:
      "パスワードは大文字、小文字、数字、特殊文字をそれぞれ1文字以上含める必要があります",
    mismatch: "パスワードが一致しません",
  },
  login: {
    failed: "ログインに失敗しました。",
  },
  unexpected: "予期せぬエラーが発生しました",
} as const;

// ----------------------------------------------------------------
// 各フィールドのバリデーション
// ----------------------------------------------------------------

// パスワード
export const passwordSchema = z
  .string({
    required_error: MESSAGES.password.required,
  })
  .min(RULES.password.min, MESSAGES.password.tooShort)
  .max(RULES.password.max, MESSAGES.password.tooLong)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    MESSAGES.password.requirements
  );

// メールアドレス
export const emailSchema = z
  .string({
    required_error: MESSAGES.email.required,
  })
  .email(MESSAGES.email.invalid);

// フィールドのバリデーションヘルパー
export const validateField = (
  schema: z.ZodType<string>,
  name: string,
  value: unknown,
  setErrors: React.Dispatch<
    React.SetStateAction<{
      accountInfo: Record<string, string>;
      storeInfo: Record<string, string>;
    }>
  >,
  currentStep: "accountInfo" | "storeInfo"
): void => {
  try {
    schema.parse(value);
    setErrors((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [name]: undefined,
      },
    }));
  } catch (err) {
    if (err instanceof z.ZodError) {
      setErrors((prev) => ({
        ...prev,
        [currentStep]: {
          ...prev[currentStep],
          [name]: err.errors[0]?.message || "",
        },
      }));
    }
  }
};

// ----------------------------------------------------------------
// ログインフォームのバリデーション
// ----------------------------------------------------------------
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ----------------------------------------------------------------
// アカウント登録フォームのバリデーション
// ----------------------------------------------------------------

// アカウント情報のバリデーション
export const accountInfoSchema = z
  .object({
    lastName: z.string({
      required_error: "姓を入力してください",
    }),
    firstName: z.string({
      required_error: "名を入力してください",
    }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: MESSAGES.password.mismatch,
    path: ["confirmPassword"],
  });

// 店舗情報のバリデーション
export const storeInfoSchema = z.object({
  storeId: z.string({
    required_error: "店舗を選択してください",
  }),
  role: z.string({
    required_error: "役割を選択してください",
  }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "利用規約とプライバシーポリシーに同意してください",
  }),
});

// 全体のスキーマ
export const registerSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  storeId: z.string(),
  role: z.string(),
  agreedToTerms: z.boolean(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type StoreInfoFormData = z.infer<typeof storeInfoSchema>;
export type AccountInfoFormData = z.infer<typeof accountInfoSchema>;
