import { useSession } from "next-auth/react";
import Jazzicon from "react-jazzicon";
import "./UserDetails.styles.css";
export const UserDetails = (): JSX.Element => {
    const { data: session } = useSession();
    if (!session) {
        return <></>;
    }

    return (
        <div className="user-details">
            {session?.user ? (
                <>
                    <Jazzicon
                        diameter={25}
                        // @ts-ignore
                        seed={parseInt(session.user.address, 16)}
                    />
                    <span>
                        {/* @ts-ignore */}
                        {session.user.address.toString().slice(0, 6) +
                            "..." +
                            // @ts-ignore
                            session.user.address.toString().slice(-4)}
                    </span>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};
