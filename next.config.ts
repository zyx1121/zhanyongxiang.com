import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.zhanyongxiang.com",
      },
    ],
  },
};

export default nextConfig;
