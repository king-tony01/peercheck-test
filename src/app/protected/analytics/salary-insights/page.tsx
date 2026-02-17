"use client";
import Button from "@/components/Button/Button";
import DropdownInput from "@/components/Input/DropdownInput";
import ClipBoardIcon from "@/icons/ClipBoardIcon";
import ExportIcon from "@/icons/ExportIcon";
import ReviewsIcon from "@/icons/ReviewsIcon";
import UsersIcon from "@/icons/UsersIcon";
import PageLayout from "@/layouts/PageLayout/PageLayout";
import React from "react";
import styles from "./styles/SalaryInsight.module.css";
import MetricCard from "@/components/Cards/MetricCard";
import CustomBarChart from "@/components/Charts/BarChart";
import TopContributors from "./TopContributors";
import InfoTriangle from "@/icons/InfoTrangle";
import CustomLineChart from "@/components/Charts/CustomLineChart";
import DynamicTable from "@/components/Tables/DynamicTable";
import FormatCurrency from "@/components/Currency/FormatCurrency";
import CardChart from "@/components/Charts/CardChart";
import { PercentageFormatter } from "@/utils/PercentageFormatter";
import PayGap from "./PayGap";
import RecentSubmission from "./RecentSubmission";

function SalaryInsights() {
  const overviewCards: MetricCard[] = [
    {
      title: "Median Salary Submitted",
      value: 200000,
      icon: <></>,
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
      title: "Total Salary Submissions",
      value: 3480,
      icon: <></>,
      chip: { label: "+312", color: "green" },
      type: "more",
      options: [],
    },
    {
      title: "Companies with Salary Data",
      value: 1345,
      icon: <></>,
      type: "more",
      options: [],
    },
    {
      title: "Roles with Salary Data",
      value: 24903,
      icon: <></>,
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

  const salaryDistributionData = [
    {
      range: 50000,
      entryLevel: 51,
      midLevel: 75,
      senior: 110,
      lead: 156,
    },
    {
      range: 100000,
      entryLevel: 105,
      midLevel: 155,
      senior: 230,
      lead: 315,
    },
    {
      range: 150000,
      entryLevel: 150,
      midLevel: 220,
      senior: 320,
      lead: 410,
    },
    {
      range: 200000,
      entryLevel: 200,
      midLevel: 290,
      senior: 400,
      lead: 520,
    },
    {
      range: 250000,
      entryLevel: 240,
      midLevel: 350,
      senior: 480,
      lead: 600,
    },
    {
      range: 300000,
      entryLevel: 280,
      midLevel: 400,
      senior: 550,
      lead: 680,
    },
    {
      range: 400000,
      entryLevel: 320,
      midLevel: 450,
      senior: 620,
      lead: 750,
    },
  ];

  const cards = [
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#566A23",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#b8d277",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#566A23",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#878786",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#566A23",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#566A23",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#b8d277",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#566A23",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#878786",
    },
    {
      label: "Technology",
      value: PercentageFormatter.format(0.85, { decimals: 0 }),
      color: "#566A23",
    },
  ];

  return (
    <PageLayout
      title="Salary Insights"
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
        <div className={styles.line_chart}>
          <CustomLineChart
            title="Salary Distribution across Roles"
            data={salaryDistributionData}
            series={[
              {
                dataKey: "entryLevel",
                name: "Entry Level",
                color: "#D4E157",
              },
              { dataKey: "midLevel", name: "Mid Level", color: "#9CCC65" },
              { dataKey: "senior", name: "Senior", color: "#66BB6A" },
              { dataKey: "lead", name: "Lead/Principal", color: "#43A047" },
            ]}
            xAxisKey="range"
            yAxisConfig={{
              ticks: [0, 50, 100, 150, 200, 500, 1000],
            }}
            customTooltip={(data) => (
              <>
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                  <FormatCurrency
                    value={data.range}
                    currency="NGN"
                    compact
                    showFraction={false}
                  />
                </div>
                <div>
                  Entry Level ={" "}
                  <FormatCurrency
                    value={data.entryLevel}
                    currency="NGN"
                    compact
                    showFraction={false}
                  />
                </div>
                <div>
                  Mid Level ={" "}
                  <FormatCurrency
                    value={data.midLevel}
                    currency="NGN"
                    compact
                    showFraction={false}
                  />
                </div>
                <div>
                  Senior ={" "}
                  <FormatCurrency
                    value={data.senior}
                    currency="NGN"
                    compact
                    showFraction={false}
                  />
                </div>
                <div>
                  Lead/Principal ={" "}
                  <FormatCurrency
                    value={data.lead}
                    currency="NGN"
                    compact
                    showFraction={false}
                  />
                </div>
              </>
            )}
          />
        </div>
        <section className={styles.ind_role_matrix}>
          <h3> Industry x Role Salary Matrix</h3>
          <DynamicTable
            columns={[
              {
                key: "industryRole",
                label: "Industry/Role",
                sortable: false,
              },
              {
                key: "engineer",
                label: "Engineer",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.engineer.color }}
                  >
                    <FormatCurrency
                      value={row.engineer.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "designer",
                label: "Designer",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.designer.color }}
                  >
                    <FormatCurrency
                      value={row.designer.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "manager",
                label: "Manager",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.manager.color }}
                  >
                    <FormatCurrency
                      value={row.manager.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "hr",
                label: "HR",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.hr.color }}
                  >
                    <FormatCurrency
                      value={row.hr.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "analyst",
                label: "Analyst",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.analyst.color }}
                  >
                    <FormatCurrency
                      value={row.analyst.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "sales",
                label: "Sales",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.sales.color }}
                  >
                    <FormatCurrency
                      value={row.sales.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "finance",
                label: "Finance",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.finance.color }}
                  >
                    <FormatCurrency
                      value={row.finance.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
              {
                key: "media",
                label: "Media",
                sortable: false,
                render: (row) => (
                  <div
                    className={styles.color_label}
                    style={{ background: row.media.color }}
                  >
                    <FormatCurrency
                      value={row.media.value}
                      currency="NGN"
                      showFraction={false}
                      compact
                    />
                  </div>
                ),
              },
            ]}
            data={[
              {
                id: "1",
                industryRole: "Technology",
                engineer: { value: 100000, color: "#CCFC54" },
                designer: { value: 100000, color: "#CCFC54" },
                manager: { value: 100000, color: "#EFFECA" },
                hr: { value: 100000, color: "#EAEAEA" },
                analyst: { value: 100000, color: "#E8FEB0" },
                sales: { value: 100000, color: "#CCFC54" },
                finance: { value: 100000, color: "#CCFC54" },
                media: { value: 100000, color: "#CCFC54" },
              },
              {
                id: "2",
                industryRole: "Finance",
                engineer: { value: 85000, color: "#EFFECA" },
                designer: { value: 72000, color: "#E8FEB0" },
                manager: { value: 160000, color: "#CCFC54" },
                hr: { value: 65000, color: "#EAEAEA" },
                analyst: { value: 120000, color: "#CCFC54" },
                sales: { value: 90000, color: "#EFFECA" },
                finance: { value: 140000, color: "#CCFC54" },
                media: { value: 60000, color: "#E8FEB0" },
              },
              {
                id: "3",
                industryRole: "Healthcare",
                engineer: { value: 78000, color: "#E8FEB0" },
                designer: { value: 65000, color: "#EAEAEA" },
                manager: { value: 145000, color: "#CCFC54" },
                hr: { value: 70000, color: "#EFFECA" },
                analyst: { value: 98000, color: "#EFFECA" },
                sales: { value: 88000, color: "#E8FEB0" },
                finance: { value: 110000, color: "#CCFC54" },
                media: { value: 62000, color: "#EAEAEA" },
              },
              {
                id: "4",
                industryRole: "Education",
                engineer: { value: 60000, color: "#EAEAEA" },
                designer: { value: 52000, color: "#E8FEB0" },
                manager: { value: 105000, color: "#EFFECA" },
                hr: { value: 58000, color: "#EAEAEA" },
                analyst: { value: 82000, color: "#E8FEB0" },
                sales: { value: 76000, color: "#EFFECA" },
                finance: { value: 90000, color: "#CCFC54" },
                media: { value: 50000, color: "#EAEAEA" },
              },
              {
                id: "5",
                industryRole: "Media",
                engineer: { value: 70000, color: "#E8FEB0" },
                designer: { value: 82000, color: "#CCFC54" },
                manager: { value: 120000, color: "#EFFECA" },
                hr: { value: 62000, color: "#EAEAEA" },
                analyst: { value: 88000, color: "#EFFECA" },
                sales: { value: 95000, color: "#CCFC54" },
                finance: { value: 100000, color: "#CCFC54" },
                media: { value: 130000, color: "#CCFC54" },
              },
            ]}
            emptyTitle="No salary matrix data"
            emptyMessage="Industry and role salary matrix will appear here"
          />
        </section>
        <section className={styles.card_chart_section}>
          <CardChart title="Salary Data Coverage by Industry" data={cards} />
        </section>
        <section className={styles.pay_gap_and_submission_section}>
          <PayGap />
          <RecentSubmission />
        </section>
        <TopContributors />
      </div>
    </PageLayout>
  );
}

export default SalaryInsights;
