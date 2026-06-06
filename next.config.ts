/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'affzzhjtrmopmkoronqc.supabase.co', // Use your project URL
      },
      {
        protocol: 'https',
        hostname: 'www.madrabbit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // Add this entry
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mantratattoo.us',
        port: '',
        pathname: '/**',
      }
    ],
  },
}
module.exports = nextConfig