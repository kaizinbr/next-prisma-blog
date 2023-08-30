/** @type {import('next').NextConfig} */
const nextConfig = {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    
}

module.exports = nextConfig
