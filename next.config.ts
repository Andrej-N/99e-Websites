import type { NextConfig } from 'next'

// The base path is injected by GitHub Actions during the build
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
