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

    // Convertir la requête en expression régulière
    // Remplacer * par .* pour la regex et échapper les caractères spéciaux
    const regexPattern = query
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // échapper les caractères spéciaux
      .replace(/\\\*/g, '.*') // remplacer \* par .* (wildcard)
    const regex = new RegExp(`^${regexPattern}$`, 'i')

    // Rechercher les mots qui correspondent au pattern
    const matchingWords = db.words.filter(word => regex.test(word.word))

    // Récupérer les définitions pour chaque mot
    const results = matchingWords.map(word => {
      const mainDefinition = db.findMainDefinitionByWordId(word.id)
      const category = db.categories.find(c => c.id === word.categoryId)
      const difficulty = db.difficulties.find(d => d.id === word.difficultyId)

      return {
        word: word.word,
        definition: mainDefinition?.definition || '',
        category: category?.name || '',
        difficulty: difficulty?.name || '',
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    errorLogger.log(error as Error, "search")
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
