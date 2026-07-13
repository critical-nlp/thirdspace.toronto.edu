import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
