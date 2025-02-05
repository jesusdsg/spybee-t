import React from "react";
import styles from "@/styles/layout/Header.module.css";
import { Logo } from "../common/Logo";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <div>
        <Logo size="small" />
      </div>
    </nav>
  );
};
