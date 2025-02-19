"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchResult {
  word: string
  definition: string
}

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
      if (!response.ok) {
        throw new Error("Search failed")
      }
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un mot... (utilisez * comme joker)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
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

      {results.length > 0 && (
        <div className="rounded-lg border bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold">Résultats</h2>
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="flex flex-col">
                <span className="font-medium text-blue-600">{result.word}</span>
                <span className="text-sm text-gray-600">{result.definition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

