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
    <div style={{ backgroundColor: "#d1d1d1" }}>
      <h1>Welcome, {user}</h1>
      <ProjectsList />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
