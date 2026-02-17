"use client";
import SmartFilter from "@/components/Filter/SmartFilter";
import DropdownInput from "@/components/Input/DropdownInput";
import SearchInput from "@/components/Input/SearchInput";
import DynamicTable from "@/components/Tables/DynamicTable";
import FormatDate from "@/components/date/FormatDate";
import CompaniesIcon from "@/icons/CompaniesIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import styles from "./styles/UserInsights.module.css";
import ActionDropdown from "@/components/Input/ActionDropdown";
import FormatStatus from "@/components/wrappers/FormatStatus";
import UserIcon from "@/icons/UserIcon";
import CheckBox from "@/components/Input/CheckBox";
import { useWindow } from "@/hooks/useWindow";
import MobileTable from "@/components/Tables/MobileTable";

function RecentActivity({
  recentActivityData,
}: {
  recentActivityData: RecentActivtyData[];
}) {
  const { width } = useWindow();
  const getActivityIcon = (type: string) => {
    if (type.toLowerCase().includes("review")) {
      return <ReviewsIcon />;
    }
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
      key: "logName",
      label: "Activity Type",
      sortable: true,
      render: (row) => (
        <div className={styles.activity_type}>
          <div className={styles.activity_icon}>
            {getActivityIcon(row.logName)}
          </div>
          <span>{row.logName}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (row) => (
        <FormatDate date={row.created_at} options={{ short: false }} />
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

  const DEFAULT_DATA: TableRow[] = [
    {
      id: "1",
      description: "New user registered - me@gmail.com",
      activityType: "User",
      date: "18 October, 2025",
      status: "Completed",
    },
    {
      id: "2",
      description: "Company 'Tech360' submitted for verification",
      activityType: "Company",
      date: "18 October, 2025",
      status: "Pending",
    },
    {
      id: "3",
      description: "New salary review posted for Flutterwave",
      activityType: "Review",
      date: "18 October, 2025",
      status: "Approved",
    },
    {
      id: "4",
      description: "New salary review posted for Flutterwave",
      activityType: "Review",
      date: "18 October, 2025",
      status: "Approved",
    },
    {
      id: "5",
      description: "New salary review posted for Flutterwave",
      activityType: "Review",
      date: "18 October, 2025",
      status: "Approved",
    },
    {
      id: "6",
      description: "New salary review posted for Flutterwave",
      activityType: "Review",
      date: "18 October, 2025",
      status: "Approved",
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
      {width <= 768 ? (
        <MobileTable
          headerTitle="Description"
          showCheckbox={true}
          emptyTitle="No activity yet"
          emptyMessage="Recent user activity will appear here"
          data={tableData.map((row) => ({
            id: row.id,
            content: (
              <div className={styles.mobile_activity_item}>
                <div className={styles.first_row}>
                  <p>{row.description}</p>
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
                </div>
                <div className={styles.second_row}>
                  <FormatDate
                    date={row.created_at}
                    options={{ short: false }}
                  />
                  {/* <FormatStatus status={row.status} /> */}
                </div>
              </div>
            ),
          }))}
        />
      ) : (
        <DynamicTable
          columns={DEFAULT_COLUMNS}
          data={tableData}
          emptyTitle="No activity yet"
          emptyMessage="Recent user activity will appear here"
        />
      )}
    </section>
  );
}

export default RecentActivity;
