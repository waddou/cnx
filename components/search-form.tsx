"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

interface SearchResult {
  word: string
  definition: string
  category: string
  difficulty: string
}

const RECENT_WORDS = [
  { word: "Lorem", definition: "Lorem ipsum dolor sit amet" },
  { word: "Ipsum", definition: "Consectetur adipiscing elit" },
  { word: "Dolor", definition: "Sed do eiusmod tempor" },
  { word: "Sit", definition: "Incididunt ut labore" },
  { word: "Amet", definition: "Et dolore magna aliqua" },
  { word: "Consectetur", definition: "Ut enim ad minim veniam" },
  { word: "Adipiscing", definition: "Quis nostrud exercitation" },
  { word: "Elit", definition: "Ullamco laboris nisi" },
  { word: "Tempor", definition: "Ut aliquip ex ea commodo" },
  { word: "Incididunt", definition: "Duis aute irure dolor" },
]

export function SearchForm() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue")
      }

      // Validate the response data
      if (!Array.isArray(data)) {
        throw new Error("Format de réponse invalide")
      }

      // Type guard to ensure the data matches our interface
      const isValidResult = (item: any): item is SearchResult => {
        return typeof item.word === "string" && typeof item.definition === "string"
      }

      const validResults = data.filter(isValidResult)
      setResults(validResults)

      if (validResults.length === 0) {
        toast.info("Aucun résultat trouvé")
      }
    } catch (error) {
      console.error("Search error:", error)
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 rounded-lg bg-yellow-100/90 p-3 text-center text-sm text-yellow-800">
        Le caractère joker est * mais vous pouvez utiliser la &quot;barre d&apos;espace&quot;
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un mot... (utilisez * comme joker)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-white/95"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
            {isLoading ? "Recherche..." : "Chercher"}
          </Button>
        </div>
      </form>

      {results.length > 0 ? (
        <Card className="bg-white/95 p-4">
          <h2 className="mb-4 text-lg font-semibold">Résultats</h2>
          <ul className="space-y-3">
            {results.map((result, index) => (
              <li key={index} className="flex flex-col">
                <Link 
                  href={`/word/${encodeURIComponent(result.word.toLowerCase())}`}
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {result.word}
                </Link>
                <span className="text-sm text-gray-600">{result.definition}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : query && !isLoading ? (
        <Card className="bg-white/95 p-4">
          <p className="text-center text-gray-500">Aucun résultat trouvé</p>
        </Card>
      ) : null}

      <Card className="mt-8 bg-white/95 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-800">
          <Search className="h-5 w-5" />
          Recherche orthographique
        </h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>- Vous cherchez une réponse à la définition : &quot;Étonner&quot;</p>
          <p>- Saisissez les lettres que vous connaissez et * pour les autres.</p>
          <p>- Ce qui donne ici : *B*U*IR</p>
          <p>- On retrouve dans la liste des possibilités le mot : EBAUBIR</p>
          <p className="mt-4 text-xs">
            Vous pouvez également cliquer sur les mots écrits en <span className="text-blue-600">bleu</span> et{" "}
            <span className="text-red-600">rouge</span> pour connaître la définition
          </p>
        </div>
      </Card>

      <Card className="mt-8 bg-white/95 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-800">
          <Search className="h-5 w-5" />
          10 derniers mots consultés
        </h2>
        <div className="space-y-3">
          {RECENT_WORDS.map((word) => (
            <div key={word.word} className="border-b border-gray-200 pb-3 last:border-0">
              <div className="block rounded p-2 -mx-2">
                <Link 
                  href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {word.word}
                </Link>
                <p className="text-sm text-gray-600">{word.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
