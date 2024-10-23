// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-static.nykaa.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '196.188.249.25',
        port:"5000",
        pathname: '/**'
      }
    ],
  },
};

export default nextConfig;
