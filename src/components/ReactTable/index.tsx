//@ts-nocheck
import React, { useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import useTableStore from "../../store/useTableStore";

const TableHeader = ({ headerGroup }: any) => (
  <tr key={headerGroup.id} className="bg-base-300 text-base-content">
    {headerGroup.headers.map((header: any) => (
      <th
        key={header.id}
        onClick={header.column.getToggleSortingHandler()}
        className="cursor-pointer p-2 min-w-[100px]"
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{ asc: " ⬆", desc: " ⬇" }[header.column.getIsSorted() ?? null]}
      </th>
    ))}
  </tr>
);

const RowLoading = ({ colSpan }: { colSpan: number }) => (
  <tr>
    <td colSpan={colSpan} className="text-center py-4">
      Loading...
    </td>
  </tr>
);

const TableContents = ({ table }: { table: any }) => (
  <>
    {table.getRowModel().rows.map((row: any) => (
      <tr key={row.id} className="hover:bg-base-200">
        {row.getVisibleCells().map((cell: any) => (
          <td key={cell.id} className="p-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </>
);

const ReactTable = ({
  tableData,
  columnData = [],
  showImport = true,
  showExport = true,
  isLoading = false,
  showSearch = true,
  paginationVisible = true,
  actions,
  totalRows = 0,
  withBgColor = false,
  extraColumns = [],
  withMinHeight = true,
}: any) => {
  const { 
    pageIndex, 
    pageSize, 
    globalQuery, 
    setGlobalQuery, 
    setPageIndex, 
    setPageSize, 
    setTotalRows 
  } = useTableStore();

  const columnHelper = createColumnHelper();

  const processedExtraColumns = useMemo(
    () =>
      extraColumns?.map((col: any) =>
        columnHelper.accessor(col.id, {
          header: col.header,
          cell: col.cell,
        })
      ),
    [extraColumns]
  );

  const mergedColumns = [...columnData, ...processedExtraColumns];

  const table = useReactTable({
    data: tableData,
    columns: mergedColumns,
    state: {
      globalFilter: globalQuery,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalQuery,
  });

  const handleChangePage = (direction: "prev" | "next") => {
    setPageIndex((prev) => {
      if (direction === "prev") return Math.max(0, prev - 1);
      if (direction === "next")
        return Math.min(Math.ceil(totalRows / pageSize) - 1, prev + 1);
      return prev;
    });
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  };

  useEffect(() => {
    setTotalRows(totalRows);
    return () => {
      setGlobalQuery("");
    };
  }, [totalRows]);

  return (
    <div className={`card bg-base-100 shadow-md ${withMinHeight ? "min-h-[80vh]" : ""}`}>
      <div className="card-body space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {showSearch && (
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Search..."
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
            />
          )}
          <div className="flex items-center gap-2">
            {showImport && <button className="btn btn-outline btn-sm">Import</button>}
            {showExport && <button className="btn btn-outline btn-sm">Export</button>}
            {actions}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>{table.getHeaderGroups().map((hg) => <TableHeader key={hg.id} headerGroup={hg} />)}</thead>
            <tbody>
              {isLoading ? (
                <RowLoading colSpan={table.getHeaderGroups()[0]?.headers.length ?? 1} />
              ) : (
                <TableContents table={table} />
              )}
            </tbody>
          </table>
        </div>

        {paginationVisible && (
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2">
              <button className="btn btn-sm" onClick={() => handleChangePage("prev")} disabled={pageIndex === 0}>
                Previous
              </button>
              <span>
                Page {pageIndex + 1} of {Math.ceil(totalRows / pageSize)}
              </span>
              <button
                className="btn btn-sm"
                onClick={() => handleChangePage("next")}
                disabled={pageIndex + 1 >= Math.ceil(totalRows / pageSize)}
              >
                Next
              </button>
            </div>
            <div>
              <select
                className="select select-bordered select-sm"
                value={pageSize}
                onChange={handleChangeRowsPerPage}
              >
                {[10, 20, 30, totalRows].filter(Boolean).sort((a, b) => a - b).map((val) => (
                  <option key={val} value={val}>
                    Show {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactTable;
