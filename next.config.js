const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      {
        protocol: "https",
        hostname: "preview.hellogirls.info",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/survey/2023/hall-of-fame/:place",
        destination: "/projects/survey/2023/hall-of-fame?place=:place",
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
