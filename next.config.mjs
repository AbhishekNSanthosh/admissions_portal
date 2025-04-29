/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "http",
        hostname: "**.localhost", // Allow all subdomains on localhost
      },
      {
        protocol: "http",
        hostname: "localhost", // Explicitly allow localhost
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
