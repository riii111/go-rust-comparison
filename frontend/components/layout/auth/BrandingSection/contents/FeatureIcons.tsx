export default function FeatureIcons() {
    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E0E0E0]">
                <div className="text-[#E02060] mb-2">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-[#A0A0A0] text-center">リアルタイム分析</p>
            </div>
            <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E0E0E0]">
                <div className="text-[#E02060] mb-2">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-[#A0A0A0] text-center">在庫管理</p>
            </div>
            <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E0E0E0]">
                <div className="text-[#E02060] mb-2">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-[#A0A0A0] text-center">売上管理</p>
            </div>
        </div>
    );
}