import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { errorLogger } from "@/lib/error-logger"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Only allow admins to view errors
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const errors = errorLogger.getErrors()
    return NextResponse.json(errors)
  } catch (error) {
    console.error("Error fetching errors:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

