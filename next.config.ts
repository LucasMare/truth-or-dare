import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export', 
  basePath: isGithubPages ? '/truth-or-dare' : '',
  assetPrefix: isGithubPages ? '/truth-or-dare/' : '',
  trailingSlash: true,
};

export default nextConfig;
