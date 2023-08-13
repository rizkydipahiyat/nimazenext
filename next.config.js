/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i0.wp.com"],
  },
  env: {
    BASE_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
