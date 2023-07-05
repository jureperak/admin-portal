import { useContext, useEffect, ReactNode, useState } from "react";
import { AuthContext } from "@/context";
import { ErrorModel, axiosClient } from "@/lib";
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Mutex } from "async-mutex";
import { useToken } from "@/hooks";
import { ReactComponent as Loader } from "@/assets/images/svg/loader.svg";

type AxiosWrapperProps = {
    children: ReactNode;
};

type RefreshTokenRequest = {};

type RefreshTokenResponse = {
    token: string;
    refreshToken: string;
};

type AuthResponse = {};

// The term "mutex" usually refers to a data structure used to synchronize concurrent processes running on different threads.
// For example, before accessing a non-threadsafe resource, a thread will lock the mutex. This is guaranteed to block the thread
// until no other thread holds a lock on the mutex and thus enforces exclusive access to the resource. Once the operation is
// complete, the thread releases the lock, allowing other threads to acquire a lock and access the resource.
const mutex = new Mutex();

export function AxiosWrapper({ children }: AxiosWrapperProps) {
    const { setAuthentication } = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isLoaderMinTimePassed, setIsLoaderMinTimePassed] = useState(false);

    async function onRequest(config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> {
        // Do something before request is sent

        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();

        const { token } = useToken();

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }

    function onRejectedRequest(error: any) {
        // Do something with request error
        return Promise.reject(error);
    }

    function onResponse(response: AxiosResponse<any, any>): Promise<AxiosResponse<any, any>> {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return Promise.resolve(response);
    }

    async function onRejectedResponse(error: any) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (axios.isAxiosError<ErrorModel>(error)) {
            // Access to config, request, and response
            // Unauthorized -> token expired
            if (error.response?.status === 401) {
                // checking whether the mutex is locked
                if (!mutex.isLocked()) {
                    const release = await mutex.acquire();
                    // call release under all circumstances and handle exceptions accordingly -> that's why finally block
                    try {
                        const { refreshToken, setTokens, removeTokens } = useToken();

                        if (!refreshToken) {
                            removeTokens();
                            setAuthentication({ isAuthenticated: false });
                            // just note: this return will end in finally block with release();
                            return Promise.reject(error);
                        }

                        const config: AxiosRequestConfig<RefreshTokenRequest> = {
                            method: "POST",
                            url: "/account/refresh-token",
                            data: { refreshToken: refreshToken },
                        };

                        const cleanAxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

                        try {
                            const resultRefreshToken = await cleanAxiosInstance.request<
                                RefreshTokenResponse,
                                AxiosResponse<RefreshTokenResponse, RefreshTokenRequest>,
                                RefreshTokenRequest
                            >(config);

                            if (resultRefreshToken.status === 200) {
                                setTokens(resultRefreshToken.data.token, resultRefreshToken.data.refreshToken);
                                return axiosClient(error.config as AxiosRequestConfig);
                            }
                        } catch (error) {
                            // we should log out in case of unsuccessful response when doing refreshToken
                            removeTokens();
                            setAuthentication({ isAuthenticated: false });
                        }
                    } finally {
                        // release must be called once the mutex should be released again.
                        release();
                    }
                }
            }
        } else {
            // Just a stock error
        }

        return Promise.reject(error);
    }

    async function checkAuth() {
        const config: AxiosRequestConfig = {
            method: "GET",
            url: "/account/auth",
        };

        try {
            const result = await axiosClient.request<AuthResponse, AxiosResponse<AuthResponse>>(config);

            if (result.status === 200) {
                setAuthentication({ isAuthenticated: true });
            }
        } finally {
            setIsAuthenticating(false);
        }
    }

    useEffect(() => {
        const requestInterceptors = axiosClient.interceptors.request.use(onRequest, onRejectedRequest);
        const responseInterceptors = axiosClient.interceptors.response.use(onResponse, onRejectedResponse);

        checkAuth();

        setTimeout(() => {
            setIsLoaderMinTimePassed(true);
        }, 1000);

        // not sure about this but it can't hurt
        return () => {
            axiosClient.interceptors.request.eject(requestInterceptors);
            axiosClient.interceptors.response.eject(responseInterceptors);
        };
    }, []);

    // using these two boleans just to show loader on screen. Without it, the screen would just flicker if response is too fast.
    // This way we ensure that loader will be displayed for at least 1sec.
    if (isAuthenticating || !isLoaderMinTimePassed) {
        return (
            <div className="flex h-screen flex-row flex-wrap content-center justify-center">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;
}
