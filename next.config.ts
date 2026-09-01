import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Actions exports a fully static site for GitHub Pages. The Sites
  // runtime keeps its normal server build when this environment flag is absent.
  output: process.env.GITHUB_ACTIONS === "true" ? "export" : undefined,
  trailingSlash: process.env.GITHUB_ACTIONS === "true",
  images: {
    // Keep one deterministic image path across Sites and the GitHub Pages export.
    unoptimized: true,
  },
};

export default nextConfig;
