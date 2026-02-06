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

function CompanyInsights() {
  const {
    data: companyInsightsData,
    isLoading,
    isError,
  } = useFetch(API_ROUTES.ANALYTICS_COMPANY_INSIGHTS, {
    onError: (error) => {
      console.error("Dashboard user engagement error:", error);
    },
  });
  console.log("Company insights data:", companyInsightsData);
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

  const reviewCategoryData = [
    { category: "Salary", value: 4200, color: "#E5EBF0" },
    { category: "Institutions", value: 3100, color: "#E5EBF0" },
    { category: "Culture", value: 6200, color: "#E5EBF0" },
    { category: "Interview", value: 200, color: "#E5EBF0" },
    { category: "Interview", value: 2400, color: "#E5EBF0" },
    { category: "Interview", value: 3000, color: "#E5EBF0" },
    { category: "Interview", value: 4400, color: "#E5EBF0" },
    { category: "Interview", value: 9400, color: "#E5EBF0" },
    { category: "Interview", value: 10400, color: "#E5EBF0" },
    { category: "Interview", value: 12400, color: "#E5EBF0" },
    { category: "Interview", value: 2400, color: "#E5EBF0" },
    { category: "Interview", value: 5400, color: "#E5EBF0" },
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
        />,
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
        />,
      ]}
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
              />
            </div>
            <div className={styles.chart}>
              <CustomBarChart
                title="Company Coverage Depth by industry"
                subtitle="(Over 20 reviews per company)"
                data={reviewCategoryData}
                showCartesian
                showYAxis
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
