import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO: ダミーデータ用に登録してるだけ。消すこと
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.github.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
