import { MerchantModel } from "@/pages";
import { createContext } from "react";

export type MerchantContextModel = {
    merchant?: MerchantModel;
};

const merchantContext: MerchantContextModel = {
    merchant: undefined,
};

const defaultValue = {
    selectedMerchant: merchantContext,
    setSelectedMerchant: (_: MerchantContextModel) => {},
};

export const MerchantContext = createContext(defaultValue);
