'use client';

import { useState } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AccountInfoStep } from './contents/AccountInfoStep';
import { StoreInfoStep } from './contents/StoreInfoStep';
import { LinkText } from "@/components/common/atoms/LinkText";
import { registerAction, RegisterActionResult } from './actions';
import { RULES } from '@/components/feature/auth/constants';
import { emailSchema, passwordSchema, validateField, RegisterFormData, accountInfoSchema, storeInfoSchema } from "@/components/feature/auth/validation";
import * as z from "zod";

export default function RegisterForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<typeof RULES.steps.account | typeof RULES.steps.store>(
        RULES.steps.account
    );
    const [formData, setFormData] = useState<RegisterFormData>({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        storeId: "",
        role: "",
        agreedToTerms: false,
    });
    const [errors, setErrors] = useState({
        accountInfo: {} as Record<string, string>,
        storeInfo: {} as Record<string, string>,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getCurrentErrors = () =>
        currentStep === RULES.steps.account ? errors.accountInfo : errors.storeInfo;

    const setCurrentErrors = (newErrors: Record<string, string>) => {
        setErrors(prev => ({
            ...prev,
            [getCurrentStepKey(currentStep)]: newErrors
        }));
    };

    const getCurrentStepKey = (step: typeof RULES.steps.account | typeof RULES.steps.store): 'accountInfo' | 'storeInfo' =>
        step === RULES.steps.account ? 'accountInfo' : 'storeInfo';

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let schema;
        switch (name) {
            case 'email':
                schema = emailSchema;
                break;
            case 'password':
            case 'confirmPassword':
                schema = passwordSchema;
                break;
            default:
                return;
        }
        validateField(schema, name, value, setErrors, getCurrentStepKey(currentStep));
    };
    const handleNext = async () => {
        const isValid = await validateStep(
            currentStep,
            formData,
            setCurrentErrors
        );
        if (isValid) {
            setCurrentStep(RULES.steps.store);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev === RULES.steps.account ? RULES.steps.account : RULES.steps.store);
        setCurrentErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await validateStep(currentStep, formData, setCurrentErrors);
        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const result: RegisterActionResult = await registerAction(
                `${formData.lastName} ${formData.firstName}`,
                formData.email,
                formData.password,
                formData.storeId,
                formData.role
            );

            if (!result.success) {
                throw new Error(result.error);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                // エラーハンドリング
                console.error(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoginClick = (e: React.MouseEvent) => {
        // 画面遷移時にsubmitイベントが発火され、バリデーションエラー文言が出るのを防止
        e.preventDefault();
        e.stopPropagation();
        router.push('/management/auth/login');
    };

    const handleStepChange = (data: Partial<RegisterFormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const stepProps = {
        formData,
        onChange: handleStepChange,
        errors: getCurrentErrors(),
        onBlur: handleBlur,
    };

    const validateStep = async (
        step: typeof RULES.steps.account | typeof RULES.steps.store,
        data: RegisterFormData,
        setFieldErrors: (errors: Record<string, string>) => void
    ) => {
        try {
            if (step === RULES.steps.account) {
                await accountInfoSchema.parseAsync(data);
            } else {
                await storeInfoSchema.parseAsync(data);
            }
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.errors.forEach(error => {
                    if (error.path[0]) {
                        fieldErrors[error.path[0]] = error.message;
                    }
                });
                setFieldErrors(fieldErrors);
            }
            return false;
        }
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} noValidate>
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
                        {currentStep < RULES.steps.total ? (
                            <Button
                                type="button"
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                                onClick={handleNext}
                            >
                                次へ
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '作成中...' : 'アカウントを作成'}
                            </Button>
                        )}
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
