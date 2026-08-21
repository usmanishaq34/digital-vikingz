/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/posts/why-most-seo-audits-miss-the-entity-layer',
        destination: '/blog/why-most-seo-audits-miss-the-entity-layer',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;