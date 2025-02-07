import { useDataStore } from "@/store/data.store";
import React from "react";
import styles from "@/styles/dashboard/ProjectProgrammed.module.css";

export const ProjectProgrammed = () => {
  const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const today = new Date();
  const weekFromNow = new Date(today.getTime() + ONE_WEEK_IN_MS);
  const projects = useDataStore((state) => state.projects);
  const incidents = projects?.filter((project) =>
    project.incidents.some((incident) => {
      const limitDate = new Date(incident.limitDate);
      return limitDate >= today && limitDate <= weekFromNow;
    })
  );

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <th>Proyecto</th>
          <th>Item</th>
          <th>Fecha Límite</th>
        </thead>
        <tbody>
          {incidents?.map((incident) => {
            return (
              <tr key={incident._id}>
                <td>{incident.title}</td>
                <td>Incidencia</td>
                <td>
                  <div>
                    {incident.incidents[0]?.limitDate.split("T")[0]}
                    <br />
                    {
                      incident.incidents[0]?.limitDate
                        .split("T")[1]
                        .split(".")[0]
                    }
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
