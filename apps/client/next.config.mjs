/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['shared', 'types', 'api', 'tailwind-config', 'code-style-config'],
  reactStrictMode: false,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
    },
  ],
};

export default nextConfig;
