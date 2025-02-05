import { Project } from "@/store/data.store";
import React from "react";
import styles from "@/styles/dashboard/ProjectCard.module.css";
import Image from "next/image";
import { formatISODateLong } from "@/utils/date";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectPlan } from "./ProjectPlan";
import { ProjectTeam } from "./ProjectTeam";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={styles.container}>
      <div>
        {project.img.includes("xxx") ? (
          <div className={styles.noImg}></div>
        ) : (
          <Image
            src={project.img}
            className={styles.img}
            width={60}
            height={60}
            objectFit="contain"
            alt="Project Image"
          />
        )}
      </div>
      <div className={styles.titleContainer}>
        <h4 className={styles.titleContainer}>{project.title}</h4>
        <span className={styles.date}>
          {formatISODateLong(project.createdAt)}
        </span>
      </div>
      <ProjectPlan plan={project.projectPlanData.plan} />
      <ProjectStatus status={project.status} />
      <ProjectTeam team={project.users} />
      <div className="detail-box">
        <h4>{project.incidents.length}</h4>
        <span>Incidentes</span>
      </div>
      <div className="detail-box">
        <h4>
          {project.incidents.filter((element) => element.item == "RFI").length}
        </h4>
        <span>RFI</span>
      </div>
      <div className="detail-box">
        <h4>
          {project.incidents.filter((element) => element.item == "task").length}
        </h4>
        <span>Tareas</span>
      </div>
    </div>
  );
};
