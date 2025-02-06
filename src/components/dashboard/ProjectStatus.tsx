import React from "react";
import styles from "@/styles/dashboard/ProjectStatus.module.css";
interface ProjectStatusProps {
  status: "pending_payment" | "active" | "inactive" | string;
}

export const ProjectStatus: React.FC<ProjectStatusProps> = ({ status }) => {
  let selectedStyleClass = "";
  let selectedTitle = "";
  switch (status) {
    case "active":
      selectedStyleClass = styles.active;
      selectedTitle = "Activo";
      break;
    case "inactive":
      selectedStyleClass = styles.inactive;
      selectedTitle = "Inactivo";
      break;
    case "pending_payment":
      selectedStyleClass = styles.pending;
      selectedTitle = "Pendiente";
      break;
    default:
      selectedStyleClass = styles.active;
      selectedTitle = "Activo";
      break;
  }

  return (
    <div className={styles.badget + " " + selectedStyleClass}>
      {selectedTitle}
    </div>
  );
};
