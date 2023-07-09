// import { ColumnDef } from "@tanstack/react-table";
import { useContext, useEffect } from "react";
// import { MerchantModel } from "@/pages";
// import { InfiniteTableQuery } from "@/features/table";
// import { useNavigate } from "react-router-dom";
// import { PATHS } from "@/lib";
import { MerchantContext } from "@/context";

export function Merchants() {
    // const navigate = useNavigate();
    const { setSelectedMerchant } = useContext(MerchantContext);

    useEffect(() => {
        setSelectedMerchant({});
    }, []);

    // const columns = useMemo<ColumnDef<MerchantModel>[]>(
    //     () => [
    //         {
    //             accessorFn: row => row.id,
    //             id: "id",
    //             cell: info => info.getValue(),
    //             header: () => <span>Id</span>,
    //         },
    //         {
    //             accessorFn: row => row.name,
    //             id: "name",
    //             cell: info => info.getValue(),
    //             header: () => <span>Name</span>,
    //         },
    //         {
    //             accessorFn: row => row.ssn,
    //             id: "ssn",
    //             cell: info => info.getValue(),
    //             header: () => <span>SSN</span>,
    //         },

    //         {
    //             accessorFn: row => row.createdTime,
    //             id: "createdTime",
    //             cell: info => info.getValue(),
    //             header: () => <span>Created</span>,
    //         },
    //     ],
    //     []
    // );

    return (
        <>
            {/* <InfiniteTableQuery
                columns={columns}
                url="/merchants"
                onRowClick={merchant => {
                    setSelectedMerchant({ merchant });
                    navigate(PATHS.MERCHANT.replace(":merchantId", merchant.id.toString()));
                }}
            /> */}
        </>
    );
}
