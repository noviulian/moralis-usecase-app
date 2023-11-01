import type { Metadata } from "next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import WagmiProvider from "@/context/wagmi-context";
import AuthProvider from "@/context/auth-context";

import "../styles/global.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

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
            <body>
                <WagmiProvider>
                    <AuthProvider session={session}>
                        <Header />
                        <Main>{children}</Main>
                        <Footer />
                    </AuthProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}
