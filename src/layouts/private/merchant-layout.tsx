import { FloatingTextInput, PrimarySolidButton } from "@/components";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MerchantContext, MerchantContextModel } from "@/context";
import { ReactComponent as SearchIcon } from "@/assets/images/svg/search.svg";

export function MerchantLayout() {
    const [selectedMerchant, setSelectedMerchant] = useState<MerchantContextModel>({});

    useEffect(() => {
        return () => setSelectedMerchant({});
    }, []);

    return (
        <MerchantContext.Provider value={{ selectedMerchant, setSelectedMerchant }}>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="pl-4 text-xl font-medium text-sblue-900">{selectedMerchant.merchant?.name || "Merchants"}</h1>
                <div className="flex flex-row gap-4">
                    <div className="w-60">
                        <FloatingTextInput variant="white" label="Search" icon={<SearchIcon />} />
                    </div>
                    <div className="w-28">
                        <PrimarySolidButton text="Filter" />
                    </div>
                </div>
            </div>

            <Outlet />
        </MerchantContext.Provider>
    );
}
