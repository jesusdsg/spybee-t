"use client";
import React from "react";
import styles from "@/styles/layout/Header.module.css";
import { Logo } from "../common/Logo";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/auth.store";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <nav className={styles.header}>
      <div>
        <Logo size="small" />
      </div>
      <div className={styles.userSession}>
        {isAuthenticated && (
          <div className={styles.hexagon}>
            <UserIcon className="icon" />
          </div>
        )}
        <div className={styles.userDetails}>
          <h4>{isAuthenticated ? "Marco" : "Iniciar sesión"}</h4>
          {isAuthenticated && <span>Administrador</span>}
        </div>
        {isAuthenticated && (
          <div>
            <ChevronDownIcon className="icon" />
          </div>
        )}
      </div>
    </nav>
  );
};
