import { ProductWithStock } from "@/config/types/api/product";

// 開発用のダミーデータ
export const DUMMY_PRODUCTS: ProductWithStock[] = [
    {
        id: "1",
        name: "ベーシックTシャツ",
        description: "シンプルで着やすい定番Tシャツ。シーズンを問わず活躍する万能アイテムです。襟元のリブ編みがスタイリッシュで、カジュアルからビジネスカジュアルまで幅広く対応できます。",
        materialInfo: "コットン100%、優れた通気性と肌触りを実現。環境に配慮した有機栽培コットンを使用。洗濯耐久性にも優れ、型崩れしにくい特殊加工を施しています。",
        basePrice: 2500,
        category: "clothing",
        imageUrls: [
            "https://picsum.photos/seed/fashion1/400/400",
            "https://picsum.photos/seed/fashion2/400/400",
            "https://picsum.photos/seed/fashion3/400/400",
            "https://picsum.photos/seed/fashion4/400/400",
            "https://picsum.photos/seed/fashion5/400/400",
        ],
        createdBy: "system",
        updatedBy: "system",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        stocks: [
            {
                id: "stock1",
                productId: "1",
                storeId: "store1",
                size: "M",
                color: "White",
                quantity: 10,
                price: 2500,
                isAvailable: true,
                createdBy: "system",
                updatedBy: "system",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z"
            },
            {
                id: "stock2",
                productId: "1",
                storeId: "store1",
                size: "L",
                color: "Black",
                quantity: 2,
                price: 2500,
                isAvailable: true,
                createdBy: "system",
                updatedBy: "system",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z"
            },
            {
                id: "stock3",
                productId: "1",
                storeId: "store2",
                size: "S",
                color: "Navy",
                quantity: 0,
                price: 2500,
                isAvailable: false,
                createdBy: "system",
                updatedBy: "system",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z"
            }
        ]
    },
    {
        id: "2",
        name: "プレミアムレザーベルト",
        description: "イタリア製の高級牛革を使用したプレミアムベルト。ビジネスからカジュアルまで幅広く活用できます。",
        materialInfo: "表面：イタリア製フルグレインレザー、バックル：真鍮製（ニッケルフリー）、幅：3.5cm、厚さ：4mm",
        basePrice: 12800,
        category: "accessories",
        imageUrls: [
            "https://picsum.photos/seed/belt1/400/400",
            "https://picsum.photos/seed/belt2/400/400",
            "https://picsum.photos/seed/belt3/400/400",
        ],
        createdBy: "store_admin1",
        updatedBy: "store_admin1",
        createdAt: "2024-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
        stocks: [
            {
                id: "stock4",
                productId: "2",
                storeId: "store1",
                size: "M",
                color: "Brown",
                quantity: 4,
                price: 12800,
                isAvailable: true,
                createdBy: "store_admin1",
                updatedBy: "store_admin1",
                createdAt: "2024-01-15T00:00:00Z",
                updatedAt: "2024-01-15T00:00:00Z"
            }
        ]
    },
    {
        id: "3",
        name: "クラシックレザーシューズ",
        description: "伝統的な製法で作られたレザーシューズ。ビジネスシーンに最適です。",
        materialInfo: "アッパー：本革（カーフレザー）、ソール：レザー、インソール：低反発クッション",
        basePrice: 35000,
        category: "shoes",
        imageUrls: [
            "https://picsum.photos/seed/shoes1/400/400",
            "https://picsum.photos/seed/shoes2/400/400",
        ],
        createdBy: "store_admin2",
        updatedBy: "system",
        createdAt: "2024-02-01T00:00:00Z",
        updatedAt: "2024-02-10T00:00:00Z",
        stocks: []
    },
    {
        id: "4",
        name: "カジュアルデニムジャケット",
        description: "ヴィンテージ加工を施したデニムジャケット。カジュアルなスタイリングに最適です。",
        materialInfo: "コットン98%、ポリウレタン2%、重量：約800g、裏地：なし",
        basePrice: 18500,
        category: "clothing",
        imageUrls: [
            "https://picsum.photos/seed/jacket1/400/400",
            "https://picsum.photos/seed/jacket2/400/400",
            "https://picsum.photos/seed/jacket3/400/400",
        ],
        createdBy: "store_admin1",
        updatedBy: "store_admin1",
        createdAt: "2024-02-15T00:00:00Z",
        updatedAt: "2024-02-15T00:00:00Z",
        stocks: [
            {
                id: "stock5",
                productId: "4",
                storeId: "store1",
                size: "M",
                color: "Indigo",
                quantity: 0,
                price: 18500,
                isAvailable: true,
                createdBy: "store_admin1",
                updatedBy: "store_admin1",
                createdAt: "2024-02-15T00:00:00Z",
                updatedAt: "2024-02-15T00:00:00Z"
            }
        ]
    },
    {
        id: "5",  // エラー用のダミーデータ
        name: "エラーテスト用商品",
        description: "この商品はエラーテスト用です",
        materialInfo: "テスト用",
        basePrice: 999,
        category: "other",
        imageUrls: [
            "https://picsum.photos/seed/error1/400/400",
        ],
        createdBy: "system",
        updatedBy: "system",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        stocks: []
    }
];
