import { Button } from "./button";

type PrimarySolidButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    icon?: JSX.Element;
    align?: "left" | "right";
};

export function PrimarySolidButton(props: PrimarySolidButtonProps) {
    return <Button {...props} kind="solid" variant="primary" />;
}
