"use client";

import "./Footer.styles.css";

export const Footer = (): JSX.Element => {
    return (
        <footer>
            <img
                src="/powered-white.svg"
                alt="powered by moralis"
                onClick={() => window.open("https://moralis.io", "_blank")}
            />
        </footer>
    );
};
