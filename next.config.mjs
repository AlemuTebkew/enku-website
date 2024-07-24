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
    ],
  },
};

export default nextConfig;
