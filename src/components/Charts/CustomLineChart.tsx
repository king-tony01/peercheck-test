"use client";

import {
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import styles from "./styles/Chart.module.css";

const formatCompactNumber = (value: any) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

interface DataSeries {
  dataKey: string;
  name: string;
  color: string;
  strokeWidth?: number;
}

interface TooltipData {
  [key: string]: any;
}

interface CustomLineChartProps {
  title: string;
  subtitle?: string;
  data: any[];
  series: DataSeries[];
  xAxisKey: string;
  yAxisConfig?: {
    tickFormatter?: (value: any) => string;
    ticks?: number[];
    width?: number;
    label?: string;
  };
  xAxisConfig?: {
    tickFormatter?: (value: any) => string;
    label?: string;
  };
  showLegend?: boolean;
  showDots?: boolean;
  height?: number;
  customTooltip?: (data: TooltipData) => React.ReactNode;
  curveType?: "monotone" | "linear" | "step" | "stepBefore" | "stepAfter";
}

const DefaultTooltip = ({ active, payload, xAxisKey, xTickFormatter }: any) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  const headerValue = xTickFormatter
    ? xTickFormatter(item[xAxisKey])
    : formatCompactNumber(item[xAxisKey]);

  return (
    <div className={styles.tooltip}>
      <div style={{ marginBottom: "8px", fontWeight: 600 }}>{headerValue}</div>
      {payload.map((entry: any, index: number) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: entry.color,
            }}
          />
          <span style={{ fontSize: "13px" }}>
            {entry.name}:{" "}
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

function CustomLineChart({
  title,
  subtitle,
  data,
  series,
  xAxisKey,
  yAxisConfig = {},
  xAxisConfig = {},
  showLegend = true,
  showDots = true,
  height = 360,
  customTooltip,
  curveType = "monotone",
}: CustomLineChartProps) {
  const CustomTooltipWrapper = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    if (customTooltip) {
      return (
        <div className={styles.tooltip}>
          {customTooltip(payload[0].payload)}
        </div>
      );
    }

    return (
      <DefaultTooltip
        active={active}
        payload={payload}
        xAxisKey={xAxisKey}
        xTickFormatter={xAxisConfig.tickFormatter}
      />
    );
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

      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#e8e8e8" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={xAxisConfig.tickFormatter || formatCompactNumber}
            label={
              xAxisConfig.label
                ? {
                    value: xAxisConfig.label,
                    position: "insideBottom",
                    offset: -5,
                  }
                : undefined
            }
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            width={yAxisConfig.width || 40}
            tickFormatter={yAxisConfig.tickFormatter}
            ticks={yAxisConfig.ticks}
            label={
              yAxisConfig.label
                ? {
                    value: yAxisConfig.label,
                    angle: -90,
                    position: "insideLeft",
                  }
                : undefined
            }
          />
          <Tooltip
            content={<CustomTooltipWrapper />}
            cursor={{
              stroke: "#ccc",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          {series.map((s, index) => (
            <Line
              key={index}
              type={curveType}
              dataKey={s.dataKey}
              name={s.name}
              stroke={s.color}
              strokeWidth={s.strokeWidth || 3}
              dot={
                showDots
                  ? {
                      r: 4,
                      fill: s.color,
                      strokeWidth: 0,
                    }
                  : false
              }
              activeDot={
                showDots
                  ? {
                      r: 6,
                      fill: "#fff",
                      stroke: s.color,
                      strokeWidth: 4,
                    }
                  : false
              }
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
      {showLegend && (
        <div className={`${styles.legend} ${styles.line_legend}`}>
          {series.map((s, i) => (
            <div key={i} className={styles.legend_item}>
              <div
                className={styles.legend_dot}
                style={{
                  background: s.color,
                  borderRadius: 0,
                  width: 16,
                  height: 16,
                }}
              />
              <span className={styles.legend_label}>{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomLineChart;
