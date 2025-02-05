import React from "react";
import styles from "@/styles/dashboard/ProjectPlan.module.css";
interface ProjectStatusProps {
  plan: "big" | "small" | "premium" | string;
}

export const ProjectPlan: React.FC<ProjectStatusProps> = ({ plan }) => {
  let selectedStyleClass = "";
  let selectedTitle = "";
  switch (plan) {
    case "big":
      selectedStyleClass = styles.big;
      selectedTitle = "Avanzado";
      break;
    case "small":
      selectedStyleClass = styles.small;
      selectedTitle = "Pequeño";
      break;
    case "premium":
      selectedStyleClass = styles.premium;
      selectedTitle = "Premium";
      break;
    default:
      selectedStyleClass = styles.big;
      selectedTitle = "Avanzado";
      break;
  }

  return (
    <div className={styles.badget + " " + selectedStyleClass}>
      {selectedTitle}
    </div>
  );
};
