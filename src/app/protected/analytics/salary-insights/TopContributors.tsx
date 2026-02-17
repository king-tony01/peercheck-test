"use client";
import SmartFilter from "@/components/Filter/SmartFilter";
import DropdownInput from "@/components/Input/DropdownInput";
import SearchInput from "@/components/Input/SearchInput";
import DynamicTable from "@/components/Tables/DynamicTable";
import CompaniesIcon from "@/icons/CompaniesIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import styles from "./styles/SalaryInsight.module.css";
import UserIcon from "@/icons/UserIcon";
import { useState } from "react";

function TopContributors() {
  const [activeTab, setActiveTab] = useState("top-roles");
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

  const tabs = [
    { id: "top-roles", label: "Top Roles" },
    { id: "top-companies", label: "Top Companies" },
    { id: "top-industries", label: "Top Industries" },
    { id: "top-regions", label: "Top Regions" },
  ];
  return (
    <section className={styles.top_contributors}>
      <div className={styles.header}>
        <h2>Top Contributors</h2>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab_button} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <DynamicTable
        columns={DEFAULT_COLUMNS}
        data={DEFAULT_DATA}
        emptyTitle="No contributors yet"
        emptyMessage="Top salary contributors will appear here"
      />
    </section>
  );
}

export default TopContributors;
