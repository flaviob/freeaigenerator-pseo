/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'railway.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.railway.app',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
