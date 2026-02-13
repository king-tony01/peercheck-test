"use client";
import Button from "@/components/Button/Button";
import DropdownInput from "@/components/Input/DropdownInput";
import ClipBoardIcon from "@/icons/ClipBoardIcon";
import ExportIcon from "@/icons/ExportIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import UsersIcon from "@/icons/UsersIcon";
import PageLayout from "@/layouts/PageLayout/PageLayout";
import React from "react";
import styles from "./styles/CompanInsights.module.css";
import MetricCard from "@/components/Cards/MetricCard";
import CustomBarChart from "@/components/Charts/BarChart";
import CompanyProfileTraffic from "./CompanyProfileTraffic";
import InfoTriangle from "@/icons/InfoTrangle";
import useFetch from "@/hooks/useFetch";
import { API_ROUTES } from "@/routes/apiRoutes";
import { useWindow } from "@/hooks/useWindow";

function CompanyInsights() {
  const { width } = useWindow();
  const {
    data: reviewVolumeByIndustryData,
    isLoading,
    isError,
  } = useFetch<ReviewVolumeByIndustryData[]>(
    API_ROUTES.ANALYTICS_COMPANY_INSIGHTS_REVIEW_BY_INDUSTRY,
    {
      onError: (error) => {
        console.error("Analytics user insights error:", error);
      },
    },
  );

  const {
    data: coverageDepthData,
    isLoading: isCoverageDepthLoading,
    isError: isCoverageDepthError,
  } = useFetch<CoverageDepthByIndustryData[]>(
    API_ROUTES.ANALYTICS_COMPANY_INSIGHTS_COVERAGE_DEPTH_BY_INDUSTRY,
    {
      onError: (error) => {
        console.error("Dashboard companies engagement error:", error);
      },
    },
  );

  const reviewCategoryData =
    reviewVolumeByIndustryData?.map((item) => ({
      category: item.industry,
      value: item.count,
      color: "#E5EBF0",
    })) || [];

  const coverageDepthCategoryData =
    coverageDepthData?.map((item) => ({
      category: item.industry,
      value: item.count,
      color: "#E5EBF0",
    })) || [];

  const overviewCards: MetricCard[] = [
    {
      title: "Total Companies Indexed",
      value: 36711,
      icon: <UsersIcon />,
      trend: { direction: "down", percentage: 13.5 },
      type: "more",
      options: [
        {
          label: "Explore",
          value: "explore",
        },
      ],
    },
    {
      title: "Total Company Page Visits",
      value: 3681,
      icon: <UsersIcon />,
      chip: { label: "+312", color: "green" },
      type: "more",
      options: [],
    },
    {
      title: "Avg Company Rating",
      value: 3.8,
      icon: <UsersIcon />,
      type: "more",
      options: [],
    },
    {
      title: "Most Reviewed Company",
      value: "Opay",
      icon: <ReviewsIcon />,
      type: "more",
      options: [],
    },
  ];

  const concerData = [
    {
      id: "1",
      severity: "High",
      company: "Polaris Bank",
      info: "Rating dropped 1.2★ in 30 days. 15 reviews cite toxic leadership",
    },
    {
      id: "2",
      severity: "Medium",
      company: "Zenith Bank",
      info: "Increase in negative reviews about salary and benefits",
    },
    {
      id: "3",
      severity: "Low",
      company: "Access Bank",
      info: "Stable review trends with minor concerns about work-life balance",
    },
    {
      id: "4",
      severity: "High",
      company: "GTBank",
      info: "Significant drop in company rating. Multiple reviews mention management issues",
    },
    {
      id: "5",
      severity: "Medium",
      company: "First Bank",
      info: "Rising concerns about career growth opportunities among employees",
    },
    {
      id: "6",
      severity: "Low",
      company: "UBA",
      info: "Overall positive reviews but slight dip in ratings related to workplace culture",
    },
    {
      id: "7",
      severity: "Medium",
      company: "Fidelity Bank",
      info: "Noticeable increase in reviews mentioning workload stress",
    },
    {
      id: "8",
      severity: "High",
      company: "Stanbic IBTC",
      info: "Multiple reports of salary delays and dissatisfaction with benefits",
    },
  ];

  return (
    <PageLayout
      title="Company Insights"
      rightNodes={[
        <DropdownInput
          key={"001"}
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
        />,
        width > 600 ? (
          <DropdownInput
            key={"002"}
            type="primary"
            options={[
              {
                label: "All Industries",
                value: "all_industries",
              },
            ]}
            position="bottom-right"
          />
        ) : null,
        width > 600 ? (
          <DropdownInput
            key={"003"}
            type="primary"
            options={[
              {
                label: "All Locations",
                value: "all_locations",
              },
            ]}
            position="bottom-right"
          />
        ) : null,
      ].filter(Boolean)}
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
          <div className={styles.bar_charts}>
            <div className={styles.chart}>
              <CustomBarChart
                title="Review Volume"
                subtitle="By Industry"
                data={reviewCategoryData}
                showCartesian
                showYAxis
                paginated
                yAxisTicks={[20, 40, 60, 80, 100]}
              />
            </div>
            <div className={styles.chart}>
              <CustomBarChart
                title="Company Coverage Depth by industry"
                subtitle="(Over 20 reviews per company)"
                data={coverageDepthCategoryData}
                showCartesian
                showYAxis
                paginated
                yAxisTicks={[20, 40, 60, 80, 100]}
              />
            </div>
          </div>
          <div className={styles.concern_section}>
            <h2>Emergency Concern Signals</h2>
            {concerData.map((concern) => (
              <div
                key={concern.id}
                className={`${styles.concern_card} ${styles[concern.severity.toLowerCase()]}`}
              >
                <div className={styles.concern_header}>
                  <InfoTriangle
                    color={
                      concern.severity === "High"
                        ? "#AB2A2C"
                        : concern.severity === "Medium"
                          ? "#AB7A2A"
                          : "#525252"
                    }
                  />
                  <h4 className={styles.concern_company}>{concern.company}</h4>
                </div>
                <p className={styles.content}>{concern.info}</p>
              </div>
            ))}
          </div>
        </section>

        <CompanyProfileTraffic />
      </div>
    </PageLayout>
  );
}

export default CompanyInsights;
