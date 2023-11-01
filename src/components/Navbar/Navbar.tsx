"use client";

import Link from "next/link";
import "./Navbar.styles.css";

export const Navbar = (): JSX.Element => {
    return (
        <nav>
            <Link href="/dex">Swap</Link>
            <Link href="/nft">NFT</Link>
            <Link href="/token">Token</Link>
            <Link href="/wallet">Wallet</Link>
        </nav>
    );
};
