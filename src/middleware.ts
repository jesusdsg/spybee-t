import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token ", token);

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", req.url));
}

export const config = {
  matcher: ["/dashboard", "/profile", "/dashboard/settings", "/"],
};
