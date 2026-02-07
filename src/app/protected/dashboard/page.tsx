"use client";

import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { API_ROUTES } from "@/routes/apiRoutes";
import Charts from "./Charts";
import RecentActivity from "./RecentActivity";
import PageLayout from "@/layouts/PageLayout/PageLayout";
import styles from "./styles/Dashboard.module.css";
import DropdownInput from "@/components/Input/DropdownInput";
import Button from "@/components/Button/Button";
import ExportIcon from "@/icons/ExportIcon";
import ClipBoardIcon from "@/icons/ClipBoardIcon";
import CompaniesIcon from "@/icons/CompaniesIcon";
import InstitutionsIcon from "@/icons/InstitutionsIcon";
import UsersIcon from "@/icons/UsersIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import MetricCard from "@/components/Cards/MetricCard";

function Dashboard() {
  const {
    data: overviewData,
    isLoading,
    isError,
  } = useFetch<OverviewMetricCards>(API_ROUTES.DASHBOARD_OVERVIEW, {
    onError: (error) => {
      console.error("Dashboard overview error:", error);
    },
  });

  const { data: engagementData, isLoading: isEngagementLoading } = useFetch<
    DashboardUserEngagementPoint[]
  >(API_ROUTES.DASHBOARD_USER_ENGAGEMENT_CHART, {
    onError: (error) => {
      console.error("Dashboard user engagement error:", error);
    },
  });

  const formatChangeLabel = (value?: number) => {
    const safeValue = Number(value ?? 0);
    const prefix = safeValue > 0 ? "+" : "";
    return `${prefix}${safeValue}`;
  };

  const getChipColor = (value?: number): "green" | "red" =>
    Number(value ?? 0) >= 0 ? "green" : "red";

  const hasError = isError;
  const showMetrics = !isLoading && !hasError;

  const overviewCards: MetricCard[] = [
    {
      title: "All Companies",
      value: hasError ? "N/A" : (overviewData?.allCompanies?.count ?? 0),
      icon: <CompaniesIcon />,
      chip: showMetrics
        ? {
            label: formatChangeLabel(overviewData?.allCompanies?.change),
            color: getChipColor(overviewData?.allCompanies?.change),
          }
        : undefined,
      isLoading,
      type: "link",
      path: "/admin/companies",
    },
    {
      title: "All Institutions",
      value: hasError ? "N/A" : (overviewData?.allInstitutions?.count ?? 0),
      icon: <InstitutionsIcon />,
      chip: showMetrics
        ? {
            label: formatChangeLabel(overviewData?.allInstitutions?.change),
            color: getChipColor(overviewData?.allInstitutions?.change),
          }
        : undefined,
      isLoading,
      type: "link",
      path: "/admin/institutions",
    },
    {
      title: "Total Users",
      value: hasError ? "N/A" : (overviewData?.totalUsers?.count ?? 0),
      icon: <UsersIcon />,
      trend: showMetrics
        ? {
            direction:
              (overviewData?.totalUsers?.change ?? 0) >= 0 ? "up" : "down",
            percentage: Math.abs(overviewData?.totalUsers?.change ?? 0),
          }
        : undefined,
      isLoading,
      type: "link",
      path: "/admin/analytics/user-insights",
    },
    {
      title: "Total Reviews Submitted",
      value: hasError
        ? "N/A"
        : (overviewData?.totalReviewsSubmitted?.count ?? 0),
      icon: <ReviewsIcon />,
      trend: showMetrics
        ? {
            direction:
              (overviewData?.totalReviewsSubmitted?.change ?? 0) >= 0
                ? "up"
                : "down",
            percentage: Math.abs(
              overviewData?.totalReviewsSubmitted?.change ?? 0,
            ),
          }
        : undefined,
      isLoading,
      type: "link",
      path: "/admin/reviews",
    },
  ];
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
        <Button
          variant="secondary"
          key={"1"}
          overrideStyles={{ width: "100%" }}
          size="medium"
        >
          <ExportIcon /> <span>Export Data</span>
        </Button>,
        <Button
          variant="secondary"
          key={"2"}
          overrideStyles={{ width: "100%" }}
          size="medium"
        >
          <ClipBoardIcon /> <span>Create Report</span>
        </Button>,
      ]}
    >
      <section className={styles.overview}>
        <div className={styles.cards}>
          {overviewCards.map((card, index) => (
            <MetricCard key={index} {...card} />
          ))}
        </div>
      </section>
      <Charts
        engagementData={engagementData ?? []}
        isLoading={isEngagementLoading}
      />
      <RecentActivity />
    </PageLayout>
  );
}

export default Dashboard;
