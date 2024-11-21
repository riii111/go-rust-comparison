import AnalyticsPreview from '@/components/layout/auth/BrandingSection/contents/AnalyticsPreview'
import FeatureIcons from '@/components/layout/auth/BrandingSection/contents/FeatureIcons'

export default function BrandingSection() {
    return (
        <div className="hidden lg:flex lg:w-1/2 h-screen bg-white items-center justify-center p-8">
            <div className="relative w-full max-w-md">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#E02060]/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#E0E0E0] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="p-2 bg-[#E02060]/10 rounded-lg">
                                <svg className="w-6 h-6 text-[#E02060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-[#202020]">Store Analytics</h1>
                        </div>
                        <p className="text-[#A0A0A0] text-center text-sm">
                            商品の在庫管理と売上分析を、<br />シンプルに一元化
                        </p>
                    </div>

                    <AnalyticsPreview />
                    <FeatureIcons />
                </div>
            </div>
        </div>
    );
}