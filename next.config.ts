import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep only true consolidations here. Do NOT 308 "/" → "/ar":
  // that made Search Console report "Page with redirect" for the site root.
  // Root is rewritten to Arabic in src/proxy.ts (HTTP 200).
  async redirects() {
    return [
      // /guide was a thin duplicate of /trust — consolidate canonicals for GSC.
      {
        source: "/:locale(ar|en)/guide",
        destination: "/:locale/trust",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
