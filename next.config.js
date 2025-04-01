/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // No experimental flags needed as App Router is now default in Next.js 14+
};

module.exports = nextConfig;
