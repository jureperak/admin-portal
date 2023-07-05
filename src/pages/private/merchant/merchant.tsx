import { useParams } from "react-router-dom";
import { MerchantRouteParams } from "./service";
import { getMerchant } from "./service";
import { useQuery } from "@tanstack/react-query";
import { ReactComponent as CircleLoader } from "@/assets/images/svg/circle-loader.svg";
import { MerchantDetailsTileRow } from "./components";

export function Merchant() {
    const { merchantId } = useParams<MerchantRouteParams>();

    const {
        isFetching,
        isLoading,
        data: merchantDetails,
    } = useQuery({
        queryKey: ["Merchant", +merchantId!],
        queryFn: () => getMerchant({ merchantId: +merchantId! }),
    });

    return (
        <div className="flex flex-col rounded-xl bg-white p-8 shadow-3xl lg:flex-row">
            <div className="w-full lg:w-1/2">
                <div className="mr-4 flex items-center gap-2 border-b font-medium text-sgray-700">
                    <>Details</>
                    {isFetching && <CircleLoader fill="transparent" stroke="#002649" />}
                </div>

                <div className="flex flex-col gap-3">
                    <div className="mt-3">
                        <MerchantDetailsTileRow
                            label="Merchant status"
                            value={merchantDetails?.merchantStatus.name}
                            activeBackground
                            isLoading={isLoading}
                        />
                    </div>
                    <MerchantDetailsTileRow
                        label="Payment status"
                        value={merchantDetails?.merchantPaymentStatus.name}
                        activeBackground
                        isLoading={isLoading}
                    />
                    <MerchantDetailsTileRow label="SSN" value={merchantDetails?.merchantPaymentStatus.name} isLoading={isLoading} />
                    <MerchantDetailsTileRow label="Legal form type" value={merchantDetails?.legalFormType.name} isLoading={isLoading} />
                    <MerchantDetailsTileRow label="Vat Number" value={merchantDetails?.vatNumber} isLoading={isLoading} />
                    <MerchantDetailsTileRow label="Registration time" value={merchantDetails?.registrationTime} isLoading={isLoading} />
                    <MerchantDetailsTileRow label="Description" value={merchantDetails?.description} isLoading={isLoading} />
                </div>
            </div>
            <div className="ml-0 mt-8 w-full lg:ml-4 lg:mt-0 lg:w-1/2">
                <div className="mr-4 border-b  font-medium text-sgray-700">Notes</div>
            </div>
        </div>
    );
}
