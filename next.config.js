const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.enstars.link",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
      },
      {
        protocol: "https",
        hostname: "localhost:3000",
      },
      {
        protocol: "https",
        hostname: "hellogirls.info",
      },
      {
        protocol: "https",
        hostname: "assets.hellogirls.info",
      },
    ],
  },
};

module.exports = withMDX(nextConfig);
