import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StoreInfoStep() {
    return (
        <CardContent className="space-y-4">
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
        </CardContent>
    );
}