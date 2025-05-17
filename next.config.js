/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    unoptimized: true,
    domains: ["firebasestorage.googleapis.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
