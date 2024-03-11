const { withContentlayer } = require("next-contentlayer")
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/review",
        destination: "https://g.page/r/CcD7xCeijHu1EBM/review",
        permanent: true,
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "random.unsplash.com",
      "github.com",
      "avatars.githubusercontent.com",
    ],
    formats: ["image/webp"],
  },
}

module.exports = withContentlayer(nextConfig)
