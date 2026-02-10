import React from "react";
import styles from "./styles/Dashboard.module.css";
import CurveChart from "@/components/Charts/CurveChart";
import CustomBarChart from "@/components/Charts/BarChart";

function Charts({
  engagementData,
  isLoading,
}: {
  engagementData?: PulseChartData;
  isLoading: boolean;
}) {
  const reviewCategoryColors = ["#8CD9EB", "#DCBEF4", "#B2E74C", "#EBB463"];

  const reviewCategoryData = (engagementData?.totalReviewsByCategory ?? []).map(
    (item, index) => ({
      category: item.category,
      value: item.count,
      color: reviewCategoryColors[index % reviewCategoryColors.length],
    }),
  );

  return (
    <section className={styles.charts}>
      <div className={styles.chart}>
        <CurveChart
          title="The Pulse of Peercheck"
          subtitle="User Engagement Overview"
          data={engagementData?.pulseData?.data ?? []}
          isLoading={isLoading}
          legends={[
            {
              label: "Total Reviews",
              color: "#BAE54C",
            },
            {
              label: "Total Users",
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
