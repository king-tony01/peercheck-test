"use client";

import {
  Bar,
  BarChart,
  //   CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  //   YAxis,
  Cell,
  CartesianGrid,
  YAxis,
} from "recharts";
import styles from "./styles/Chart.module.css";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const { category, value } = payload[0].payload;
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e5e5",
        borderRadius: 10,
        padding: "8px 10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        fontSize: 12,
        color: "#222",
        fontWeight: 600,
      }}
    >
      {category}: {value.toLocaleString()} reviews
    </div>
  );
};

function CustomBarChart({
  title,
  subtitle,
  data,
  showLegend = true,
  legends = [],
  showCartesian = false,
  showYAxis = false,
  isLoading = false,
}: {
  title: string;
  subtitle?: string;
  data: { category: string; value: number; color: string }[];
  showLegend?: boolean;
  legends?: Array<{ label: string; color: string }>;
  showCartesian?: boolean;
  showYAxis?: boolean;
  isLoading?: boolean;
}) {
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
        <div className={`${styles.skeleton} ${styles.skeleton_chart}`} />
      </div>
    );
  }

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
        {showLegend && (
          <div className={styles.legend}>
            {legends.map((l, i) => (
              <div key={i} className={styles.legend_item}>
                <div
                  className={styles.legend_dot}
                  style={{ background: l.color }}
                />
                <span className={styles.legend_label}>{l.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          {showCartesian && <CartesianGrid vertical={false} stroke="#f0f0f0" />}
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
          />
          {showYAxis && (
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              width={50}
              tickFormatter={(value) => `${value / 1000}k`}
              ticks={[
                1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
                11000, 12000,
              ]}
            />
          )}
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" radius={[12, 12, 12, 12]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.category}-${index}`}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
