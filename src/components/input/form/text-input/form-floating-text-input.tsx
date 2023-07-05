import { FloatingTextInput, FormErrorMessage } from "@/components";
import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path, FieldValues } from "react-hook-form";
import { FloatingTextInputProps } from "@/components";
import { get } from "lodash";

type FormFloatingTextInputProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    rules?: RegisterOptions;
    register?: UseFormRegister<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<FloatingTextInputProps, "name">;

export const FormFloatingTextInput = <TFormValues extends FieldValues>({
    name,
    register,
    rules,
    errors,
    type = "text",
    variant = "light-gray",
    ...props
}: FormFloatingTextInputProps<TFormValues>): JSX.Element => {
    // // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={`${hasError ? "" : "pb-4"}`}>
            <FloatingTextInput type={type} name={name} variant={variant} {...props} {...(register && register(name, rules))}>
                <FormErrorMessage errors={errors} name={name} />
            </FloatingTextInput>
        </div>
    );
};
