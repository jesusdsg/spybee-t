"use client";
import React, { useState } from "react";
import styles from "@/styles/layout/Header.module.css";
import { Logo } from "../common/Logo";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    setShowMenu(false);
  };

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
            <ChevronDownIcon
              className="icon"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className={styles.menu}>
                <button onClick={() => handleLogout()}>Cerrar sesión</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
