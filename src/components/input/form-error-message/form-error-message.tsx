import { ErrorMessage } from "@hookform/error-message";
import { DeepMap, FieldError, FieldValues, Path } from "react-hook-form";

export type FormErrorMessageProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
};

export const FormErrorMessage = <TFormValues extends FieldValues>({ errors, name }: FormErrorMessageProps<TFormValues>): JSX.Element => {
    return (
        <div className={`text-xs text-red-700`}>
            <ErrorMessage errors={errors} name={name as any} render={({ message }) => <span>{message}</span>} />
        </div>
    );
};
