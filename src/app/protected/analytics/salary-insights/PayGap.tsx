import DropdownInput from "@/components/Input/DropdownInput";
import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./styles/SalaryInsight.module.css";

function PayGap() {
  const data = [
    { category: "Men", value: 80 },
    { category: "Women", value: 65 },
  ];
  return (
    <div className={styles.pay_gap}>
      <h2>Pay Gap Insights</h2>
      <div className={styles.header}>
        <DropdownInput
          type="secondary"
          options={[
            {
              label: "Africa",
              value: "africa",
            },
          ]}
        />
        <DropdownInput
          type="secondary"
          options={[
            {
              label: "Technology",
              value: "technology",
            },
          ]}
        />
        <DropdownInput
          type="secondary"
          options={[
            {
              label: "Company",
              value: "company",
            },
          ]}
        />
        <DropdownInput
          type="secondary"
          options={[
            {
              label: "Software Engineer",
              value: "software_engineer",
            },
          ]}
        />
      </div>
      <div className={styles.chart}>
        <span className={styles.span}>Relative Salary</span>
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine
              tickMargin={12}
              ticks={[]}
            />
            <YAxis
              tickLine={false}
              axisLine
              tickMargin={10}
              width={50}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.category === "Men" ? "#566A23" : "#91B33C"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.legend_container}>
          {data.map((item, index) => (
            <div key={index} className={styles.legend}>
              <div
                className={styles.legend_color}
                style={{
                  background: item.category === "Men" ? "#566A23" : "#91B33C",
                }}
              />
              <span className={styles.legend_label}>{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PayGap;
