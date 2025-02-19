import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { database } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, problemId } = await request.json()

    const user = await database.findUserByEmail(session.user.email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const comment = await database.createComment({
      content,
      problemId,
      userId: user.id,
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error("Comment creation error:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const problemId = searchParams.get("problemId")

  if (!problemId) {
    return NextResponse.json({ error: "Problem ID is required" }, { status: 400 })
  }

  try {
    const comments = await database.findCommentsByProblemId(Number.parseInt(problemId))
    return NextResponse.json(comments)
  } catch (error) {
    console.error("Comments fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

