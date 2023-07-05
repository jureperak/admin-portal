import { forwardRef } from "react";
import { TextInput } from "./text-input";

export type FloatingTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    type?: "text" | "password";
    children?: JSX.Element;
    variant?: "light-gray" | "white";
    icon?: JSX.Element;
};

export const FloatingTextInput = forwardRef<HTMLInputElement, FloatingTextInputProps>(({ variant = "light-gray", ...props }, ref) => {
    return <TextInput {...props} kind="floating" variant={variant} ref={ref} />;
});
