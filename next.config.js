/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "your-supabase-project-url.supabase.co"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_DEV_MODE: process.env.NODE_ENV === "development" ? "true" : "false",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
