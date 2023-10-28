import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import WagmiProvider from "@/context/wagmi-context";
import AuthProvider from "@/context/auth-context";

import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Moralis Usecases",
    description: "balling",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={inter.className}>
                <WagmiProvider>
                    <AuthProvider session={session}>{children}</AuthProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}
