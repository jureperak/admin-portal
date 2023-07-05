import { Button } from "./button";

type PrimaryOutlineButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    icon?: JSX.Element;
    align?: "left" | "right";
};

export function PrimaryOutlineButton(props: PrimaryOutlineButtonProps) {
    return <Button {...props} kind="outline" variant="primary" />;
}
