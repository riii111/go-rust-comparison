'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormField from "@/components/common/molecules/FormField";
import { loginAction, LoginActionResult } from "@/components/feature/auth/login/actions";
import { z } from "zod";
import { useState } from "react";
import { LinkText } from "@/components/common/atoms/LinkText";

const loginSchema = z.object({
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const formData = new FormData(event.currentTarget);
            const validatedData = loginSchema.parse(formData);
            const result: LoginActionResult = await loginAction(
                validatedData.email,
                validatedData.password
            );

            // リダイレクトの場合はresultが一瞬undefinedになる
            if (result && !result.success) {
                setErrors(prev => ({ ...prev, form: result.error || "ログインに失敗しました。" }));
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
                error.errors.forEach(err => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
                    }
                });
                setErrors(prev => ({ ...prev, ...fieldErrors }));
            } else {
                setErrors(prev => ({ ...prev, form: "予期せぬエラーが発生しました。" }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit}>
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
                        id="email"
                        name="email"
                        type="email"
                        label="メールアドレス"
                        placeholder="your-email@example.com"
                        className="w-full border-gray-200 text-sm"
                        labelClassName="text-gray-800 text-sm"
                        required
                        error={errors.email}
                    />

                    <FormField
                        id="password"
                        name="password"
                        type="password"
                        label="パスワード"
                        className="w-full border-gray-200 text-sm"
                        labelClassName="text-gray-800 text-sm"
                        required
                        error={errors.password}
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
                        disabled={isLoading}
                    >
                        ログイン
                    </Button>
                    <LinkText
                        text="こちら"
                        onClick={() => router.push('/management/auth/register')}
                        prefix="アカウントをお持ちでない方は "
                    />
                </CardFooter>
            </form>
        </Card>
    );
}