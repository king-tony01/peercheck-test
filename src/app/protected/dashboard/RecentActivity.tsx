"use client";
import SmartFilter from "@/components/Filter/SmartFilter";
import DropdownInput from "@/components/Input/DropdownInput";
import SearchInput from "@/components/Input/SearchInput";
import DynamicTable from "@/components/Tables/DynamicTable";
import FormatDate from "@/components/date/FormatDate";
import CompaniesIcon from "@/icons/CompaniesIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import styles from "./styles/Dashboard.module.css";
import ActionDropdown from "@/components/Input/ActionDropdown";
import FormatStatus from "@/components/wrappers/FormatStatus";
import UserIcon from "@/icons/UserIcon";
import CheckBox from "@/components/Input/CheckBox";

function RecentActivity({ recentActivityData }: { recentActivityData: any[] }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "User":
        return <UserIcon />;
      case "Company":
        return <CompaniesIcon />;
      case "Review":
        return <ReviewsIcon />;
      default:
        return null;
    }
  };

  const DEFAULT_COLUMNS: TableColumn[] = [
    {
      key: "checkbox",
      //   headerClassName: styles.checkbox_cell,
      //   className: styles.checkbox_cell,
      renderHeader: ({ selectedRows, currentData, toggleAllRows }) => (
        <CheckBox
          checked={
            selectedRows.size === currentData.length && currentData.length > 0
          }
          onChange={toggleAllRows}
        />
      ),
      render: (row, { selectedRows, toggleRowSelection }) => (
        <CheckBox
          checked={selectedRows.has(row.id)}
          onChange={() => toggleRowSelection(row.id)}
        />
      ),
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
      className: styles.description_cell,
    },
    {
      key: "activityType",
      label: "Activity Type",
      sortable: true,
      render: (row) => (
        <div className={styles.activity_type}>
          <div className={styles.activity_icon}>
            {getActivityIcon(row.activityType)}
          </div>
          <span>{row.activityType}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (row) => (
        <FormatDate date={row.date} options={{ short: false }} />
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => <FormatStatus status={row.status} />,
    },
    {
      key: "actions",
      headerClassName: styles.actions_cell,
      className: styles.actions_cell,
      renderHeader: () => null,
      render: () => (
        <ActionDropdown
          type="primary"
          options={[
            {
              label: "View Details",
              value: "view_details",
            },
            {
              label: "Edit Activity",
              value: "edit_activity",
            },
          ]}
        />
      ),
    },
  ];

  const tableData = recentActivityData ?? [];
  return (
    <section className={styles.recent_activity}>
      <div className={styles.header}>
        <h2>RECENT ACTIVITY</h2>
        <div className={styles.controls}>
          <SearchInput placeholder="Search..." />
          <SmartFilter
            onFilterChange={(filters) => {
              console.log("Applied Filters:", filters);
            }}
          />
          <DropdownInput
            type="secondary"
            options={[
              {
                label: "Last 7 days",
                value: "7_days",
              },
              {
                label: "Last 30 days",
                value: "30_days",
              },
            ]}
            position="bottom-right"
          />
        </div>
      </div>
      <DynamicTable columns={DEFAULT_COLUMNS} data={tableData} />
    </section>
  );
}

export default RecentActivity;
