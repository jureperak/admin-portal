import { SkeletonLoader } from "@/components";

type MerchantDetailsTileRowProps = {
    label: string;
    value: string | number | undefined;
    isLoading: boolean;
    activeBackground?: boolean;
};

export function MerchantDetailsTileRow({ label, value, isLoading, activeBackground = false }: MerchantDetailsTileRowProps) {
    return (
        <div className="flex items-center">
            <div className="w-[200px] text-sm font-medium text-sgray-900">{label}</div>
            {!isLoading && (
                <div className={`p-1 text-sm ${activeBackground ? "w-fit rounded-md bg-syellow-400 font-medium text-syellow-300" : ""} `}>
                    {value!}
                </div>
            )}
            {isLoading && <SkeletonLoader />}
        </div>
    );
}
