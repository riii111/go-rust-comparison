'use client';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AccountInfoStep } from './contents/AccountInfoStep';
import { StoreInfoStep } from './contents/StoreInfoStep';
import { LinkText } from "@/components/common/atoms/LinkText";
import { registerAction, RegisterActionResult } from '@/components/feature/auth/register/actions';
import { accountInfoSchema, storeInfoSchema, RULES } from "@/components/feature/auth/validation";
import { useForm } from "@conform-to/react";
import { parseWithZod } from '@conform-to/zod';
import { useActionState } from 'react';
import { useState } from 'react';
import { RegisterRequest } from '@/config/types/api/user';
import { UserRole } from "@/config/constants/roles";

export default function RegisterForm() {
    const router = useRouter();
    const [state, dispatch] = useActionState<RegisterActionResult, RegisterRequest>(
        registerAction,
        {
            success: false,
            isPending: false
        }
    );
    const [currentStep, setCurrentStep] = useState<typeof RULES.steps.account | typeof RULES.steps.store>(
        RULES.steps.account
    );

    const [form, fields] = useForm({
        id: "register-form",
        defaultValue: {
            lastName: "",
            firstName: "",
            email: "",
            password: "",
            confirmPassword: "",
            storeId: "",
            role: "",
            agreedToTerms: false,
        },
        onValidate: ({ formData }) => {
            // 現在のステップに応じてバリデーションスキーマを切り替え
            const schema = currentStep === RULES.steps.account
                ? accountInfoSchema
                : storeInfoSchema;

            return parseWithZod(formData, { schema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();  // 複数ステップに分かれるので、フォームのデフォルト送信を防止

            const formData = new FormData(event.currentTarget);
            const schema = currentStep === RULES.steps.account
                ? accountInfoSchema
                : storeInfoSchema;

            const submission = parseWithZod(formData, { schema });

            if (submission.status !== "success") {
                return submission.reply();
            }

            if (currentStep === RULES.steps.account) {
                setCurrentStep(RULES.steps.store);
                return;
            }

            return submission.reply();
        }
    });

    const handleBack = () => {
        setCurrentStep(RULES.steps.account);
    };

    const handleLoginClick = (e: React.MouseEvent) => {
        // 画面遷移時にsubmitイベントが発火され、バリデーションエラー文言が出るのを防止
        e.preventDefault();
        e.stopPropagation();
        router.push('/management/auth/login');
    };

    const stepProps = {
        lastName: fields.lastName,
        firstName: fields.firstName,
        email: fields.email,
        password: fields.password,
        confirmPassword: fields.confirmPassword,
        storeId: fields.storeId,
        role: fields.role,
        agreedToTerms: fields.agreedToTerms
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={async (formData: FormData) => {
                    if (currentStep === RULES.steps.store) {
                        const payload: RegisterRequest = {
                            username: `${formData.get('lastName')} ${formData.get('firstName')}`,
                            email: formData.get('email') as string,
                            password: formData.get('password') as string,
                            store_id: formData.get('storeId') as string,
                            role: formData.get('role') as UserRole,
                        };
                        await dispatch(payload);
                    }
                }}
                noValidate
            >
                <CardHeader className="space-y-1">
                    {/* Step Indicator */}
                    <div className="flex justify-center space-x-2 mb-6">
                        {[RULES.steps.account, RULES.steps.store].map((step) => (
                            <div
                                key={step}
                                className={`w-24 h-1 rounded-full ${step <= currentStep ? 'bg-primary' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    <CardTitle className="text-xl font-bold text-gray-800">
                        {currentStep === RULES.steps.account ? "アカウント情報" : "店舗情報"}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                        {currentStep === RULES.steps.account
                            ? "基本情報を入力してください"
                            : "所属する店舗の情報を入力してください"
                        }
                    </CardDescription>
                </CardHeader>

                {currentStep === RULES.steps.account ? (
                    <AccountInfoStep {...stepProps} />
                ) : (
                    <StoreInfoStep {...stepProps} />
                )}

                <CardFooter className="flex flex-col space-y-4">
                    <div className="flex space-x-2 w-full">
                        {currentStep > RULES.steps.account && (
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={handleBack}
                            >
                                戻る
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={state.isPending || form.status === 'error'}
                        >
                            {currentStep < RULES.steps.total
                                ? '次へ'
                                : state.isPending
                                    ? '作成中...'
                                    : 'アカウントを作成'
                            }
                        </Button>
                    </div>
                    <div onClick={handleLoginClick}>
                        <LinkText
                            text="こちら"
                            prefix="すでにアカウントをお持ちの方は "
                        />
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
