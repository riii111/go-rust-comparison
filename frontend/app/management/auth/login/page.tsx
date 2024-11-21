import LoginForm from '@/components/feature/auth/login/LoginForm'

export default function LoginPage() {
    return (
        <>
            <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-8 bg-white lg:bg-transparent">
                <LoginForm />
            </div>
        </>
    );
}