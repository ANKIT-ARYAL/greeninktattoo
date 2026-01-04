/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 1. Enable AVIF support for the highest compression
    formats: ['image/avif', 'image/webp'],
    
    // 2. Define breakpoints so Next.js creates smaller images for mobile
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;