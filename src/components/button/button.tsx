type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    icon?: JSX.Element;
    align?: "left" | "right";
    variant: "primary" | "danger";
    kind: "solid" | "outline" | "text";
};

export function Button({ text, disabled, icon, variant, kind, align = "left", ...props }: PrimaryButtonProps) {
    switch (kind) {
        case "solid":
            return (
                <button
                    className={`
                        w-full rounded-lg 
                        ${variant === "primary" ? "bg-sblue-900 hover:bg-sblue-300" : "hover:bg-sblue-600 bg-sred-500"}
                        py-3 text-base font-medium text-white ${disabled ? "pointer-events-none opacity-50" : ""} 
                        ${icon && "flex items-center justify-center gap-4"}`}
                    {...props}
                >
                    {align === "left" && icon}
                    {text}
                    {align === "right" && icon}
                </button>
            );
        case "outline":
            return (
                <button
                    className={`
                        w-full rounded-lg bg-transparent py-3 text-base font-medium outline outline-1
                        ${variant === "primary" ? "text-sblue-900 outline-sblue-900" : "text-sred-500 outline-sred-600"}
                        transition duration-300 ease-in-out hover:bg-sgray-600
                        ${disabled && "pointer-events-none opacity-50"} 
                        ${icon && "flex items-center justify-center gap-4"}`}
                    {...props}
                >
                    {align === "left" && icon}
                    {text}
                    {align === "right" && icon}
                </button>
            );
        case "text":
            return (
                <button
                    className={`
                        w-full rounded-lg bg-transparent py-3 text-base font-medium
                        ${variant === "primary" ? "text-sblue-900 outline outline-1 outline-sblue-900" : ""}
                        transition duration-300 ease-in-out hover:bg-sgray-600
                        ${disabled && "pointer-events-none opacity-50"} 
                        ${icon && "flex items-center justify-center gap-4"}`}
                    {...props}
                >
                    {align === "left" && icon}
                    {text}
                    {align === "right" && icon}
                </button>
            );
    }
}
