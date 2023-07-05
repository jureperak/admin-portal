import { ColumnDef } from "@tanstack/react-table";

export type BaseTableResponse<T> = {
    data: Array<T>;
    totalCount: number;
};

export type BaseTableRequest = {};

export type InfiniteTableProps<T> = {
    columns: ColumnDef<T>[];
    url: string;
    onRowClick?: (row: T) => void;
};
