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

interface MobileTableRow {
  id: string;
  content: string | React.ReactNode;
}

interface MobileTableProps {
  headerTitle: string;
  data: MobileTableRow[];
  showCheckbox?: boolean;
  itemsPerPage?: number;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}
