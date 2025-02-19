import { Card } from "@/components/ui/card"
import { db } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"

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
  
  // Trouver les anagrammes
  const anagrams = db.words
    .filter(w => w.id !== word.id && db.isAnagram(w.word, word.word))
    .map(w => w.word)

  const stats = db.getWordStats(word.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 pt-16">
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-4">{word.word}</h1>
          <div className="flex justify-center gap-4">
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
              {category?.name}
            </span>
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
              {difficulty?.name}
            </span>
          </div>
        </div>

        {/* Statistiques */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Solutions de mots croisés et mots fléchés pour {word.word}
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="#solutions" className="hover:text-blue-600">
                - {stats.solutionsCount} solutions de {stats.solutionsLengthRange.min} à {stats.solutionsLengthRange.max} lettres
              </Link>
            </li>
            <li>
              <Link href="#synonymes" className="hover:text-blue-600">
                - {stats.synonymsCount} synonymes du mot {word.word} ({word.word.toLowerCase()}) de {stats.synonymsLengthRange.min} à {stats.synonymsLengthRange.max} lettres
              </Link>
            </li>
            <li>
              <Link href="#definitions" className="hover:text-blue-600">
                - {stats.definitionsCount} définitions pour {word.word.toLowerCase()}
              </Link>
            </li>
            <li>
              <Link href="#mots-croises" className="hover:text-blue-600">
                - {crosswordDefinitions.length} définitions de mots croisés et de mots fléchés avec solution pour {word.word}
              </Link>
            </li>
            <li>
              <Link href="#anagrammes" className="hover:text-blue-600">
                - {anagrams.length} anagrammes avec les lettres {word.word} (Anacroisés)
              </Link>
            </li>
          </ul>
        </Card>

        {/* Synonymes */}
        <Card id="synonymes" className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {word.word} - <span className="font-normal italic">{word.word.toLowerCase()}</span>
          </h2>
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            {synonyms.length} Synonymes :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {synonyms.map((synonym) => (
              <Link
                key={synonym?.id}
                href={`/word/${encodeURIComponent(synonym?.word?.toLowerCase() || '')}`}
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="font-medium">{synonym?.word}</span>
                <span className="text-gray-500 text-sm ml-2">({synonym?.word.length})</span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Définitions */}
        <Card id="definitions" className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Définition de {word.word.toLowerCase()}
            <span className="text-gray-600 text-lg font-normal ml-2">
              ({definitions.length})
            </span>
          </h2>
          <div className="text-gray-600 italic mb-4">
            Cliquez sur un mot pour découvrir sa définition
          </div>
          <ul className="space-y-4">
            {definitions.map((def) => (
              <li key={def.id} className="border-b border-gray-200 pb-4 last:border-0">
                <Link 
                  href={`/definition/${encodeURIComponent(def.definition.replace(/ /g, '*'))}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  - {def.definition}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Définitions de mots croisés */}
        <Card id="mots-croises" className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Les définitions du mot {word.word}
            <span className="text-gray-600 text-lg font-normal ml-2">
              ({crosswordDefinitions.length})
            </span>
          </h2>
          <div className="text-gray-600 italic mb-4">
            Cliquez sur un mot pour découvrir sa définition
          </div>
          <ul className="space-y-4">
            {crosswordDefinitions.map((def) => (
              <li key={def.id} className="border-b border-gray-200 pb-4 last:border-0">
                <Link 
                  href={`/definition/${encodeURIComponent(def.definition.replace(/ /g, '*'))}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  - {def.definition}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Expressions associées */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            D'autres définitions intéressantes
            <span className="text-gray-600 text-lg font-normal ml-2">
              ({relatedExpressions.length})
            </span>
          </h2>
          <ul className="space-y-4">
            {relatedExpressions.map((expr) => (
              <li key={expr.id} className="border-b border-gray-200 pb-4 last:border-0">
                <Link
                  href={`/definition/${encodeURIComponent(expr.expression.toLowerCase().replace(/ /g, '*'))}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  - {expr.expression}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Anagrammes */}
        <Card id="anagrammes" className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {anagrams.length} ANAGRAMMES EN {word.word.length} LETTRES :
          </h2>
          <div className="flex flex-wrap gap-4">
            {anagrams.map((anagram) => (
              <Link
                key={anagram}
                href={`/word/${encodeURIComponent(anagram.toLowerCase())}`}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                {anagram}
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
