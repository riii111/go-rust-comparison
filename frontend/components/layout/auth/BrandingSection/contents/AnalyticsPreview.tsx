import ChartSection from "@/components/layout/auth/BrandingSection/contents/ChartSection";

export default function AnalyticsPreview() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E0E0E0] space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-[#A0A0A0]">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#202020]">¥528,976</p>
                </div>
                <div className="text-[#E02060] text-sm font-medium px-2 py-1 bg-[#E02060]/10 rounded-full">
                    +7.2%
                </div>
            </div>
            <ChartSection />
        </div>
    );
}