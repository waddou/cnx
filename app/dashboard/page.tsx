import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, Users, Book, Search, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/data"

// Placeholder for ErrorLogs component. Replace with your actual component.
const ErrorLogs = () => <p className="text-gray-600">Journal des erreurs sera affiché ici.</p>

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  const stats = [
    {
      title: "Utilisateurs",
      value: db.users.length,
      icon: Users,
      trend: "+12%",
      description: "depuis le mois dernier"
    },
    {
      title: "Mots",
      value: db.words.length,
      icon: Book,
      trend: "+8%",
      description: "depuis le mois dernier"
    },
    {
      title: "Recherches",
      value: db.savedSearches.length,
      icon: Search,
      trend: "+15%",
      description: "depuis le mois dernier"
    }
  ]

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="animate-fade-in mb-12">
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent">
            Tableau de bord
          </h1>
          <p className="text-lg text-gray-600">
            Bienvenue, {session.user.name}
          </p>
        </div>

        {/* Statistiques */}
        <div className="animate-fade-in-up mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="group overflow-hidden bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 p-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  {stat.trend}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="ml-2 text-sm text-gray-600">{stat.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Informations du compte */}
        <div className="animate-slide-in-left mb-8">
          <Card className="bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Informations du compte</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-4">
                <p className="text-sm text-gray-600">Nom</p>
                <p className="mt-1 font-medium text-gray-800">{session.user.name}</p>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-4">
                <p className="text-sm text-gray-600">Email</p>
                <p className="mt-1 font-medium text-gray-800">{session.user.email}</p>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-4">
                <p className="text-sm text-gray-600">Rôle</p>
                <p className="mt-1 font-medium text-gray-800">{session.user.role}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sections Mots et Définitions */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Recent Words Section */}
          <div className="animate-slide-in-left">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-xl font-bold text-gray-800">
                Derniers mots consultés
              </h2>
              <div className="space-y-4">
                {recentWords.map((word) => {
                  const category = db.categories.find(c => c.id === word.categoryId)
                  const difficulty = db.difficulties.find(d => d.id === word.difficultyId)
                  
                  return (
                    <Link
                      key={word.id}
                      href={`/word/${encodeURIComponent(word.word.toLowerCase())}`}
                      className="group block rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-800">
                          {word.word}
                        </h3>
                        <div className="flex gap-2">
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
                      </div>
                    </Link>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Popular Definitions Section */}
          <div className="animate-slide-in-right">
            <Card className="bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-xl font-bold text-gray-800">
                Définitions populaires
              </h2>
              <div className="space-y-4">
                {popularDefinitions.map((definition) => (
                  <Link
                    key={definition}
                    href={`/definition/${encodeURIComponent(definition.replace(/ /g, '*'))}`}
                    className="group block rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:scale-[1.02] hover:shadow-md"
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
            </Card>
          </div>
        </div>

        {/* Journal des erreurs */}
        <div className="animate-slide-in-right">
          <Card className="bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Journal des erreurs</h2>
              <div className="rounded-full bg-red-100 p-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <ErrorLogs />
          </Card>
        </div>
      </main>
    </div>
  )
}
