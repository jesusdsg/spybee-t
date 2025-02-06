import { User } from "@/store/data.store";
import React from "react";
import styles from "@/styles/dashboard/ProjectTeam.module.css";

interface ProjectTeamProps {
  team: User[];
}

const getInitials = (name: string, lastname: string) => {
  return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
};

const colors = ["#fff5d7", "#ffebaf"];

export const ProjectTeam: React.FC<ProjectTeamProps> = ({ team }) => {
  return (
    <div className={styles.container}>
      {team.slice(0, 2).map((member, index) => (
        <div
          className={styles.hexagon}
          key={index}
          style={{ backgroundColor: colors[index] }}
        >
          {getInitials(member.name, member.lastName)}
        </div>
      ))}
      {team.length > 3 && (
        <div className={styles.hexagon} key="extra">
          +{team.length - 2}
        </div>
      )}
    </div>
  );
};
