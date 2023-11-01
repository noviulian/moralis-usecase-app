import { MainProps } from "./types";

import "./Main.styles.css";
export const Main = ({ children }: MainProps): JSX.Element => {
    return (
        <main>
            <div className="centered-content">{children}</div>
        </main>
    );
};
