import { axiosClient } from "@/lib";
import { Row, SortingState, getCoreRowModel, getSortedRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ReactComponent as SortIcon } from "@/assets/images/svg/sort.svg";
import { BaseTableRequest, BaseTableResponse, InfiniteTableProps } from "@/features/table";
import { useInfiniteQuery } from "@tanstack/react-query";
// import { CircleLoader } from "@/components";
import { ReactComponent as CircleLoader } from "@/assets/images/svg/circle-loader.svg";

const fetchSize = 25;

export function InfiniteTableQuery<T>({ columns, url, onRowClick }: InfiniteTableProps<T>) {
    //we need a reference to the scrolling element for logic down below
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const [sorting, setSorting] = useState<SortingState>([]);

    //react-query has an useInfiniteQuery hook just for this situation!
    const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<BaseTableResponse<T>>({
        queryKey: ["table-data", url, sorting], //adding sorting state as key causes table to reset and fetch from new beginning upon sort
        queryFn: async ({ pageParam = 0 }) => {
            const config: AxiosRequestConfig<BaseTableRequest> = {
                method: "GET",
                url: url,
                params: {
                    page: pageParam,
                    pageSize: fetchSize,
                    sortCriteria: sorting.map(x => `${x.desc ? "-" : ""}${x.id}`).join(","),
                },
            };

            const fetchedData = await axiosClient.request<
                BaseTableResponse<T>,
                AxiosResponse<BaseTableResponse<T>, BaseTableRequest>,
                BaseTableRequest
            >(config);
            return fetchedData.data;
        },
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    //we must flatten the array of arrays from the useInfiniteQuery hook
    const flatData = useMemo(() => data?.pages?.flatMap(page => page.data) ?? [], [data]);
    const totalDBRowCount = data?.pages?.[0]?.totalCount ?? 0;
    const totalFetched = flatData.length;

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
                if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching && totalFetched < totalDBRowCount) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    );

    //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const table = useReactTable({
        data: flatData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const { rows } = table.getRowModel();

    //Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10,
    });
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

    function handleRowClick(row: Row<T>): void {
        if (onRowClick) {
            onRowClick(row.original);
        }
    }

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <div className="rounded-lg shadow-3xl">
            <div
                className="mt-5 h-[calc(100vh-250px)] w-full overflow-auto rounded-t-lg bg-white"
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
                                    className={`text-sm even:bg-sgray-100 hover:bg-syellow-500 ${onRowClick ? "cursor-pointer" : ""}`}
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
            <div className="flex w-full justify-between rounded-b-lg border-t border-solid border-sgray-800 bg-white pb-4 pl-6 pr-6 pt-4">
                <div>Export</div>
                <div className="flex items-center gap-3">
                    {isFetching && <CircleLoader fill="transparent" stroke="#002649" />}
                    <div>Total count: {totalDBRowCount}</div>
                </div>
            </div>
        </div>
    );
}
