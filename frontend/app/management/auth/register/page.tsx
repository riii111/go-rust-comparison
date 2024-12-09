import RegisterForm from '@/components/feature/auth/register/RegisterForm'

export default function RegisterPage() {
    return (
        <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-8 bg-card lg:bg-transparent">
            <RegisterForm />
        </div>
    );
}