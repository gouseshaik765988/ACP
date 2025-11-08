import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    turbo: {
      rules: {},
    },
  },

  turbopack: {
    root: __dirname,
  },

  output: "standalone",
};

export default nextConfig;
