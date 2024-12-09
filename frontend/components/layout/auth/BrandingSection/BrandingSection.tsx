import BrandingHeader from '@/components/layout/auth/BrandingSection/contents/BrandingHeader';
import RevenueCard from '@/components/layout/auth/BrandingSection/contents/RevenueCard';
import FeatureGrid from '@/components/layout/auth/BrandingSection/contents/FeatureGrid';

export default function BrandingSection() {
    return (
        <div className="hidden lg:flex lg:w-1/2 h-screen bg-white items-center justify-center p-8">
            <div className="relative w-full max-w-md">
                {/* Background blobs */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

                <div className="relative z-10 space-y-12">
                    <BrandingHeader />
                    <RevenueCard />
                    <FeatureGrid />
                </div>
            </div>
        </div>
    );
}