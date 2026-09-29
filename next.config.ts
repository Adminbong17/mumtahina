import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/contract',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/exprince',
        destination: '/experience',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

