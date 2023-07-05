import { ReactComponent as LogoIcon } from "@/assets/images/svg/logo.svg";
import { GlobalSelect } from "@/features/global-select";

export function Header() {
    return (
        <header className="flex h-20 w-full items-center justify-start border-b border-sgray-500">
            <LogoIcon className="ml-8" />
            <span className="ml-8 text-xl font-medium text-sblue-900">Admin Portal</span>
            <div className="min-w-[23rem] pl-14">
                <GlobalSelect />
            </div>
        </header>
    );
}
