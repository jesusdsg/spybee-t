"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { Logo } from "@/components/common/Logo";
import { Card } from "@/components/common/Card";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isLoginSuccessful = login(username, password);

    if (isLoginSuccessful) {
      router.push("/dashboard"); // Redirect to a dashboard or home page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auto">
      <Card>
        <Logo size="medium" />
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <Button
            type="submit"
            aria-label="Iniciar sesión"
            aria-description="Iniciar Sesión"
            classType="main"
            onClick={() => handleSubmit}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
