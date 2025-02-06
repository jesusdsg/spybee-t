import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { parseCookies, setCookie, destroyCookie } from "nookies";

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (username: string, password: string) => {
        if (username === "user" && password === "password123") {
          set({ user: username, isAuthenticated: true });
          setCookie(null, "token", "your-auth-token", {
            path: "/",
            maxAge: 86400,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        destroyCookie(null, "token");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const cookies = parseCookies();
if (cookies.token) {
  useAuthStore.setState({ isAuthenticated: true, user: "user" });
}
