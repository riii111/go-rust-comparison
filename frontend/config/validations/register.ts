import { z } from "zod";

// 基本的なスキーマを定義
const accountBaseSchema = z.object({
  lastName: z.string().min(1, "姓を入力してください"),
  firstName: z.string().min(1, "名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      "パスワードは半角英数字を含める必要があります"
    ),
  confirmPassword: z.string(),
});

export const storeInfoSchema = z.object({
  storeId: z.string().min(1, "店舗を選択してください"),
  role: z.string().min(1, "役割を選択してください"),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({
      message: "利用規約とプライバシーポリシーに同意してください",
    }),
  }),
});

export const registerSchema = accountBaseSchema
  .merge(storeInfoSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// 各ステップ用のスキーマ
export const accountInfoSchema = accountBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  }
);

export type StoreInfoFormData = z.infer<typeof storeInfoSchema>;
