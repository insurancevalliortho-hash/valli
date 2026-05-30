/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.85', '192.168.1.75'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'vallihospital.in',
          },
        ],
        destination: 'https://www.vallihospital.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
