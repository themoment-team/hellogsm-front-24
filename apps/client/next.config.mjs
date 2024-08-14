/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['shared', 'types', 'api', 'tailwind-config', 'code-style-config'],
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
    },
  ],
};

module.exports = nextConfig;

export default nextConfig;
