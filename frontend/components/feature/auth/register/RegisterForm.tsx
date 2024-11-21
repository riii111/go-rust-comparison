'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

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
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-gray-800 text-sm">姓</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="family-name"
                                    placeholder="山田"
                                    className="w-full border-gray-200 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-gray-800 text-sm">名</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="given-name"
                                    placeholder="太郎"
                                    className="w-full border-gray-200 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-800 text-sm">メールアドレス</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="your-email@example.com"
                                className="w-full border-gray-200 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-800 text-sm">パスワード</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                className="w-full border-gray-200 text-sm"
                            />
                            <p className="text-gray-400 text-xs">
                                8文字以上の半角英数字で入力してください
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-800 text-sm">
                                パスワード（確認）
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                className="w-full border-gray-200 text-sm"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="storeName" className="text-gray-800 text-sm">店舗名</Label>
                            <Input
                                id="storeName"
                                name="storeName"
                                autoComplete="organization"
                                placeholder="Store Analytics 東京店"
                                className="w-full border-gray-200 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-gray-800 text-sm">役割</Label>
                            <Select name="role">
                                <SelectTrigger className="w-full border-gray-200 text-sm">
                                    <SelectValue placeholder="役割を選択してください" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="owner">店舗オーナー</SelectItem>
                                    <SelectItem value="manager">店舗管理者</SelectItem>
                                    <SelectItem value="staff">スタッフ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <label className="flex items-start space-x-2 mt-4">
                            <input
                                type="checkbox"
                                name="terms"
                                className="form-checkbox h-4 w-4 mt-2 text-primary border-gray-200"
                            />
                            <span className="text-gray-400 text-sm">
                                <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                                    利用規約
                                </Button>
                                と
                                <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                                    プライバシーポリシー
                                </Button>
                                に同意します
                            </span>
                        </label>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center space-x-2 mb-6">
            {[1, 2].map((step) => (
                <div
                    key={step}
                    className={`w-24 h-1 rounded-full ${step <= currentStep ? 'bg-primary' : 'bg-gray-200'
                        }`}
                />
            ))}
        </div>
    );

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return "アカウント情報";
            case 2:
                return "店舗情報";
            default:
                return "";
        }
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case 1:
                return "基本情報を入力してください";
            case 2:
                return "所属する店舗の情報を入力してください";
            default:
                return "";
        }
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                    {renderStepIndicator()}
                    <CardTitle className="text-xl font-bold text-gray-800">
                        {getStepTitle()}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                        {getStepDescription()}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {renderStepContent()}
                </CardContent>

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
                    <p className="text-sm text-gray-400 text-center">
                        すでにアカウントをお持ちの方は{' '}
                        <Button
                            variant="link"
                            className="text-primary hover:text-primary/80 p-0"
                            onClick={() => router.push('/management/auth/login')}
                        >
                            こちら
                        </Button>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}