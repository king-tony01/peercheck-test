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
import { useEffect, useState } from "react";
import styles from "./styles/Chart.module.css";
import ChevronRight from "@/icons/ChevronRight";

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
  paginated = false,
  yAxisTicks,
  tickFormatter,
}: {
  title: string;
  subtitle?: string;
  data: { category: string; value: number; color: string }[];
  showLegend?: boolean;
  legends?: Array<{ label: string; color: string }>;
  showCartesian?: boolean;
  showYAxis?: boolean;
  isLoading?: boolean;
  paginated?: boolean;
  yAxisTicks?: number[];
  tickFormatter?: (value: number) => string;
}) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = paginated
    ? Math.max(1, Math.ceil(data.length / pageSize))
    : 1;

  useEffect(() => {
    if (!paginated) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [paginated, totalPages]);

  const paginatedData = paginated
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  const getSmartTickFormatter = (ticks?: number[]) => {
    if (!ticks || ticks.length === 0) {
      return (value: number) => value.toString();
    }
    const maxTick = Math.max(...ticks);
    if (maxTick >= 1000000) {
      return (value: number) => `${value / 1000000}M`;
    } else if (maxTick >= 1000) {
      return (value: number) => `${value / 1000}k`;
    }
    return (value: number) => value.toString();
  };
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
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {showLegend ? (
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
          ) : null}
          {paginated ? (
            <div className={styles.pagination_wrapper}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronRight
                  color={currentPage === 1 ? "#0000001A" : "#000"}
                />
              </button>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight
                  color={currentPage === totalPages ? "#0000001A" : "#000"}
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={paginatedData}
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
              tickFormatter={tickFormatter || getSmartTickFormatter(yAxisTicks)}
              ticks={
                yAxisTicks || [
                  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
                  11000, 12000,
                ]
              }
            />
          )}
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" radius={[12, 12, 12, 12]}>
            {paginatedData.map((entry, index) => (
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
