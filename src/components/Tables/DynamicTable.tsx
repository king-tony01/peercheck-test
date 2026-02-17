"use client";

import { useState } from "react";
import styles from "./styles/Table.module.css";
import TableHeaderIcon from "@/icons/TableHeaderIcon";
import DropdownInput from "../Input/DropdownInput";

interface TableColumn {
  key: string;
  label?: string;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
  render?: (
    row: any,
    context: {
      selectedRows: Set<string>;
      toggleRowSelection: (id: string) => void;
    },
  ) => React.ReactNode;
  renderHeader?: (context: {
    selectedRows: Set<string>;
    currentData: any[];
    toggleAllRows: () => void;
  }) => React.ReactNode;
}

interface TableRow {
  id: string;
  [key: string]: any;
}

interface DynamicTableProps {
  columns: TableColumn[];
  data: TableRow[];
  itemsPerPage?: number;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}

function DynamicTable({
  columns,
  data,
  itemsPerPage = 7,
  isLoading = false,
  emptyTitle = "No records yet",
  emptyMessage = "Data will appear here once available",
}: DynamicTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(data.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = data.slice(startIndex, endIndex);

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === currentData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentData.map((row) => row.id)));
    }
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`${styles.page_button} ${i === currentPage ? styles.active : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>,
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          className={`${styles.page_button} ${1 === currentPage ? styles.active : ""}`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>,
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className={styles.page_ellipsis}>
            ...
          </span>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            className={`${styles.page_button} ${i === currentPage ? styles.active : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>,
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className={styles.page_ellipsis}>
            ...
          </span>,
        );
      }

      buttons.push(
        <button
          key={totalPages}
          className={`${styles.page_button} ${totalPages === currentPage ? styles.active : ""}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className={styles.dynamic_table}>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.headerClassName}>
                {column.renderHeader ? (
                  column.renderHeader({
                    selectedRows,
                    currentData,
                    toggleAllRows,
                  })
                ) : (
                  <div
                    className={styles.header_cell}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <span>{column.label}</span>
                    {column.sortable && (
                      <span className={styles.sort_icon}>
                        <TableHeaderIcon />
                      </span>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className={styles.table_row}>
              <td
                className={styles.empty_state_cell}
                colSpan={Math.max(columns.length, 1)}
              >
                <div className={styles.loading_state}>
                  <div className={styles.spinner} />
                  <div className={styles.loading_text}>Loading data...</div>
                </div>
              </td>
            </tr>
          ) : currentData.length === 0 ? (
            <tr className={styles.table_row}>
              <td
                className={styles.empty_state_cell}
                colSpan={Math.max(columns.length, 1)}
              >
                <div className={styles.empty_state}>
                  <svg
                    className={styles.empty_icon}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2M9 2v2h6V2M9 2h6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className={styles.empty_state_title}>{emptyTitle}</div>
                  <div className={styles.empty_state_text}>{emptyMessage}</div>
                </div>
              </td>
            </tr>
          ) : (
            currentData.map((row) => (
              <tr key={row.id} className={styles.table_row}>
                {columns.map((column) => (
                  <td key={column.key} className={column.className}>
                    {column.render
                      ? column.render(row, { selectedRows, toggleRowSelection })
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.page_info}>
            Page {currentPage} of {totalPages}
          </div>
          <div className={styles.pagination_controls}>
            <button
              className={styles.page_button}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className={styles.page_button}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {renderPaginationButtons()}
            <button
              className={styles.page_button}
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              className={styles.page_button}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
          <div className={styles.per_page_select}>
            <DropdownInput
              type="secondary"
              options={[
                {
                  label: "5 / page",
                  value: "5",
                },
                { label: "7 / page", value: "7" },
                { label: "10 / page", value: "10" },
                { label: "20 / page", value: "20" },
                { label: "50 / page", value: "50" },
              ]}
              onSelect={(opt) => setPerPage(Number(opt.value))}
              position="top-right"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DynamicTable;
