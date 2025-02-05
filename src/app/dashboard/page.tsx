"use client";
import { ProjectsList } from "@/components/dashboard/ProjectsList";
import { useAuthStore } from "@/store/auth.store";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <div className="project-container">
        <ProjectsList />
      </div>
    </div>
  );
};

export default Dashboard;
