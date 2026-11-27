import { resolve } from 'node:path'
import type { NextConfig } from 'next'

// GitHub Pages sert le site sous /<repo>/ ; en local ou sur domaine propre, basePath vide.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Espaces insécables avant la ponctuation française (voir scripts/typo-fr-loader.mjs).
  webpack(config) {
    config.module.rules.push({
      test: /\.(tsx?|json)$/,
      include: resolve(process.cwd(), 'src'),
      enforce: 'pre',
      use: resolve(process.cwd(), 'scripts/typo-fr-loader.mjs'),
    })
    return config
  },
}

export default nextConfig
