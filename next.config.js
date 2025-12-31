/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 移除 standalone，Cloudflare Pages 不支持
  // output: 'standalone',
}

module.exports = nextConfig

