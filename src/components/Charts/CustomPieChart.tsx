"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./styles/Chart.module.css";
import { useWindow } from "@/hooks/useWindow";

const DEFAULT_COLORS = ["#FF9F0A", "#54CFE9", "#D5A1FD", "#ED62C5", "#38C793"];

type PieChartDataItem = {
  name: string;
  value: number;
  color?: string;
};

interface CustomPieChartProps {
  title: string;
  subtitle?: string;
  data: PieChartDataItem[];
  colors?: string[];
  isLoading?: boolean;
}

function CustomPieChart({
  title,
  subtitle,
  data,
  colors = DEFAULT_COLORS,
  isLoading = false,
}: CustomPieChartProps) {
  const { width } = useWindow();
  if (isLoading) {
    return (
      <div className={styles.chart}>
        <div className={styles.header}>
          <div className={styles.title_container}>
            <div className={`${styles.skeleton} ${styles.skeleton_title}`} />
            {subtitle && (
              <div
                className={`${styles.skeleton} ${styles.skeleton_subtitle}`}
              />
            )}
          </div>
        </div>
        <div className={styles.skeleton_pie_container}>
          <div className={`${styles.skeleton} ${styles.skeleton_pie}`} />
          <div className={styles.skeleton_legend}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`${styles.skeleton} ${styles.skeleton_list_item}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getColor = (item: PieChartDataItem, index: number): string => {
    return item.color || colors[index % colors.length];
  };

  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <div className={styles.title_container}>
          <h3
            className={`${styles.title} ${subtitle ? styles.title_with_subtitle : ""}`}
          >
            {title}
          </h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      <div className={styles.pie_container}>
        <ResponsiveContainer width={width < 768 ? "100%" : "50%"} height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
              cornerRadius={8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry, index)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.pie_legend}>
          {data.map((entry, index) => (
            <div key={index} className={styles.pie_legend_item}>
              <span className={styles.pie_legend_label}>
                {entry.name ?? "--"}
              </span>
              <div className={styles.pie_legend_content}>
                <div
                  className={styles.pie_legend_dot}
                  style={{
                    background: getColor(entry, index),
                  }}
                />
                <span className={styles.pie_legend_value}>
                  {entry.value.toLocaleString() ?? "--"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomPieChart;
