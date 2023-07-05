import { Button } from "./button";

type DangerSolidButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    icon?: JSX.Element;
    align?: "left" | "right";
};

export function DangerSolidButton(props: DangerSolidButtonProps) {
    return <Button {...props} kind="solid" variant="danger" />;
}
