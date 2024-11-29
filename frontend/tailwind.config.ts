import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // メインカラー（重要なアクション、ブランドカラー）
        primary: {
          DEFAULT: "hsl(var(--primary))", // #E02060
          light: "hsl(var(--primary-light))", // #E02060 with opacity
          dark: "hsl(var(--primary-dark))", // darker shade of #E02060
          foreground: "hsl(var(--primary-foreground))", // white text on primary
        },
        // グレースケール
        gray: {
          50: "hsl(var(--gray-50))", // #FAFAFA - 背景色
          100: "hsl(var(--gray-100))", // #F0F0F0 - より濃い背景色
          200: "hsl(var(--gray-200))", // #E0E0E0 - ボーダー
          300: "hsl(var(--gray-300))", // #D0D0D0
          400: "hsl(var(--gray-400))", // #A0A0A0 - 補足テキスト
          500: "hsl(var(--gray-500))", // #808080
          600: "hsl(var(--gray-600))", // #606060
          700: "hsl(var(--gray-700))", // #404040
          800: "hsl(var(--gray-800))", // #202020 - メインテキスト
          900: "hsl(var(--gray-900))", // #101010
        },
        // 背景色とフォアグラウンド
        background: "hsl(var(--background))", // #FAFAFA
        foreground: "hsl(var(--foreground))", // #202020
        // カード関連
        card: {
          DEFAULT: "hsl(var(--card))", // white
          foreground: "hsl(var(--card-foreground))", // #202020
        },
        // ポップオーバー関連
        popover: {
          DEFAULT: "hsl(var(--popover))", // white
          foreground: "hsl(var(--popover-foreground))", // #202020
        },
        // セカンダリーアクション
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #F0F0F0
          foreground: "hsl(var(--secondary-foreground))", // #202020
        },
        // ミュートカラー（控えめな要素）
        muted: {
          DEFAULT: "hsl(var(--muted))", // #F0F0F0
          foreground: "hsl(var(--muted-foreground))", // #A0A0A0
        },
        // アクセントカラー
        accent: {
          DEFAULT: "hsl(var(--accent))", // #F0F0F0
          foreground: "hsl(var(--accent-foreground))", // #202020
        },
        // 破壊的アクション
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // #FF4444
          foreground: "hsl(var(--destructive-foreground))", // white
        },
        // フォーム要素
        border: "hsl(var(--border))", // #E0E0E0
        input: "hsl(var(--input))", // #E0E0E0
        ring: "hsl(var(--ring))", // #E02060
        // チャートカラー
        chart: {
          "1": "hsl(var(--chart-1))", // #E02060
          "2": "hsl(var(--chart-2))", // #FF385C
          "3": "hsl(var(--chart-3))", // #40A0FF
          "4": "hsl(var(--chart-4))", // #34C759
          "5": "hsl(var(--chart-5))", // #FFB340
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // アニメーション
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
