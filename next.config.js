/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    experimental: {
        serverComponentsExternalPackages: ['pdf-parse'],
    },
}

module.exports = nextConfig
