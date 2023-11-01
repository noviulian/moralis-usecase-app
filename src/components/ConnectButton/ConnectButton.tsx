"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import Image from "next/image";
import Modal from "../Modal";

import "./ConnectButton.styles.css";

export const ConnectButton = (): JSX.Element => {
    const { data: session } = useSession();
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const metamaskAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({
            connector: new MetaMaskConnector(),
        });
        if (!account) {
            throw new Error("No account found");
        }
        if (!chain) {
            throw new Error("No chain found");
        }

        const userData = { address: account, chain: chain.id };

        const message = await fetch("/api/message", {
            method: "POST",
            body: JSON.stringify(userData),
        }).then((res) => res.json());

        console.log("message", message);

        const signature = await signMessageAsync({ message });

        const data = await signIn("credentials", {
            message,
            signature,
            redirect: false,
            callbackUrl: "/",
        });

        console.log("data", data);
    };

    const walletConnectAuth = async () => {
        setOpen(false);
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({
            connector: new WalletConnectConnector({
                options: {
                    projectId: "6850fb8ffcee4c15765db7c679a460a6",
                    showQrModal: true,
                },
            }),
        });

        if (!account) {
            throw new Error("No account found");
        }
        if (!chain) {
            throw new Error("No chain found");
        }

        const userData = { address: account, chain: chain.id };

        const message = await fetch("/api/message", {
            method: "POST",
            body: JSON.stringify(userData),
        }).then((res) => res.json());

        console.log("message", message);

        const signature = await signMessageAsync({ message });

        const data = await signIn("credentials", {
            message,
            signature,
            redirect: false,
            callbackUrl: "/",
        });

        console.log("data", data);
    };

    const authOptionList = [
        {
            name: "metamsk",
            logo: "https://metamask.io/images/metamask-logo.png",
            auth: metamaskAuth,
        },
        {
            name: "walletconnect",
            logo: "https://walletconnect.com/_next/static/media/brand_icon_blue.c5e25f1c.svg",
            auth: walletConnectAuth,
        },
    ];

    const [open, setOpen] = useState<boolean>(false);

    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            {session?.user ? (
                <button
                    className="connect-button"
                    onClick={() => {
                        signOut();
                    }}
                >
                    Logout
                </button>
            ) : (
                <button className="connect-button" onClick={openModal}>
                    Connect
                </button>
            )}

            <Modal open={open} onClose={closeModal}>
                {authOptionList.map((option) => (
                    <div
                        key={option.name}
                        onClick={() => {
                            option.auth().then(() => closeModal());
                        }}
                    >
                        <Image
                            src={option.logo}
                            alt={option.name}
                            width="50"
                            height="50"
                        />
                        <span>{option.name}</span>
                    </div>
                ))}
            </Modal>
        </>
    );
};
