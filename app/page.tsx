import { SearchForm } from "@/components/search-form"
import { db } from "@/lib/data"
import Link from "next/link"

export default function Home() {
  const recentWords = db.findRecentWords(10)

  const definitionCounts = db.crosswordDefinitions.reduce((acc, def) => {
    acc[def.definition] = (acc[def.definition] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const popularDefinitions = Object.entries(definitionCounts)
    .filter(([_, count]) => count > 3)
    .map(([definition]) => definition)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in text-center">
            <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              Trouvez le mot parfait
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Notre moteur de recherche intelligent vous aide à résoudre vos grilles de mots croisés et mots fléchés en quelques clics.
            </p>
          </div>

          <div className="animate-fade-in-up">
            <SearchForm />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Popular Definitions Section */}
          {popularDefinitions.length > 0 && (
            <section className="animate-slide-in-left rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Définitions populaires
              </h2>
              <div className="grid gap-4">
                {popularDefinitions.map((definition) => (
                  <Link
                    key={definition}
                    href={`/definition/${encodeURIComponent(definition.replace(/ /g, '*'))}`}
                    className="group rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      {definition}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {definitionCounts[definition]} solutions disponibles
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Recent Words Section */}
          {recentWords.length > 0 && (
            <section className="animate-slide-in-right rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Dernières recherches
              </h2>
              <div className="grid gap-4">
                {recentWords.map((word) => {
                  const category = db.categories.find(c => c.id === word.categoryId)
                  const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
                  
                  return (
                    <Link
                      key={word.id}
                      href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                      className="group rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
                    >
                      <h3 className="text-lg font-medium text-gray-800">
                        {word.word}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
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
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
