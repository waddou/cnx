import { db } from "@/lib/data"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    prefix: string
  }
}

export default function PrefixPage({ params }: PageProps) {
  const prefix = decodeURIComponent(params.prefix).toUpperCase()
  
  // Trouver tous les mots qui commencent par le préfixe
  const matchingWords = db.words.filter(word => 
    word.word.toUpperCase().startsWith(prefix)
  ).sort((a, b) => a.word.localeCompare(b.word))

  if (!matchingWords.length) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* En-tête avec navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour à l'accueil
          </Link>
          <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
            Mots commençant par "{prefix}"
          </h1>
          <p className="mt-2 text-gray-600">
            {matchingWords.length} mot{matchingWords.length > 1 ? "s" : ""} trouvé{matchingWords.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Grille de mots */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matchingWords.map((word) => {
            const category = db.categories.find(c => c.id === word.categoryId)
            const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
            
            return (
              <Link
                key={word.id}
                href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {word.word}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category && (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">
                      {category.name}
                    </span>
                  )}
                  {difficulty && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                      {difficulty.name}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}