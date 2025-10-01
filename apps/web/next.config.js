/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@poreitsid/engine', '@poreitsid/ui'],
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  },

  // Production optimizations
  swcMinify: true,
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Headers are handled in middleware.ts
  async headers() {
    return [];
  },
};

module.exports = withPWA(nextConfig);
