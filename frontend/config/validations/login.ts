import { z } from "zod";

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 72, // bcryptの制限に基づく一般的な上限
} as const;

export const ERROR_MESSAGES = {
  INVALID_EMAIL: "有効なメールアドレスを入力してください",
  PASSWORD_TOO_SHORT: `パスワードは${VALIDATION_RULES.PASSWORD_MIN_LENGTH}文字以上で入力してください`,
  PASSWORD_TOO_LONG: `パスワードは${VALIDATION_RULES.PASSWORD_MAX_LENGTH}文字以下で入力してください`,
  PASSWORD_REQUIREMENTS:
    "パスワードは大文字、小文字、数字、特殊文字をそれぞれ1文字以上含める必要があります",
  LOGIN_FAILED: "ログインに失敗しました。",
  UNEXPECTED_ERROR: "予期せぬエラーが発生しました。",
} as const;

export const loginSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      ERROR_MESSAGES.PASSWORD_TOO_SHORT
    )
    .max(VALIDATION_RULES.PASSWORD_MAX_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_LONG)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      ERROR_MESSAGES.PASSWORD_REQUIREMENTS
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
