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
};

module.exports = nextConfig;
