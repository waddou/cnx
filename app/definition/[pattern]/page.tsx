'use client'

import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SearchForm } from "@/components/search/search-form"

interface PageProps {
  params: {
    pattern: string
  }
}

export default function DefinitionPage({ params }: PageProps) {
  const definition = decodeURIComponent(params.pattern).replace(/\*/g, " ")
  
  const definitions = db.crosswordDefinitions.filter(d => d.definition === definition.toUpperCase())
  const allWords = definitions.map(d => db.findWordById(d.wordId)).filter(w => w !== undefined)
  
  if (allWords.length === 0) {
    notFound()
  }

  // Trouver la définition précédente et suivante
  const uniqueDefinitions = [...new Set(db.crosswordDefinitions.map(d => d.definition))]
    .sort((a, b) => a.localeCompare(b))
  const currentIndex = uniqueDefinitions.findIndex(d => d === definition.toUpperCase())
  const previousDefinition = currentIndex > 0 ? uniqueDefinitions[currentIndex - 1] : null
  const nextDefinition = currentIndex < uniqueDefinitions.length - 1 ? uniqueDefinitions[currentIndex + 1] : null

  const wordsByLength = allWords.reduce((acc, word) => {
    const length = word.word.length
    if (!acc[length]) {
      acc[length] = []
    }
    acc[length].push(word)
    return acc
  }, {} as Record<number, typeof allWords>)

  const lengths = Object.keys(wordsByLength).map(Number).sort((a, b) => a - b)
  const [selectedLength, setSelectedLength] = useState<number | null>(null)
  const words = selectedLength ? wordsByLength[selectedLength] : allWords

  // Trouver les définitions populaires (reliées à plus de 3 mots)
  const popularDefinitions = db.crosswordDefinitions.reduce((acc, def) => {
    acc[def.definition] = (acc[def.definition] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const trendingDefinitions = Object.entries(popularDefinitions)
    .filter(([_, count]) => count > 3)
    .map(([definition]) => definition)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative overflow-hidden pt-20 pb-16">
      <main className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="animate-fade-in mb-8 flex items-center justify-between">
          {previousDefinition ? (
            <Link
              href={`/definition/${encodeURIComponent(previousDefinition.replace(/ /g, '*'))}`}
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:scale-105 hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="max-w-[200px] truncate bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {previousDefinition.toLowerCase()}
              </span>
            </Link>
          ) : (
            <div /> 
          )}
          
          {nextDefinition && (
            <Link
              href={`/definition/${encodeURIComponent(nextDefinition.replace(/ /g, '*'))}`}
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:scale-105 hover:shadow-md"
            >
              <span className="max-w-[200px] truncate bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {nextDefinition.toLowerCase()}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* En-tête */}
        <div className="animate-fade-in mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            « {definition} »
          </h1>
          <p className="text-lg text-gray-600">
            {allWords.length} solutions de {lengths[0]} à {lengths[lengths.length - 1]} lettres
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="animate-fade-in mb-8">
          <SearchForm />
        </div>

        {/* Filtre par nombre de lettres */}
        <section className="animate-fade-in-up mb-12">
          <Card className="bg-white p-6 shadow-lg">
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setSelectedLength(null)}
                className={`transform rounded-full px-6 py-2 text-sm font-medium transition-all hover:scale-105 ${
                  selectedLength === null 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md" 
                    : "bg-gradient-to-r from-purple-50 to-blue-50 text-gray-700 hover:shadow-md"
                }`}
              >
                Tout
              </button>
              {lengths.map(length => (
                <button
                  key={length}
                  onClick={() => setSelectedLength(length)}
                  className={`transform rounded-full px-6 py-2 text-sm font-medium transition-all hover:scale-105 ${
                    selectedLength === length 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md" 
                      : "bg-gradient-to-r from-purple-50 to-blue-50 text-gray-700 hover:shadow-md"
                  }`}
                >
                  {length} lettres
                </button>
              ))}
            </div>
          </Card>
        </section>

        {/* Liste des mots */}
        <section className="animate-slide-in-left mb-12">
          <Card className="bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Solutions proposées
              <span className="ml-2 text-lg font-normal text-gray-600">
                ({words.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {words.map((word) => {
                const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
                const category = db.categories.find(c => c.id === word.categoryId)
                
                return (
                  <Link
                    key={word.id}
                    href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                    className="group rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-gray-800">
                        {word.word}
                      </span>
                      <span className="rounded-full bg-white px-2 py-1 text-sm text-gray-600 shadow-sm">
                        {word.word.length} lettres
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
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
          </Card>
        </section>

        {/* Définitions du moment */}
        <section className="animate-slide-in-right">
          <Card className="bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Définitions populaires
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {trendingDefinitions.map((def) => (
                <Link
                  key={def}
                  href={`/definition/${encodeURIComponent(def.replace(/ /g, '*'))}`}
                  className="group rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
                >
                  <p className="text-gray-800">{def}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {popularDefinitions[def]} solutions
                  </p>
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </main>
      </div>
    </div>
  )
}