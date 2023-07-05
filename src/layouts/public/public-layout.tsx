import { AuthContext } from "@/context";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

type PublicLayoutProps = {
    title?: string;
    info?: string;
};

export function PublicLayout({}: PublicLayoutProps) {
    const { authentication } = useContext(AuthContext);

    if (authentication.isAuthenticated) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <main className="bg-sgray-300">
            <header className="flex justify-between">
                <div>Back to web</div>
                <div>Language</div>
            </header>

            <Outlet />
        </main>
    );
}
