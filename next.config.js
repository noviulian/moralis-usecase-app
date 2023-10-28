/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "metamask.io",
            },
            {
                hostname: "walletconnect.com",
            },
        ],
    },
};

module.exports = nextConfig;
