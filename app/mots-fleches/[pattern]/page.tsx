import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SearchForm } from "@/components/search/search-form"

interface PageProps {
  params: {
    pattern: string
  }
}

export default function PatternPage({ params }: PageProps) {
  const pattern = decodeURIComponent(params.pattern).toUpperCase()
  
  // Convertir le motif en expression régulière
  const regexPattern = `^${pattern.replace(/\*/g, ".")}$`
  const regex = new RegExp(regexPattern)
  
  // Trouver tous les mots qui correspondent au motif
  const matchingWords = db.words.filter(word => regex.test(word.word))
  
  if (matchingWords.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="relative overflow-hidden pt-20 pb-16">
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-800">
              Solutions pour {pattern}
            </h1>
            <p className="text-gray-600 mt-2">
              Mots de {pattern.length} lettres 
            </p>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <SearchForm />
        </div>

        {/* Statistiques */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Statistiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl font-bold text-blue-800">{matchingWords.length}</span>
              <span className="text-gray-600">Solutions trouvées</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl font-bold text-blue-800">{pattern.length}</span>
              <span className="text-gray-600">Lettres</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl font-bold text-blue-800">{pattern.replace(/\*/g, "").length}</span>
              <span className="text-gray-600">Lettres connues</span>
            </div>
          </div>
        </Card>

        {/* Liste des mots */}
        <Card className="bg-white/95 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Solutions ({matchingWords.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingWords.map((word) => {
              const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
              return (
                <Link
                  key={word.id}
                  href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                  className="group"
                >
                  <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-blue-800 group-hover:text-blue-900">
                        {word.word}
                      </span>
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
            <Link href="/mots-fleches/L*HOMME*DES*CLES" className="hover:text-blue-600">
              L'HOMME DES CLÉS
            </Link>
            <Link href="/mots-fleches/UN*PEU*DE*CLARTE" className="hover:text-blue-600">
              UN PEU DE CLARTÉ
            </Link>
            <Link href="/mots-fleches/VILLE*DE*MESOPOTAMIE" className="hover:text-blue-600">
              VILLE DE MÉSOPOTAMIE
            </Link>
            <Link href="/mots-fleches/VEILLANT*AU*GAIN" className="hover:text-blue-600">
              VEILLANT AU GAIN
            </Link>
            <Link href="/mots-fleches/IL*A*REVELE*DES*FONDS*SECRETS" className="hover:text-blue-600">
              IL A RÉVÉLÉ DES FONDS SECRETS
            </Link>
            <Link href="/mots-fleches/GRAND*CREUX" className="hover:text-blue-600">
              GRAND CREUX
            </Link>
            <Link href="/mots-fleches/EST*ALLONGE*POUR*DE*BON" className="hover:text-blue-600">
              EST ALLONGÉ POUR DE BON
            </Link>
            <Link href="/mots-fleches/BON*PREMIER" className="hover:text-blue-600">
              BON PREMIER
            </Link>
            <Link href="/mots-fleches/TELLE*QU*ON*L*ESPERE" className="hover:text-blue-600">
              TELLE QU'ON L'ESPÈRE
            </Link>
            <Link href="/mots-fleches/TYPE*DE*TISSU" className="hover:text-blue-600">
              TYPE DE TISSU
            </Link>
          </div>
        </Card>
      </main>
      </div>
    </div>
  )
}