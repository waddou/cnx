import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")
    const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard")

    console.log('Debug Info:', {
      token,
      url: req.nextUrl.pathname,
      role: token?.role
    })

    // Redirect authenticated users from login page to dashboard
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Redirect non-admin users from dashboard
    if (isAdminRoute && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public access to login page
        if (req.nextUrl.pathname.startsWith("/login")) {
          return true
        }
        // Require admin role for dashboard
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return token?.role === "ADMIN"
        }
        // Require authentication for other protected routes
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
}