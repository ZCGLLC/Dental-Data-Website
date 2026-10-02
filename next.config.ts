import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: [
    "officer-canberra-priest-outreach.trycloudflare.com",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
