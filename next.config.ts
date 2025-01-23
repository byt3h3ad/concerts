import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
