import React, { useState } from "react";

interface TableColumn<T> {
  header: string;
  accessor: keyof T; // Corresponds to the property name in the data object
  sortable?: boolean; // Optional: whether the column is sortable
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (sortConfig: SortConfig) => void;
  onSelect?: (selectedRows: (string | number)[]) => void;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  onSort,
  onSelect,
}: DataTableProps<T>) => {
  // State for sorting
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // State for row selection
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  // Sorting handler
  const handleSort = (column: TableColumn<T>) => {
    if (column.sortable) {
      const newSortConfig: SortConfig = {
        key: String(column.accessor),
        direction: sortConfig?.direction === "asc" ? "desc" : "asc",
      };
      setSortConfig(newSortConfig);
      if (onSort) onSort(newSortConfig);
    }
  };

  // Row selection handler
  const handleRowSelect = (id: string | number) => {
    setSelectedRows((prevSelected) => {
      const newSelectedRows = prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id];
      if (onSelect) onSelect(newSelectedRows);
      return newSelectedRows;
    });
  };

  // Select all rows handler
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((item) => item.id);
      setSelectedRows(allRowIds);
    }
    if (onSelect)
      onSelect(
        selectedRows.length === data.length ? [] : data.map((item) => item.id)
      );
  };

  // Sorting the data if sortConfig is present
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortConfig.direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
    });
    return sorted;
  }, [data, sortConfig]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* Checkbox for select all */}
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === data.length}
                onChange={handleSelectAll}
              />
            </th>
            {/* Render columns */}
            {columns.map((column) => (
              <th key={column.header}>
                <button
                  onClick={() => handleSort(column)}
                  disabled={!column.sortable}
                >
                  {column.header}
                  {sortConfig?.key === String(column.accessor) && (
                    <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render rows */}
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                />
              </td>
              {columns.map((column) => (
                <td key={String(column.accessor)}>
                  {String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
