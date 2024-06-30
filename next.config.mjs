/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002", // Pastikan ini adalah port backend Anda
      },
    ],
  },
};

export default nextConfig;
