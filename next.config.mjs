// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.enkubeauty.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
