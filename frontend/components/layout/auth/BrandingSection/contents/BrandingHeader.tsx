export default function BrandingHeader() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Store Analytics</h1>
            </div>
        </div>
    );
}