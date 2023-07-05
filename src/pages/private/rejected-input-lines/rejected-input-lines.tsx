import { DangerSolidButton, FloatingTextInput, PrimarySolidButton, PrimaryOutlineButton } from "@/components";
import { ReactComponent as DotsLoader } from "@/assets/images/svg/dots-loader.svg";
import { ReactComponent as CircleLoader } from "@/assets/images/svg/circle-loader.svg";

export function RejectedInputLines() {
    return (
        <div className="flex h-full flex-col gap-2 bg-red-300 p-10">
            <FloatingTextInput label="Filter" />
            <FloatingTextInput />
            <PrimarySolidButton text="Filter" />
            <PrimarySolidButton text="Log in" icon={<DotsLoader fill="white" />} />
            <PrimaryOutlineButton text="Log in" />
            <PrimaryOutlineButton text="Log in" icon={<CircleLoader fill="transparent" stroke="#002649" />} />
            <DangerSolidButton text="Delete" />
            <DangerSolidButton text="Delete" icon={<CircleLoader fill="transparent" stroke="white" />} />
        </div>
    );
}
