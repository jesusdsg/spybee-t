import React, { useEffect } from "react";
import styles from "@/styles/dashboard/ProjectCardDetail.module.css";
import {
  FunnelIcon,
  PresentationChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import CircularChart from "../common/CircularChart";
import { useDataStore } from "@/store/data.store";
import { ProjectProgrammed } from "./ProjectProgrammed";

export const ProjectCardDetail = () => {
  const selectedProject = useDataStore((state) => state.selectedProject);

  useEffect(() => {}, [selectedProject]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <PresentationChartBarIcon className="icon" />
        <h3>Resumen</h3>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.tabsContainer}>
          <button>General</button>
          <button>Mis actualizaciones</button>
        </div>
        <div className={styles.filter}>
          <FunnelIcon className="icon" />
          <a>Filtros</a>
        </div>
      </div>
      <div className={styles.time}>
        <h4>
          <ClockIcon className="icon" /> Próximos a vencer
        </h4>
        <a>Ver todos</a>
      </div>
      <div className={styles.chartContainer}>
        <CircularChart
          total={60}
          value={selectedProject?.incidents ?? 0}
          label="Incidencias"
        />
        <CircularChart
          total={50}
          value={selectedProject?.rfis ?? 0}
          label="RFI"
        />
        <CircularChart
          total={120}
          value={selectedProject?.tasks ?? 0}
          label="Tareas"
        />
      </div>
      <ProjectProgrammed />
    </div>
  );
};
