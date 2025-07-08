/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'realestatetraining.ph',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'filipinohomes123.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
