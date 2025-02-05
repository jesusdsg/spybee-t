import React, { ReactNode } from "react";
import styles from "@/styles/Card.module.css";

interface CardProps {
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
