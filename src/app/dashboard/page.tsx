"use client";
import { ProjectsList } from "@/components/dashboard/ProjectsList";

const Dashboard = () => {
  return (
    <div>
      <div className="project-container">
        <ProjectsList />
      </div>
    </div>
  );
};

export default Dashboard;
