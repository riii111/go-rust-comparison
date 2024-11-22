'use client';

import { useState } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AccountInfoStep } from './contents/AccountInfoStep';
import { StoreInfoStep } from './contents/StoreInfoStep';
import { LinkText } from "@/components/common/atoms/LinkText";
import { AccountInfo, RegisterFormData } from '@/config/types/auth/register';
import { accountInfoSchema, StoreInfoFormData, storeInfoSchema } from '@/config/validations/register';
import { registerAction } from './actions';
// import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';

const initialFormData: RegisterFormData = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    storeId: "",
    role: "",
    agreedToTerms: false,
};

export default function RegisterForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalSteps = 2;

    const validateStep = async (step: number) => {
        try {
            if (step === 1) {
                await accountInfoSchema.parseAsync({
                    lastName: formData.lastName,
                    firstName: formData.firstName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                });
            } else {
                await storeInfoSchema.parseAsync({
                    storeId: formData.storeId,
                    role: formData.role,
                    agreedToTerms: formData.agreedToTerms,
                });
            }
            setErrors({});
            return true;
        } catch (error: unknown) {
            const newErrors: Record<string, string> = {};
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors);
                return false;
            }
        };
    }

    const handleNext = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        setErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateStep(currentStep);
        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const result = await registerAction(
                `${formData.lastName} ${formData.firstName}`,
                formData.email,
                formData.password,
                formData.storeId,
                formData.role
            );

            if (!result.success) {
                throw new Error(result.error);
            }

            // toast.success('アカウントを作成しました');
        } catch (error: any) {
            // toast.error(error.message || 'アカウントの作成に失敗しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} noValidate>
                <CardHeader className="space-y-1">
                    {/* Step Indicator */}
                    <div className="flex justify-center space-x-2 mb-6">
                        {[1, 2].map((step) => (
                            <div
                                key={step}
                                className={`w-24 h-1 rounded-full ${step <= currentStep ? 'bg-primary' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    <CardTitle className="text-xl font-bold text-gray-800">
                        {currentStep === 1 ? "アカウント情報" : "店舗情報"}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                        {currentStep === 1
                            ? "基本情報を入力してください"
                            : "所属する店舗の情報を入力してください"
                        }
                    </CardDescription>
                </CardHeader>

                {currentStep === 1 ? (
                    <AccountInfoStep
                        formData={formData as AccountInfo}
                        onChange={setFormData as (data: AccountInfo) => void}
                        errors={errors}
                    />
                ) : (
                    <StoreInfoStep
                        formData={formData as StoreInfoFormData}
                        onChange={setFormData as (data: Partial<StoreInfoFormData>) => void}
                        errors={errors}
                    />
                )}

                <CardFooter className="flex flex-col space-y-4">
                    <div className="flex space-x-2 w-full">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={handleBack}
                            >
                                戻る
                            </Button>
                        )}
                        {currentStep < totalSteps ? (
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
                    <LinkText
                        text="こちら"
                        onClick={() => router.push('/management/auth/login')}
                        prefix="すでにアカウントをお持ちの方は "
                    />
                </CardFooter>
            </form>
        </Card>
    );
}
