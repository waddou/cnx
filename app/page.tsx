import { SearchForm } from "@/components/search-form"
import { db } from "@/lib/data"
import Link from "next/link"

export default function Home() {
  const recentWords = db.findRecentWords(10)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 pt-16">
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Moteur de recherche pour mots croisés et mots fléchés
        </h1>
        <p className="mb-8 text-center text-blue-100">
          Ce moteur est dédié à la recherche de mots spécifiquement pour les mots croisés et les mots fléchés.
          C&apos;est un dictionnaire de mots croisés et de mots fléchés.
        </p>

        <SearchForm />

        {recentWords.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold text-white">Derniers mots consultés</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentWords.map((word) => {
                const category = db.categories.find(c => c.id === word.categoryId)
                const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
                
                return (
                  <Link
                    key={word.id}
                    href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                    className="block bg-white/95 rounded-lg p-4 hover:bg-white/100 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-blue-800 mb-2">{word.word}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {category?.name}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {difficulty?.name}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
