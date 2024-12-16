export const categoryConfig = {
  clothing: {
    label: "衣類",
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  },
  accessories: {
    label: "アクセサリー",
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  },
  shoes: {
    label: "シューズ",
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  },
  other: {
    label: "その他",
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  },
} as const;

// 画像の上限数
export const MAX_IMAGES = 5;

// 画像のサイズ上限
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// 画像の拡張子
export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];
