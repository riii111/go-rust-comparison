import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NotFoundProps {
    title: string
    description: string
}

export function NotFound({ title, description }: NotFoundProps) {
    const router = useRouter()

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">
            <div className="max-w-md text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-gray-900">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-gray-500">{description}</p>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        前のページに戻る
                    </Button>
                    <Button
                        onClick={() => router.push('/management/dashboard/products')}
                    >
                        商品一覧へ
                    </Button>
                </div>
            </div>
        </div>
    )
}