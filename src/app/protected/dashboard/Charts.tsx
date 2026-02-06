import React from "react";
import styles from "./styles/Dashboard.module.css";
import CurveChart from "@/components/Charts/CurveChart";
import CustomBarChart from "@/components/Charts/BarChart";

function Charts({
  engagementData,
  isLoading,
}: {
  engagementData: DashboardUserEngagementPoint[];
  isLoading: boolean;
}) {
  const reviewCategoryData = [
    { category: "Salary", value: 4200, color: "#8CD9EB" },
    { category: "Institutions", value: 3100, color: "#DCBEF4" },
    { category: "Culture", value: 6200, color: "#B2E74C" },
    { category: "Interview", value: 2400, color: "#EBB463" },
  ];

  return (
    <section className={styles.charts}>
      <div className={styles.chart}>
        <CurveChart
          title="The Pulse of Peercheck"
          subtitle="User Engagement Overview"
          data={engagementData}
          isLoading={isLoading}
          legends={[
            {
              label: "Total Users",
              color: "#BAE54C",
            },
            {
              label: "Total Reviews",
              color: "#91B33C",
            },
          ]}
        />
      </div>
      <div className={styles.chart}>
        <CustomBarChart
          title="Total Reviews"
          subtitle="By categories"
          data={reviewCategoryData}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

export default Charts;
