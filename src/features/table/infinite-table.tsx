import { axiosClient } from "@/lib";
import { Row, SortingState, getCoreRowModel, getSortedRowModel, useReactTable, flexRender, Updater } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ReactComponent as SortIcon } from "@/assets/images/svg/sort.svg";
import { BaseTableRequest, BaseTableResponse, InfiniteTableProps } from "@/features/table";

export function InfiniteTable<T>({ columns, onRowClick }: InfiniteTableProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(25);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingState>([]);

    //we need a reference to the scrolling element for logic down below
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: onCustomSortingChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    async function fetchMerchants() {
        setIsFetching(true);

        const config: AxiosRequestConfig<BaseTableRequest> = {
            method: "GET",
            url: "/merchants",
            params: {
                page: page,
                pageSize: pageSize,
                sortCriteria: sorting.map(x => `${x.desc ? "-" : ""}${x.id}`).join(","),
            },
        };

        const result = await axiosClient.request<BaseTableResponse<T>, AxiosResponse<BaseTableResponse<T>, BaseTableRequest>, BaseTableRequest>(
            config
        );
        if (result.status === 200) {
            setData([...data, ...result.data.data]);
            setTotalCount(result.data.totalCount);
            setPage(page + 1);
            setIsFetching(false);
        }
    }

    // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                //once the user has scrolled within 200px of the bottom of the table, fetch more data if there is any
                if (scrollHeight - scrollTop - clientHeight < 200 && !isFetching && data.length < totalCount) {
                    fetchMerchants();
                }
            }
        },
        [fetchMerchants, isFetching, data.length, totalCount]
    );

    // on sort reset data and page number and start from beginning
    function onCustomSortingChange(updaterOrValue: Updater<SortingState>): void {
        setPage(0);
        setData([]);
        setSorting(updaterOrValue);
    }

    // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    // initial render
    useEffect(() => {
        fetchMerchants();
    }, []);

    const { rows } = table.getRowModel();

    // Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
    // Change to tanstack/react-virtualizer when they get out of beta
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10,
    });
    // virtual items are actuall number of elements rendered. If there is 5000 items, we may have only 100 renderd in our viewport
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
    // we need this padding to have scrollbar in place as we are not rendering all items (we only rendering items in our viewport, but actuall number is much higher) so we need to calculate actual height of container/table
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

    function handleRowClick(row: Row<T>): void {
        if (onRowClick) {
            onRowClick(row.original);
        }
    }

    return (
        <div
            className="mt-5 h-[600px] w-full overflow-auto rounded-lg bg-white shadow-3xl"
            onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
            ref={tableContainerRef}
        >
            <table className="w-full table-fixed border-separate border-spacing-0">
                <thead className="sticky top-0 m-0 bg-white">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th
                                        className="group border-b border-solid border-sgray-800 hover:bg-sgray-600"
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{ width: header.getSize() }}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center overflow-hidden text-ellipsis pb-4 pl-6 pr-2 pt-6 text-left text-sm font-medium text-sgray-700  ${
                                                    header.column.getCanSort() ? "cursor-pointer select-none" : ""
                                                }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <SortIcon
                                                    className={`inline ${
                                                        (header.column.getIsSorted() as boolean)
                                                            ? (header.column.getIsSorted() as string) === "asc"
                                                                ? "visible first:[&>path]:fill-sgray-800 last:[&>path]:fill-sblue-900"
                                                                : "visible first:[&>path]:fill-sblue-900 last:[&>path]:fill-sgray-800"
                                                            : "invisible group-hover:visible"
                                                    }`}
                                                />
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {paddingTop > 0 && (
                        <tr>
                            <td style={{ height: `${paddingTop}px` }} />
                        </tr>
                    )}
                    {virtualRows.map(virtualRow => {
                        const row = rows[virtualRow.index] as Row<T>;

                        return (
                            <tr
                                key={row.id}
                                className="cursor-pointer text-sm even:bg-sgray-100 hover:bg-syellow-500"
                                onClick={() => handleRowClick(row)}
                            >
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td className="pb-4 pl-6 pr-2 pt-4" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    {paddingBottom > 0 && (
                        <tr>
                            <td style={{ height: `${paddingBottom}px` }} />
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
