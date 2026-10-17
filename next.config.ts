import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Forbid embedding the site in third-party frames (clickjacking)
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Hosts allowed to open the dev server besides localhost (e.g. a phone on the LAN).
  // Without this Next blocks dev scripts for other origins and the page isn't interactive.
  // Set in .env.local: ALLOWED_DEV_ORIGINS=192.168.1.10,my-laptop.local
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  cacheComponents: true,
  // Off on purpose: with it, unknown /catalog/[slug] pages were served as 200 (soft 404)
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
