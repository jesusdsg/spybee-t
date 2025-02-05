import { useDataStore } from "@/store/data.store";
import React from "react";
import { ProjectCard } from "./ProjectCard";

export const ProjectsList = () => {
  const projects = useDataStore((state) => state.projects);
  return (
    <div>
      {projects?.map((project) => {
        return <ProjectCard key={project._id} project={project} />;
      })}
    </div>
  );
};
