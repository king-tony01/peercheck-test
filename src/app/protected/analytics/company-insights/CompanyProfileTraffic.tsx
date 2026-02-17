"use client";
import SmartFilter from "@/components/Filter/SmartFilter";
import DropdownInput from "@/components/Input/DropdownInput";
import SearchInput from "@/components/Input/SearchInput";
import DynamicTable from "@/components/Tables/DynamicTable";
import FormatDate from "@/components/date/FormatDate";
import CompaniesIcon from "@/icons/CompaniesIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import styles from "./styles/CompanInsights.module.css";
import ActionDropdown from "@/components/Input/ActionDropdown";
import FormatStatus from "@/components/wrappers/FormatStatus";
import UserIcon from "@/icons/UserIcon";
import CheckBox from "@/components/Input/CheckBox";

function CompanyProfileTraffic() {
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
      //   renderHeader: ({ selectedRows, currentData, toggleAllRows }) => (
      //     <CheckBox
      //       checked={
      //         selectedRows.size === currentData.length && currentData.length > 0
      //       }
      //       onChange={toggleAllRows}
      //     />
      //   ),
      //   render: (row, { selectedRows, toggleRowSelection }) => (
      //     <CheckBox
      //       checked={selectedRows.has(row.id)}
      //       onChange={() => toggleRowSelection(row.id)}
      //     />
      //   ),
    },
    {
      key: "company",
      label: "Company",
      sortable: true,
      className: styles.description_cell,
      render: (row) => (
        <div className={styles.activity_type}>
          <div className={styles.activity_icon}>
            {getActivityIcon(row.activityType)}
          </div>
          <span>{row.company}</span>
        </div>
      ),
    },
    {
      key: "industry",
      label: "Industry",
      sortable: true,
      //   render: (row) => (
      //     <div className={styles.activity_type}>
      //       <div className={styles.activity_icon}>
      //         {getActivityIcon(row.activityType)}
      //       </div>
      //       <span>{row.activityType}</span>
      //     </div>
      //   ),
    },
    {
      key: "totalVisits",
      label: "Total Visits",
      sortable: true,
      //   render: (row) => row.totalVisits.toLocaleString(),
    },
    {
      key: "totalReviews",
      label: "Total Reviews",
      sortable: true,
      //   render: (row) => row.totalReviews.toLocaleString(),
    },
    {
      key: "avgDurationPerSession",
      label: "Avg Duration/Session",
      headerClassName: styles.actions_cell,
      className: styles.actions_cell,
      //   renderHeader: () => null,
      //   render: () => (
      //     <ActionDropdown
      //       type="primary"
      //       options={[
      //         {
      //           label: "View Details",
      //           value: "view_details",
      //         },
      //         {
      //           label: "Edit Activity",
      //           value: "edit_activity",
      //         },
      //       ]}
      //     />
      //   ),
    },
  ];

  const DEFAULT_DATA: TableRow[] = [
    {
      id: "1",
      company: "United Bank of Africa",
      industry: "Telecommunication",
      totalVisits: "2000",
      totalReviews: "1000",
      avgDurationPerSession: "00hr:00min:00s",
    },
    {
      id: "2",
      company: "Zenith Bank",
      industry: "Telecommunication",
      totalVisits: "2000",
      totalReviews: "1000",
      avgDurationPerSession: "00hr:00min:00s",
    },
    {
      id: "3",
      company: "Flutterwave",
      industry: "Telecommunication",
      totalVisits: "2000",
      totalReviews: "1000",
      avgDurationPerSession: "00hr:00min:00s",
    },
    {
      id: "4",
      company: "Shuttlers",
      industry: "Telecommunication",
      totalVisits: "2000",
      totalReviews: "1000",
      avgDurationPerSession: "00hr:00min:00s",
    },
    {
      id: "5",
      company: "Opay",
      industry: "Telecommunication",
      totalVisits: "2000",
      totalReviews: "1000",
      avgDurationPerSession: "00hr:00min:00s",
    },
    {
      id: "6",
      company: "Moniepoint",
      industry: "Telecommunication",
      totalVisits: "2000",
      totalReviews: "1000",
      avgDurationPerSession: "00hr:00min:00s",
    },
  ];
  return (
    <section className={styles.company_profile_traffic}>
      <div className={styles.header}>
        <h2>company profile traffic</h2>
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
      <DynamicTable
        columns={DEFAULT_COLUMNS}
        data={DEFAULT_DATA}
        emptyTitle="No profile traffic data"
        emptyMessage="Company profile traffic data will appear here"
      />
    </section>
  );
}

export default CompanyProfileTraffic;
