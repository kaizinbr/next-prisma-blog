/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    // serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "**",
            },
        ],
        domains: ['firebasestorage.googleapis.com'],
    },
};
// module.exports = nextConfig;
