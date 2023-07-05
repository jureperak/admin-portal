import { ReactComponent as LockIcon } from "@/assets/images/svg/lock-icon.svg";
import { PrimarySolidButton } from "@/components";
import { FormFloatingTextInput } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";

type ConfirmAccountFormModel = {
    name: string;
    password: string;
    confirmPassword: string;
};

export function ConfirmAccount() {
    const schema = yup
        .object({
            name: yup.string().required(),
            password: yup.string().required(),
            confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
        })
        .required();

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, errors },
    } = useForm<ConfirmAccountFormModel>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ConfirmAccountFormModel) => console.log(data);

    return (
        <div className="flex h-screen flex-row flex-wrap content-center justify-center gap-[3rem]">
            <div className="w-full max-w-[32.5rem] flex-1 rounded-[2.5rem] bg-white px-[5rem] py-[3.75rem] shadow-3xl">
                <div className="pb-8 text-[1.875rem] font-[500] text-sblue-900">Set password</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormFloatingTextInput<ConfirmAccountFormModel> label={"Name"} register={register} name={"name"} errors={errors} />

                    <FormFloatingTextInput<ConfirmAccountFormModel>
                        label={"Password"}
                        type="password"
                        register={register}
                        name="password"
                        errors={errors}
                    />

                    <FormFloatingTextInput<ConfirmAccountFormModel>
                        label={"Confirm password"}
                        type="password"
                        register={register}
                        name="confirmPassword"
                        errors={errors}
                    />

                    <div className="mt-12">
                        <PrimarySolidButton text="Submit" type="submit" disabled={!isValid || isSubmitting} />
                    </div>
                </form>
            </div>
            <div className="flex w-full max-w-[32.5rem] flex-1 items-center justify-center rounded-[2.5rem] bg-sblue-900 px-[5rem] py-[3.75rem]">
                <LockIcon />
            </div>
            <DevTool control={control} /> {/* set up the dev tool */}
        </div>
    );
}
