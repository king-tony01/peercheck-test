"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./styles/Chart.module.css";

const green = {
  users: "#8BDB2F",
  reviews: "#9CE94C",
  stroke: "#6BA623",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  const users = Number(item.users ?? 0);
  const reviews = Number(item.reviews ?? 0);
  return (
    <div className={styles.tooltip}>
      {item.highlight
        ? item.highlight
        : `${item.month} – ${users.toLocaleString()} active users • ${reviews.toLocaleString()} reviews`}
    </div>
  );
};

function CurveChart({
  title,
  subtitle,
  data,
  showLegend = true,
  legends = [],
  isLoading = false,
}: {
  title: string;
  subtitle?: string;
  data: {
    month: string;
    users: number;
    reviews: number;
    highlight?: string;
  }[];
  showLegend?: boolean;
  legends?: Array<{ label: string; color: string }>;
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
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={green.users} stopOpacity={0.5} />
              <stop offset="95%" stopColor={green.users} stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="reviewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={green.reviews} stopOpacity={0.45} />
              <stop offset="95%" stopColor={green.reviews} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e8e8e8" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            width={40}
            // tickFormatter={(value) => `${value / 1000}k`}
            ticks={[0, 10, 30, 50, 70, 90, 110]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: green.reviews,
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            name="Total Users"
            stroke={green.stroke}
            strokeWidth={3}
            fill="url(#usersGradient)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#fff",
              stroke: green.stroke,
              strokeWidth: 4,
            }}
          />
          <Area
            type="monotone"
            dataKey="reviews"
            name="Total Reviews"
            stroke={green.reviews}
            strokeWidth={3}
            fill="url(#reviewsGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CurveChart;
