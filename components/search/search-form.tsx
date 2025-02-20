"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { db } from "@/lib/data"

interface SearchResult {
  word: string
  definition: string
  category: string
  difficulty: string
}

/**
 * Détecte le type de recherche et retourne l'URL appropriée
 * @param query La requête de recherche
 * @returns L'URL de redirection
 */
function getSearchUrl(query: string): string {
  // Normaliser la requête
  const normalizedQuery = query.trim().toUpperCase()

  // 1. Recherche avec jokers (AP***)
  if (normalizedQuery.includes("*")) {
    return `/mots-fleches/${encodeURIComponent(normalizedQuery)}`
  }

  // 2. Recherche de début de mot (AP_)
  if (normalizedQuery.includes("_")) {
    const prefix = normalizedQuery.split("_")[0]
    return `/mots-commencant/${encodeURIComponent(prefix)}`
  }

  // 3. Recherche d'un mot exact (sans espace ni caractères spéciaux)
  if (!normalizedQuery.includes(" ") && /^[A-Z]+$/.test(normalizedQuery)) {
    // Vérifier si le mot existe dans la base de données
    const wordExists = db.words.some(
      word => word.word.toUpperCase() === normalizedQuery
    )
    
    if (wordExists) {
      return `/word/${encodeURIComponent(normalizedQuery.toLowerCase())}`
    } else {
      return `/mots-commencant/${encodeURIComponent(normalizedQuery)}`
    }
  }

  // 4. Par défaut, recherche de définition
  return `/definition/${encodeURIComponent(normalizedQuery.replace(/ /g, '*'))}`
}

export function SearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // Rediriger vers la page appropriée
      const searchUrl = getSearchUrl(query)
      router.push(searchUrl)
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
            placeholder="Rechercher (ex: ECLAIR, AP***, AP_, COURRIER ECLAIR)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="destructive"
            onClick={() => setQuery("")}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
          >
            {isLoading ? "Recherche..." : "Chercher"}
          </Button>
        </div>
      </form>

      <div className="rounded-lg border bg-white p-4 text-sm text-gray-600">
        <h3 className="mb-2 font-semibold">Comment chercher ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">ECLAIR</span> : Recherche le mot exact</li>
              <li><span className="font-medium">AP***</span> : Mot de 5 lettres commençant par AP</li>
              <li><span className="font-medium">AP_</span> : Tous les mots commençant par AP</li>
              <li><span className="font-medium">COURRIER ECLAIR</span> : Recherche une définition</li>
            </ul>
          </div>
          <div class="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <span class="text-gray-600">Vous cherchez une réponse à la définition : "Anciennes mesures de grain "<br/>On saisit dans la barre de recherche la définition<br/>Ce qui donne ici : ANCIENNES*MESURES*DE*GRAIN</span>
          </div>
        </div>
      </div>
    </div>
  )
}
