import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Card } from "@/components/ui/card"

// Dummy data for demonstration purposes.  Replace with your actual database interaction.
const db = {
  users: [{ id: 1 }, { id: 2 }],
  words: [{ id: 1 }, { id: 2 }, { id: 3 }],
  savedSearches: [{ id: 1 }, { id: 2 }],
}

// Placeholder for ErrorLogs component.  Replace with your actual component.
const ErrorLogs = () => <p>Error logs will be displayed here.</p>

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login")
  }

  // Redirect to home if not admin
  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 pt-16">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Tableau de bord administrateur</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Informations du compte</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Nom:</span> {session.user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {session.user.email}
              </p>
              <p>
                <span className="font-medium">Rôle:</span> {session.user.role}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Statistiques</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Utilisateurs:</span> {db.users.length}
              </p>
              <p>
                <span className="font-medium">Mots:</span> {db.words.length}
              </p>
              <p>
                <span className="font-medium">Recherches sauvegardées:</span>{" "}
                {db.savedSearches.length}
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Journal des erreurs</h2>
            <ErrorLogs />
          </Card>
        </div>
      </div>
    </div>
  )
}
