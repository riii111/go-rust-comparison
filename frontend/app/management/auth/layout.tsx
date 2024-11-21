import BrandingSection from "@/components/layout/auth/BrandingSection/BrandingSection";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFAFA]">
            <BrandingSection />
            {children}
        </div>
    );
}