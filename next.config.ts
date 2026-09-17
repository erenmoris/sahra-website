import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permanent redirects (308) so Google consolidates / into /ar.
  // Middleware alone can still emit 307 on the homepage on Vercel.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ar",
        permanent: true,
      },
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
