// import { ColumnDef } from "@tanstack/react-table";
// import { useMemo } from "react";
// import { DisputeModel } from "./dispute-models";
import { PrimarySolidButton } from "@/components";
// import { InfiniteTable } from "@/features/table";

export function Disputes() {
    // const columns = useMemo<ColumnDef<DisputeModel>[]>(
    //     () => [
    //         {
    //             accessorFn: row => row.merchantName,
    //             id: "merchantName",
    //             cell: info => info.getValue(),
    //             header: () => <span>Merchant</span>,
    //         },
    //         {
    //             accessorFn: row => row.contractNumber,
    //             id: "contractNumber",
    //             cell: info => info.getValue(),
    //             header: () => <span>Contract</span>,
    //         },
    //         {
    //             accessorFn: row => row.registrationDate,
    //             id: "registrationDate",
    //             cell: info => info.getValue(),
    //             header: () => <span>Registration Date</span>,
    //         },
    //         {
    //             accessorFn: row => row.purchaseDate,
    //             id: "purchaseDate",
    //             cell: info => info.getValue(),
    //             header: () => <span>Purchase Date</span>,
    //         },
    //         {
    //             accessorFn: row => row.grossAmount,
    //             id: "grossAmount",
    //             cell: info => info.getValue(),
    //             header: () => <span>Gross Amount</span>,
    //         },
    //     ],
    //     []
    // );

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="pl-4 text-xl font-medium text-sblue-900">Disputes</h1>
                <div className="w-28">
                    <PrimarySolidButton text="Filter" />
                </div>
            </div>

            {/* <InfiniteTable columns={columns} url="/disputes" /> */}
        </>
    );
}
