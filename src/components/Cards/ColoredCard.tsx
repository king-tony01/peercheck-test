import React from "react";
import styles from "./styles/ColoredCard.module.css";

function ColoredCard({ label, value, color }: ColoredCardProps) {
  return (
    <div className={styles.colored_card} style={{ backgroundColor: color }}>
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}

export default ColoredCard;
