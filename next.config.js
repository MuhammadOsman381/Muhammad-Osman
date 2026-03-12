/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatar.iran.liara.run" },
      { protocol: "https", hostname: "**" },
    ],
  },
};
module.exports = nextConfig;
