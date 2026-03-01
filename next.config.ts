import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/nextjs-todo-app',
  assetPrefix: '/nextjs-todo-app/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;