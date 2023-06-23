/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
