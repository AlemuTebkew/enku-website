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
        hostname: 'ec2-3-91-23-59.compute-1.amazonaws.com',
        pathname: '/**'
      }
    ],
  },
};

export default nextConfig;
