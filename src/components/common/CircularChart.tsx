import React from "react";
import styles from "@/styles/CircularChart.module.css";

interface CircularChartProps {
  total: number;
  value: number;
  label: string;
}

const CircularChart: React.FC<CircularChartProps> = ({
  total,
  value,
  label,
}) => {
  const percentage = (value / total) * 100;

  return (
    <div className={styles.circularChartContainer}>
      <h3 className={styles.chartLabel}>{label}</h3>
      <h1 className={styles.chartTotal}>{total}</h1>
      <p className={styles.chartSubtitle}>Total Abiertas</p>
      <div className={styles.progressRing}>
        <div
          className={styles.progressRingInner}
          style={{ "--percentage": percentage } as React.CSSProperties}
        >
          <span className={styles.chartValue}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularChart;
