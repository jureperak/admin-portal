import { ReactComponent as LockIcon } from "@/assets/images/svg/lock-icon.svg";
import { PrimarySolidButton } from "@/components";
import { FormFloatingTextInput } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context";
import { ErrorModel, axiosClient } from "@/lib";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useToken } from "@/hooks";
import { LoginFormModel, LoginResponse } from "@/pages";
import { ReactComponent as DotsLoader } from "@/assets/images/svg/dots-loader.svg";

export function Login() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const { setAuthentication } = useContext(AuthContext);
    const { setTokens } = useToken();

    const schema = yup
        .object({
            username: yup.string().email().required(),
            password: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { isValid, isSubmitting, errors },
    } = useForm<LoginFormModel>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormModel) => {
        setErrorMessage(undefined);

        const config: AxiosRequestConfig<LoginFormModel> = {
            method: "POST",
            url: "/account/login",
            data: data,
        };

        try {
            const result = await axiosClient.request<LoginResponse, AxiosResponse<LoginResponse, LoginFormModel>, LoginFormModel>(config);

            if (result.status === 200) {
                setTokens(result.data.token, result.data.refreshToken);

                setAuthentication({ isAuthenticated: true });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError<ErrorModel>(error)) {
                // Access to config, request, and response
                setErrorMessage(error.response?.data.message);
            } else {
                // Just a stock error
            }
        }
    };

    return (
        <div className="flex h-screen flex-row flex-wrap content-center justify-center gap-[3rem]">
            <div className="min-h-[35rem] w-full max-w-[32.5rem] flex-1 rounded-[2.5rem] bg-white px-[5rem] py-[3.75rem] shadow-3xl">
                <div className="pb-8 text-[1.875rem] font-[500] text-sblue-900">Admin Portal</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="pb-8 text-[1rem] font-[500] text-sblue-900">Log in</div>
                    <FormFloatingTextInput<LoginFormModel> label={"Username"} register={register} name={"username"} errors={errors} />
                    <FormFloatingTextInput<LoginFormModel> label={"Password"} type="password" register={register} name="password" errors={errors} />

                    <div className="mb-4 text-red-700">{errorMessage}</div>

                    <Link to={"/forgot-password"} className="underline">
                        Forget your password?
                    </Link>

                    <div className="mt-12">
                        <PrimarySolidButton
                            text="Log in"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            icon={isSubmitting ? <DotsLoader fill="white" /> : undefined}
                        />
                    </div>
                </form>
            </div>
            <div className="flex min-h-[35rem] w-full max-w-[32.5rem] flex-1 items-center justify-center rounded-[2.5rem] bg-sblue-900 px-[5rem] py-[3.75rem]">
                <LockIcon />
            </div>
        </div>
    );
}
