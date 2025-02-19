import { NextResponse } from "next/server"
import { db } from "@/lib/data"
import { errorLogger } from "@/lib/error-logger"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      const error = new Error("Query parameter is required")
      errorLogger.log(error, "search")
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Use the database findWords function
    const words = db.findWords(query)

    // Map the words to match the SearchResult interface
    const results = words.map((word) => ({
      word: word.word,
      definition: word.definition,
    }))

    return NextResponse.json(results)
  } catch (error) {
    errorLogger.log(error as Error, "search")
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}

