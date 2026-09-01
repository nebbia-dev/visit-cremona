import type { NextConfig } from "next";

const backendURL = process.env.NEXT_PUBLIC_BASE_URL as string;
const isDev = backendURL.startsWith("http://localhost");

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/it",
                permanent: false,
            },
        ];
    },
    images: {
        dangerouslyAllowLocalIP: isDev,
        remotePatterns: [
            new URL('http://localhost:1339/uploads/**'),
            new URL('https://strapi-mbmm-staging.up.railway.app/uploads/**'),
        ],
        // remotePatterns: [
        //     {
        //         protocol: isDev ? "http" : "https",
        //         hostname: isDev ? "localhost" : "",
        //         port: isDev ? "1338" : "5432",
        //         pathname: "uploads/**"
        //     },
        // ],
    }
};

export default nextConfig;
