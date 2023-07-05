import { RouterProvider } from "react-router-dom";
import { queryClient, router } from "@/lib";
import { AuthContext, AuthenticationContextModel } from "@/context";
// we need AxiosWrapper because of interceptors which need an access to React state (our app state, in case of http:401 to unauthorized user and navigate them to /login)
import { AxiosWrapper } from "@/features/axios-hoc";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
    const [authentication, setAuthentication] = useState<AuthenticationContextModel>({ isAuthenticated: false });

    console.log(import.meta.env.VITE_APP_TITLE);

    return (
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
            <AxiosWrapper>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </AxiosWrapper>
        </AuthContext.Provider>
    );
}
