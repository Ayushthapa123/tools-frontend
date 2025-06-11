import { createColumnHelper } from "@tanstack/react-table";
import ReactTable from "./index";

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  // ...more rows
];

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
];

// Optional action buttons (you can pass any ReactNode here)
const actionButtons = (
  <button className="btn btn-sm btn-primary">Add User</button>
);

export default function UsersTable() {
  return (
    <ReactTable
      tableData={sampleData}
      columnData={columns}
      totalRows={sampleData.length}
      isLoading={false}
      actions={actionButtons}
      showImport={false}
      showExport={true}
    />
  );
}
