"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "../Navbar";

import "./Header.styles.css";
import ConnectButton from "../ConnectButton";
export const Header = (): JSX.Element => {
    const headerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                headerRef.current?.classList.add("scrolled");
            } else {
                headerRef.current?.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header ref={headerRef}>
            <div className="left">
                <img
                    src="/logo.svg"
                    alt="moralis-logo"
                    className="moralis-logo"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                />
                <Navbar />
            </div>
            <div className="center">center</div>
            <div className="right">
                <ConnectButton />
            </div>
        </header>
    );
};
