/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i0.wp.com"],
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
