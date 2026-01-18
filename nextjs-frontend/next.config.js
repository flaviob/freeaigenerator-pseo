/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'freeaigenerator-pseo-production.up.railway.app',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
