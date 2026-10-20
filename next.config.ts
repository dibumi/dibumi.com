import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // HMR/dev resource Next diblokir bila Host bukan localhost; izinkan domain
  // lerd dan subdomain worktree (<branch>.dibumi.test).
  allowedDevOrigins: ["dibumi.test", "*.dibumi.test"],
};

export default nextConfig;
