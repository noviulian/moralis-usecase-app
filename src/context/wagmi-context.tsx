"use client";

import { wagmiConfig } from "@/configs/wagmi";

import { WagmiConfig } from "wagmi";

export default function WagmiProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
