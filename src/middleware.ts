import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  // Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect to /login if the user is not authenticated
  if (!session?.id) {
    return NextResponse.redirect(new URL("/login/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/dashboard/:path*", '/api/:path*'],
};
