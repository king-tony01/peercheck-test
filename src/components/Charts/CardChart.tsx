import React from "react";
import ColoredCard from "../Cards/ColoredCard";
import styles from "./styles/Chart.module.css";

function CardChart({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle?: string;
  data: Array<{ label: string; value: number | string; color?: string }>;
}) {
  return (
    <section className={styles.card_chart}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div className={styles.cards}>
        {data.map((item, index) => (
          <ColoredCard
            key={index}
            label={item.label}
            value={item.value}
            color={item.color ?? ""}
          />
        ))}
      </div>
    </section>
  );
}

export default CardChart;
