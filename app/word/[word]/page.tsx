import { Card } from "@/components/ui/card"
import { db } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WordPageProps {
  params: {
    word: string
  }
}

export default function WordPage({ params }: WordPageProps) {
  const searchWord = decodeURIComponent(params.word).toUpperCase()
  
  // Récupérer le mot et ses informations associées
  const word = db.words.find(w => w.word === searchWord)
  if (!word) {
    notFound()
  }

  // Enregistrer la consultation du mot
  db.addRecentWord(word.id)

  // Trouver le mot précédent et suivant
  const sortedWords = [...db.words].sort((a, b) => a.word.localeCompare(b.word))
  const currentIndex = sortedWords.findIndex(w => w.word === word.word)
  const previousWord = currentIndex > 0 ? sortedWords[currentIndex - 1] : null
  const nextWord = currentIndex < sortedWords.length - 1 ? sortedWords[currentIndex + 1] : null

  // Récupérer toutes les informations
  const definitions = db.findWordDefinitionsByWordId(word.id)
  const mainDefinition = definitions.find(d => d.isMainDefinition)
  const otherDefinitions = definitions.filter(d => !d.isMainDefinition)
  
  const category = db.categories.find(c => c.id === word.categoryId)
  const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
  
  const relations = db.wordRelations.filter(r => r.wordId1 === word.id || r.wordId2 === word.id)
  const synonyms = relations
    .filter(r => r.relationType === "SYNONYM")
    .map(r => {
      const relatedWordId = r.wordId1 === word.id ? r.wordId2 : r.wordId1
      return db.findWordById(relatedWordId)
    })
    .filter(w => w !== undefined)
  
  const crosswordDefinitions = db.findCrosswordDefinitionsByWordId(word.id)
  const relatedExpressions = db.findRelatedExpressionsByWordId(word.id)
  
  const anagrams = db.words
    .filter(w => w.id !== word.id && db.isAnagram(w.word, word.word))
    .map(w => w.word)

  const stats = db.getWordStats(word.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative overflow-hidden pt-20 pb-16">
        <main className="container mx-auto px-4 py-12">
          {/* Navigation */}
          <div className="animate-fade-in mb-8 flex items-center justify-between">
            {previousWord ? (
              <Link
                href={`/word/${encodeURIComponent(previousWord.word.toLowerCase())}`}
                className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:scale-105 hover:shadow-md"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {previousWord.word}
                </span>
              </Link>
            ) : (
              <div /> 
            )}
            
            {nextWord && (
              <Link
                href={`/word/${encodeURIComponent(nextWord.word.toLowerCase())}`}
                className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:scale-105 hover:shadow-md"
              >
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {nextWord.word}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="animate-fade-in mb-12 text-center">
            <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-extrabold text-transparent">
              {word.word}
            </h1>
            <div className="flex justify-center gap-4">
              {category && (
                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600 shadow-sm">
                  {category.name}
                </span>
              )}
              {difficulty && (
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
                  {difficulty.name}
                </span>
              )}
            </div>
          </div>

          {/* Statistiques */}
          <div className="animate-fade-in-up grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transform bg-white p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Solutions</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.solutionsCount}</p>
              <p className="mt-1 text-sm text-gray-600">
                de {stats.solutionsLengthRange.min} à {stats.solutionsLengthRange.max} lettres
              </p>
            </Card>
            <Card className="transform bg-white p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Synonymes</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.synonymsCount}</p>
              <p className="mt-1 text-sm text-gray-600">
                de {stats.synonymsLengthRange.min} à {stats.synonymsLengthRange.max} lettres
              </p>
            </Card>
            <Card className="transform bg-white p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Définitions</h3>
              <p className="text-3xl font-bold text-indigo-600">{stats.definitionsCount}</p>
              <p className="mt-1 text-sm text-gray-600">
                pour {word.word.toLowerCase()}
              </p>
            </Card>
          </div>

          {/* Synonymes */}
          <section id="synonymes" className="animate-slide-in-left mt-12">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Synonymes de {word.word.toLowerCase()}
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({synonyms.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {synonyms.map((synonym) => (
                  <Link
                    key={synonym?.id}
                    href={`/word/${encodeURIComponent(synonym?.word?.toLowerCase() || '')}`}
                    className="group rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <span className="font-medium text-gray-800">{synonym?.word}</span>
                    <span className="ml-2 text-sm text-gray-500">({synonym?.word.length})</span>
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Définitions */}
          <section id="definitions" className="animate-slide-in-right mt-12">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Définitions
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({definitions.length})
                </span>
              </h2>
              <div className="space-y-4">
                {definitions.map((def) => (
                  <Link
                    key={def.id}
                    href={`/definition/${encodeURIComponent(def.definition.replace(/ /g, '*'))}`}
                    className="group block rounded-lg border border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.01] hover:shadow-md"
                  >
                    <p className="text-gray-800">{def.definition}</p>
                    {def.isMainDefinition && (
                      <span className="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">
                        Définition principale
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Définitions de mots croisés */}
          <section id="mots-croises" className="animate-slide-in-left mt-12">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Définitions de mots croisés
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({crosswordDefinitions.length})
                </span>
              </h2>
              <div className="space-y-4">
                {crosswordDefinitions.map((def) => (
                  <Link
                    key={def.id}
                    href={`/definition/${encodeURIComponent(def.definition.replace(/ /g, '*'))}`}
                    className="group block rounded-lg border border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.01] hover:shadow-md"
                  >
                    <p className="text-gray-800">{def.definition}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Expressions associées */}
          <section className="animate-slide-in-right mt-12">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Expressions associées
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({relatedExpressions.length})
                </span>
              </h2>
              <div className="space-y-4">
                {relatedExpressions.map((expr) => (
                  <Link
                    key={expr.id}
                    href={`/definition/${encodeURIComponent(expr.expression.toLowerCase().replace(/ /g, '*'))}`}
                    className="group block rounded-lg border border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.01] hover:shadow-md"
                  >
                    <p className="text-gray-800">{expr.expression}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Anagrammes */}
          <section id="anagrammes" className="animate-slide-in-left mt-12">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Anagrammes
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({anagrams.length})
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {anagrams.map((anagram) => (
                  <Link
                    key={anagram}
                    href={`/word/${encodeURIComponent(anagram.toLowerCase())}`}
                    className="group rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 text-center transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <span className="font-medium text-gray-800">{anagram}</span>
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
