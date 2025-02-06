import React from "react";
import styles from "@/styles/layout/Header.module.css";
import { Logo } from "../common/Logo";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <div>
        <Logo size="small" />
      </div>
      <div className={styles.userSession}>
        <div className={styles.hexagon}>
          <UserIcon className="icon" />
        </div>
        <div className={styles.userDetails}>
          <h4>Marco</h4>
          <span>Administrador</span>
        </div>
        <div>
          <ChevronDownIcon className="icon" />
        </div>
      </div>
    </nav>
  );
};
