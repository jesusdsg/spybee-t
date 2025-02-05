import { create } from "zustand";
import { parseCookies } from "nookies";

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  (set: (arg0: { user: string | null; isAuthenticated: boolean }) => void) => ({
    user: null,
    isAuthenticated: false,
    login: (username: string, password: string) => {
      if (username === "user" && password === "password123") {
        set({ user: username, isAuthenticated: true });
        //set the cookie for more realism xd
        return true;
      }
      return false;
    },
    logout: () => set({ user: null, isAuthenticated: false }),
  })
);

const cookies = parseCookies();
if (cookies.token) {
  useAuthStore.setState({ isAuthenticated: true, user: "user" });
}
