"use client";
import Button from "@/components/Button/Button";
import DropdownInput from "@/components/Input/DropdownInput";
import ClipBoardIcon from "@/icons/ClipBoardIcon";
import ExportIcon from "@/icons/ExportIcon";
import PageLayout from "@/layouts/PageLayout/PageLayout";
import React from "react";
import RecentActivity from "./RecentActivity";
import UsersIcon from "@/icons/UsersIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import styles from "./styles/UserInsights.module.css";
import MetricCard from "@/components/Cards/MetricCard";
import CustomBarChart from "@/components/Charts/BarChart";
import ListChart from "@/components/Charts/ListChart";
import CustomPieChart from "@/components/Charts/CustomPieChart";
import useFetch from "@/hooks/useFetch";
import { API_ROUTES } from "@/routes/apiRoutes";

function UserInsights() {
  const {
    data: userInsightsData,
    isLoading,
    isError,
  } = useFetch<UserInsightsData>(API_ROUTES.ANALYTICS_USERS_INSIGHTS, {
    onError: (error) => {
      console.error("Analytics user insights error:", error);
    },
  });

  const { data: recentActivity, isLoading: isRecentActivityLoading } = useFetch<
    RecentActivtyData[]
  >(API_ROUTES.DASHBOARD_RECENT_ACTIVITY, {
    onError: (error) => {
      console.error("Dashboard recent activity error:", error);
    },
  });

  const hasError = isError;
  const showMetrics = !isLoading && !hasError;

  const formatChangeLabel = (value?: number) => {
    const safeValue = Number(value ?? 0);
    const prefix = safeValue > 0 ? "+" : "";
    return `${prefix}${safeValue}`;
  };

  const getChipColor = (value?: number): "green" | "red" =>
    Number(value ?? 0) >= 0 ? "green" : "red";

  const overviewCards: MetricCard[] = [
    {
      title: "Total Users",
      value: hasError ? "N/A" : (userInsightsData?.totalUsers?.count ?? 0),
      icon: <UsersIcon />,
      chip: showMetrics
        ? {
            label: formatChangeLabel(userInsightsData?.totalUsers?.change),
            color: getChipColor(userInsightsData?.totalUsers?.change),
          }
        : undefined,
      isLoading,
      type: "more",
      options: [
        {
          label: "Explore",
          value: "explore",
        },
      ],
    },
    {
      title: "New Users",
      value: hasError ? "N/A" : (userInsightsData?.newUsers?.count ?? 0),
      icon: <UsersIcon />,
      chip: showMetrics
        ? {
            label: formatChangeLabel(userInsightsData?.newUsers?.change),
            color: getChipColor(userInsightsData?.newUsers?.change),
          }
        : undefined,
      isLoading,
      type: "more",
      options: [],
    },
    {
      title: "Avg Session Duration",
      value: hasError
        ? "N/A"
        : userInsightsData?.avgSessionDuration
          ? `${userInsightsData.avgSessionDuration.duration} ${userInsightsData.avgSessionDuration.unit}`
          : 0,
      icon: <UsersIcon />,
      isLoading,
      type: "more",
      options: [],
    },
    {
      title: "Top City",
      value: hasError
        ? "N/A"
        : userInsightsData?.topCity
          ? `${userInsightsData.topCity.city}, ${userInsightsData.topCity.country}`
          : "",
      icon: <ReviewsIcon />,
      isLoading,
      type: "more",
      options: [],
    },
  ];

  const userGrowthData =
    userInsightsData?.userGrowth.map((item) => ({
      category: item.month,
      value: item.count,
      color: "#E5EBF0",
    })) ?? [];

  const topCities =
    userInsightsData?.topCities.map((city) => ({
      label: city.city,
      value: city.count,
    })) || [];

  const pieColors = ["#FF9F0A", "#54CFE9", "#D5A1FD", "#ED62C5", "#38C793"];

  const topRolesData =
    userInsightsData?.topRoles.map((role, index) => ({
      name: role.name,
      value: role.count,
      color: pieColors[index % pieColors.length],
    })) ?? [];

  const topIndustriesData =
    userInsightsData?.topIndustries.map((industry, index) => ({
      name: industry.name,
      value: industry.count,
      color: pieColors[index % pieColors.length],
    })) ?? [];

  return (
    <PageLayout
      title="Overview"
      rightNodes={
        <DropdownInput
          type="primary"
          options={[
            {
              label: "Weekly",
              value: "weekly",
            },
            {
              label: "Monthly",
              value: "monthly",
            },
            {
              label: "Yearly",
              value: "yearly",
            },
          ]}
          position="bottom-right"
        />
      }
      leftNodes={[
        <Button variant="secondary" key={"1"}>
          <ExportIcon /> <span>Export Data</span>
        </Button>,
        <Button variant="secondary" key={"2"}>
          <ClipBoardIcon /> <span>Create Report</span>
        </Button>,
      ]}
    >
      <div>
        <section className={styles.overview}>
          <div className={styles.cards}>
            {overviewCards.map((card, index) => (
              <MetricCard key={index} {...card} />
            ))}
          </div>
        </section>
        <section className={styles.charts}>
          <div className={styles.chart}>
            <CustomBarChart
              title="User growth"
              subtitle="User Acquisition Overview"
              data={userGrowthData}
              showCartesian
              showYAxis
              isLoading={isLoading}
              yAxisTicks={[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]}
              tickFormatter={(tick) => `${tick / 1000}K`}
            />
          </div>
          <div className={styles.chart}>
            <ListChart
              title="Top 10 cities"
              subtitle="By user distribution"
              data={topCities}
              isLoading={isLoading}
            />
          </div>
        </section>
        <section className={styles.pie_charts}>
          <div className={styles.pie}>
            <CustomPieChart
              title="TOP ROLES"
              subtitle="By user distribution"
              data={topRolesData}
              isLoading={isLoading}
            />
          </div>
          <span className={styles.line}></span>
          <div className={styles.pie}>
            <CustomPieChart
              title="Top industries"
              subtitle="By user distribution"
              data={topIndustriesData}
              isLoading={isLoading}
            />
          </div>
        </section>
        <RecentActivity recentActivityData={recentActivity ?? []} />
      </div>
    </PageLayout>
  );
}

export default UserInsights;
