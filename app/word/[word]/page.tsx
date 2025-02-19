import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface WordPageProps {
  params: {
    word: string
  }
}

export default function WordPage({ params }: WordPageProps) {
  const word = decodeURIComponent(params.word)

  // Ces données seront remplacées par des données réelles de votre API
  const wordData = {
    definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    synonyms: ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"],
    antonyms: ["Consectetur", "Adipiscing", "Elit", "Tempor", "Incididunt"],
    citations: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    ],
    expressions: [
      "Lorem ipsum dolor",
      "Sit amet consectetur",
      "Adipiscing elit sed",
      "Do eiusmod tempor"
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 pt-16">
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">{word}</h1>

        <div className="space-y-6">
          <Card className="bg-white/95 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Définition</h2>
            <p className="text-gray-600">{wordData.definition}</p>
          </Card>

          <Card className="bg-white/95 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Synonymes</h2>
            <div className="space-y-3">
              {wordData.synonyms.map((synonym) => (
                <div key={synonym} className="border-b border-gray-200 pb-3 last:border-0">
                  <a href={`/word/${encodeURIComponent(synonym)}`} className="block hover:bg-gray-50 rounded p-2 -mx-2">
                    <span className="font-medium text-blue-600">{synonym}</span>
                  </a>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/95 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Antonymes</h2>
            <div className="space-y-3">
              {wordData.antonyms.map((antonym) => (
                <div key={antonym} className="border-b border-gray-200 pb-3 last:border-0">
                  <a href={`/word/${encodeURIComponent(antonym)}`} className="block hover:bg-gray-50 rounded p-2 -mx-2">
                    <span className="font-medium text-blue-600">{antonym}</span>
                  </a>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/95 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Citations</h2>
            <div className="space-y-3">
              {wordData.citations.map((citation, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-0 text-gray-600">
                  {citation}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/95 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Expressions</h2>
            <div className="space-y-3">
              {wordData.expressions.map((expression, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-0 text-gray-600">
                  {expression}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
