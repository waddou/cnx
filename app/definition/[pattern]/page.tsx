'use client'

import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface PageProps {
  params: {
    pattern: string
  }
}

export default function DefinitionPage({ params }: PageProps) {
  const definition = decodeURIComponent(params.pattern).replace(/\*/g, " ")
  
  // Trouver tous les mots qui ont cette définition
  const definitions = db.crosswordDefinitions.filter(d => d.definition === definition.toUpperCase())
  const allWords = definitions.map(d => db.findWordById(d.wordId)).filter(w => w !== undefined)
  
  if (allWords.length === 0) {
    notFound()
  }

  // Grouper les mots par longueur
  const wordsByLength = allWords.reduce((acc, word) => {
    const length = word.word.length
    if (!acc[length]) {
      acc[length] = []
    }
    acc[length].push(word)
    return acc
  }, {} as Record<number, typeof allWords>)

  // Trier les longueurs
  const lengths = Object.keys(wordsByLength).map(Number).sort((a, b) => a - b)

  // État pour le filtre de longueur sélectionné
  const [selectedLength, setSelectedLength] = useState<number | null>(null)

  // Filtrer les mots selon la longueur sélectionnée
  const words = selectedLength ? wordsByLength[selectedLength] : allWords

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-800">
              Solutions pour « {definition} »
            </h1>
            <p className="text-gray-600 mt-2">
              {allWords.length} solutions de {lengths[0]} à {lengths[lengths.length - 1]} lettres
            </p>
          </div>
        </div>

        {/* Filtre par nombre de lettres */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Filtrer par nombre de lettres
          </h2>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedLength(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedLength === null 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-50 text-blue-700 hover:bg-blue-200"
              }`}
            >
              Tout
            </button>
            {lengths.map(length => (
              <button
                key={length}
                onClick={() => setSelectedLength(length)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedLength === length 
                    ? "bg-blue-600 text-white" 
                    : "bg-blue-50 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        </Card>

        {/* Liste des mots */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {words.length} réponses proposées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {words.map((word) => {
              const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
              return (
                <Link
                  key={word.id}
                  href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                  className="group"
                >
                  <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-semibold text-blue-800 group-hover:text-blue-900">
                          {word.word}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({word.word.length})
                        </span>
                      </div>
                      {difficulty && (
                        <Badge variant={difficulty.id === 1 ? "default" : "destructive"}>
                          {difficulty.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>

        {/* Définitions du moment */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Définitions du moment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/definition/L*HOMME*DES*CLES" className="hover:text-blue-600">
              L'HOMME DES CLÉS
            </Link>
            <Link href="/definition/UN*PEU*DE*CLARTE" className="hover:text-blue-600">
              UN PEU DE CLARTÉ
            </Link>
            <Link href="/definition/VILLE*DE*MESOPOTAMIE" className="hover:text-blue-600">
              VILLE DE MÉSOPOTAMIE
            </Link>
            <Link href="/definition/VEILLANT*AU*GAIN" className="hover:text-blue-600">
              VEILLANT AU GAIN
            </Link>
            <Link href="/definition/IL*A*REVELE*DES*FONDS*SECRETS" className="hover:text-blue-600">
              IL A RÉVÉLÉ DES FONDS SECRETS
            </Link>
            <Link href="/definition/GRAND*CREUX" className="hover:text-blue-600">
              GRAND CREUX
            </Link>
            <Link href="/definition/EST*ALLONGE*POUR*DE*BON" className="hover:text-blue-600">
              EST ALLONGÉ POUR DE BON
            </Link>
            <Link href="/definition/BON*PREMIER" className="hover:text-blue-600">
              BON PREMIER
            </Link>
            <Link href="/definition/TELLE*QU*ON*L*ESPERE" className="hover:text-blue-600">
              TELLE QU'ON L'ESPÈRE
            </Link>
            <Link href="/definition/TYPE*DE*TISSU" className="hover:text-blue-600">
              TYPE DE TISSU
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}