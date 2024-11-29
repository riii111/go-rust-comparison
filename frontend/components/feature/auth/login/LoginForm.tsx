'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormField from "@/components/common/molecules/FormField";
import { loginAction } from "@/components/feature/auth/login/actions";
import { LinkText } from "@/components/common/atoms/LinkText";
import { loginSchema } from "@/components/feature/auth/validation";
import { MESSAGES } from "@/components/feature/auth/constants";
import { useForm } from "@conform-to/react";
import { parseWithZod } from '@conform-to/zod';

export default function LoginForm() {
    const router = useRouter();
    // useStateと異なり、Reactの並行性機能を利用できる
    // Reactのライフサイクルフック内で自動制御可能（アンマウント→自動でクリーンアップ）
    // エラー発生時は自動でエラーバウンダリに通知されるのでtry-catchも不要
    const [isPending, startTransition] = useTransition();
    const [form, { email, password }] = useForm({
        id: "login-form",
        defaultValue: {
            email: "",
            password: ""
        },
        onValidate: ({ formData }) => {
            return parseWithZod(formData, {
                schema: loginSchema
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",    // 入力時に再バリデーション
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget);
            const submission = parseWithZod(formData, {
                schema: loginSchema
            });

            if (submission.status !== "success") {
                return submission.reply();
            }

            startTransition(() => {
                void (async () => {
                    const result = await loginAction(
                        submission.value.email,
                        submission.value.password
                    );

                    if (result && !result.success) {
                        return submission.reply({
                            formErrors: [result.error || MESSAGES.login.failed]
                        });
                    }
                    router.push('/management/dashboard');
                })();
            });
        }
    });

    const handleRegisterClick = (e: React.MouseEvent) => {
        // 画面遷移時にsubmitイベントが発火され、バリデーションエラー文言が出るのを防止
        e.preventDefault();
        e.stopPropagation();
        router.push('/management/auth/register');
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form id={form.id} onSubmit={form.onSubmit} noValidate>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-bold text-gray-800">
                        ログイン
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                        管理画面にアクセスするには認証が必要です
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <FormField
                        id={email.id}
                        name={email.name}
                        type="email"
                        label="メールアドレス"
                        placeholder="your-email@example.com"
                        className="w-full border-gray-200 text-sm"
                        labelClassName="text-gray-800 text-sm"
                        required
                        error={email.errors?.[0]}
                        autoComplete="email"
                    />

                    <FormField
                        id={password.id}
                        name={password.name}
                        type="password"
                        label="パスワード"
                        className="w-full border-gray-200 text-sm"
                        labelClassName="text-gray-800 text-sm"
                        required
                        error={password.errors?.[0]}
                        autoComplete="current-password"
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary border-gray-200"
                            />
                            <span className="text-gray-400 text-sm">
                                ログイン情報を保存
                            </span>
                        </label>
                        <LinkText
                            text="パスワードをお忘れの方"
                            className="text-sm text-primary hover:text-primary/80 p-0"
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isPending || form.status === 'error'}  // フォームが未変更のまま送信されるのを防ぐためdirtyも設定
                    >
                        {isPending ? 'ログイン中...' : 'ログイン'}
                    </Button>
                    <div onClick={handleRegisterClick}>
                        <LinkText
                            text="こちら"
                            prefix="アカウントをお持ちでない方は "
                        />
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}