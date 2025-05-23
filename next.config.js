/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    domains: [
      "cdn0.peritoanimal.com.br",
      "exemplo.com",
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
      "i.imgur.com",
      "6energy.vercel.app",
    ],
  },
};

module.exports = nextConfig;
