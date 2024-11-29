// 認証関連の共通定数
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

// エラーメッセージ
export const MESSAGES = {
  email: {
    invalid: "有効なメールアドレスを入力してください",
  },
  password: {
    tooShort: `パスワードは${RULES.password.min}文字以上で入力してください`,
    tooLong: `パスワードは${RULES.password.max}文字以下で入力してください`,
    requirements:
      "パスワードは大文字、小文字、数字、特殊文字をそれぞれ1文字以上含める必要があります",
    mismatch: "パスワードが一致しません",
  },
  login: {
    failed: "ログインに失敗しました。",
  },
  unexpected: "予期せぬエラーが発生しました",
} as const;
