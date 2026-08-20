import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* The role pages moved under /staffing in the content rebuild. The old
         paths were live, so they redirect permanently rather than 404. */
      {
        source: "/roles/:slug",
        destination: "/staffing/roles/:slug",
        permanent: true,
      },
      {
        source: "/roles",
        destination: "/staffing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
