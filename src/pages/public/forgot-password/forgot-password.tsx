import { ReactComponent as LockIcon } from "@/assets/images/svg/lock-icon.svg";
import { PrimarySolidButton, PrimaryOutlineButton } from "@/components";
import { FormFloatingTextInput } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

type ForgotPasswordFormModel = {
    username: string;
};

export function ForgotPassword() {
    const navigate = useNavigate();

    const schema = yup
        .object({
            username: yup.string().email().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, errors },
    } = useForm<ForgotPasswordFormModel>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ForgotPasswordFormModel) => console.log(data);

    function handleCancel(): void {
        navigate("/login");
    }

    return (
        <div className="flex h-screen flex-row flex-wrap content-center justify-center gap-[3rem]">
            <div className="min-h-[35rem] w-full max-w-[32.5rem] flex-1 rounded-[2.5rem] bg-white px-[5rem] py-[3.75rem] shadow-3xl">
                <div className="pb-8 text-[1.875rem] font-[500] text-sblue-900">Reset password?</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="pb-8 text-[1rem] font-[500] text-sblue-900">
                        Please enter the email of your merchant portal account. You will receive an email with a link to choose a new password.
                    </div>

                    <FormFloatingTextInput<ForgotPasswordFormModel> label={"Username"} register={register} name={"username"} errors={errors} />

                    <div className="mt-12">
                        <PrimarySolidButton text="Reset password" type="submit" disabled={!isValid || isSubmitting} />
                    </div>
                    <div className="mt-2">
                        <PrimaryOutlineButton text="Cancel" type="button" disabled={isSubmitting} onClick={handleCancel} />
                    </div>
                </form>
            </div>
            <div className="flex min-h-[35rem] w-full max-w-[32.5rem] flex-1 items-center justify-center rounded-[2.5rem] bg-sblue-900 px-[5rem] py-[3.75rem]">
                <LockIcon />
            </div>
            <DevTool control={control} /> {/* set up the dev tool */}
        </div>
    );
}
