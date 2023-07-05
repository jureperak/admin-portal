import { AuthContext } from "@/context";
import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header, Navigation } from "@/features/layout";

export function PrivateLayout() {
    const { authentication } = useContext(AuthContext);

    if (!authentication.isAuthenticated) {
        return <Navigate to="/login" replace={true} />;
    }

    // const config: AxiosRequestConfig<UserRequest> = {
    //     method: "GET",
    //     url: "/user/settings",
    // };

    // async function fetchUser() {
    //     const result = await axiosClient.request<UserResponse, AxiosResponse<UserResponse, UserRequest>, UserRequest>(config);
    //     if (result.status === 200) {
    //         setAuthentication({
    //             ...authentication,
    //             user: {
    //                 userId: result.data.userId,
    //                 username: result.data.username,
    //                 displayName: result.data.displayName,
    //             },
    //         });
    //     }
    // }

    useEffect(() => {
        if (authentication.isAuthenticated && !authentication.user) {
            // fetchUser();
        }
    }, [authentication.isAuthenticated, authentication.user]);

    return (
        <div className="">
            <Header />
            <div className="flex">
                <Navigation />
                <main className="flex-1 bg-sgray-200 px-4 pt-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
