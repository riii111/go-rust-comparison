'use client';

import { useState } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AccountInfoStep } from './contents/AccountInfoStep';
import { StoreInfoStep } from './contents/StoreInfoStep';
import { LinkText } from "@/components/common/atoms/LinkText";

export default function RegisterForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 2;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 登録処理の実装
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <AccountInfoStep />;
            case 2:
                return <StoreInfoStep />;
            default:
                return null;
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

                {renderStepContent()}

                <CardFooter className="flex flex-col space-y-4">
                    <div className="flex space-x-2 w-full">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setCurrentStep(prev => prev - 1)}
                            >
                                戻る
                            </Button>
                        )}
                        {currentStep < totalSteps ? (
                            <Button
                                type="button"
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                            >
                                次へ
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                アカウントを作成
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