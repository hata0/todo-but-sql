import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@electric-sql/pglite-react", "@electric-sql/pglite"],
};

// eslint-disable-next-line turbo/no-undeclared-env-vars, no-undef
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
