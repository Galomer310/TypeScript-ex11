import DataTable from "./DataTable";

const Table = () => {
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 22 },
  ];

  const columns = [
    { header: "Name", accessor: "name", sortable: true },
    { header: "Age", accessor: "age", sortable: true },
  ];

  const handleSort = (sortConfig: {
    key: string;
    direction: "asc" | "desc";
  }) => {
    console.log("Sorting by", sortConfig.key, sortConfig.direction);
  };

  const handleSelect = (selectedRows: (string | number)[]) => {
    console.log("Selected rows:", selectedRows);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      onSort={handleSort}
      onSelect={handleSelect}
    />
  );
};

export default Table;
