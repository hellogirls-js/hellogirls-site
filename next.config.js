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
    ],
  },
};

module.exports = withMDX(nextConfig);
