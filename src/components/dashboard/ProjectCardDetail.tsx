import React from "react";
import styles from "@/styles/dashboard/ProjectCardDetail.module.css";
import {
  ListBulletIcon,
  Squares2X2Icon,
  MapPinIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export const ProjectCardDetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <FunnelIcon className="icon" />
        <h3>Resumen</h3>
      </div>
      <div className={styles.tabsContainer}>
        <button>General</button>
        <button>Mis actualizaciones</button>
      </div>
    </div>
  );
};
