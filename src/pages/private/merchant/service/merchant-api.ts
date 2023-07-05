import { axiosClient } from "@/lib";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { MerchantRequest, MerchantResponse } from "./merchant-models";

export async function getMerchant(merchantRequest: MerchantRequest): Promise<MerchantResponse | undefined> {
    const config: AxiosRequestConfig<MerchantRequest> = {
        method: "GET",
        url: "/merchants/get-details",
        params: { ...merchantRequest },
    };

    const result = await axiosClient.request<MerchantResponse, AxiosResponse<MerchantResponse, MerchantRequest>, MerchantRequest>(config);
    if (result.status === 200) {
        return result.data;
    }
}
