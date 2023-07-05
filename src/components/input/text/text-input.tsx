import { forwardRef } from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    type?: "text" | "password";
    children?: JSX.Element;
    variant: "light-gray" | "white";
    kind: "floating";
    icon?: JSX.Element;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, type = "text", name, disabled, children, variant, kind, icon, ...props }, ref) => {
        const isLabelVisible = !!label;
        const isIconVisible = !!icon;

        return (
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={type}
                    aria-label={label}
                    disabled={disabled}
                    ref={ref}
                    className={`
                        peer block w-full cursor-pointer appearance-none rounded-lg border-0 pl-2 ${isIconVisible ? "pr-10" : "pr-2"} pb-2 pt-4 
                        text-base text-gray-900 focus:border-sgray-500 focus:outline-none focus:ring-0 
                        ${variant === "light-gray" ? "bg-sblue-200" : "bg-white"}
                        ${disabled && "cursor-not-allowed opacity-50"}`}
                    placeholder=" "
                    autoComplete="off"
                    {...props}
                />

                {isLabelVisible && (
                    <label
                        htmlFor="floating_filled"
                        className={`
                            pointer-events-none absolute left-2.5 top-3 z-10 origin-[0] -translate-y-4 
                            scale-75 transform text-base text-gray-500
                            duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
                                disabled ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        {label}
                    </label>
                )}

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3">{icon}</div>

                {children}
            </div>
        );
    }
);
