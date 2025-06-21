import { useState } from "react";
import { AxiosResponse } from "axios";
import { PaginationOptions } from "../../interfaces/PaginationInterfaces";

interface CustomTableProps {
  columnTitles: string[];
  count: number;
  getListFn: ({ size, page }: PaginationOptions) => Promise<AxiosResponse<void> | void>;
  children: React.ReactNode;
  loading: boolean;
}

export default function CustomTable({
  columnTitles,
  count,
  getListFn,
  children,
  loading,
}: CustomTableProps) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    getListFn({ size: rowsPerPage, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    getListFn({ size: newLimit, page: 1 });
  };

  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div className="overflow-x-auto rounded-md shadow-md border border-gray-200">
      <table className="min-w-full text-sm text-gray-700 bg-white">
        <thead className="bg-gray-100 text-gray-800 text-[13px] font-medium tracking-wide">
          <tr>
            {columnTitles.map((title, index) => (
              <th
                key={index}
                className="py-3 px-4 border-b border-gray-300 text-center whitespace-nowrap"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm font-normal">
          {children}

          {loading && (
            <tr>
              <td colSpan={columnTitles.length} className="py-12 text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-300 bg-white text-[13px]">
        <div className="flex items-center gap-2">
          <label htmlFor="rows" className="text-gray-600 font-medium">
            Rows per page:
          </label>
          <select
            id="rows"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-blue-600"
          >
            {[5, 10, 25].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <button
            disabled={page === 0}
            onClick={() => handleChangePage(0)}
            className="disabled:text-gray-400"
          >
            ⏮
          </button>
          <button
            disabled={page === 0}
            onClick={() => handleChangePage(page - 1)}
            className="disabled:text-gray-400"
          >
            ◀
          </button>
          <span className="text-sm text-gray-700">
            Page <strong>{page + 1}</strong> of {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => handleChangePage(page + 1)}
            className="disabled:text-gray-400"
          >
            ▶
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => handleChangePage(totalPages - 1)}
            className="disabled:text-gray-400"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
