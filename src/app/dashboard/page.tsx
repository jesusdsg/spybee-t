"use client";
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
      <h1>Welcome, {user}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
