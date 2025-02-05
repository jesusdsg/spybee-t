import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { parseCookies } from "nookies";
import { useAuthStore } from "@/store/auth.store";

export async function middleware(req: NextRequest) {
  const { isAuthenticated } = useAuthStore.getState();
  const cookies = parseCookies({ req });
  const token = cookies.token;

  if (!isAuthenticated && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard", "/profile", "/dashboard/settings"],
};
