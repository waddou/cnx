import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 pt-16">
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Moteur de recherche pour mots croisés et mots fléchés
        </h1>
        <p className="mb-8 text-center text-blue-100">
          Ce moteur est dédié à la recherche de mots spécifiquement pour les mots croisés et les mots fléchés.
          C&apos;est un dictionnaire de mots croisés et de mots fléchés.
        </p>

        <SearchForm />
      </main>
    </div>
  )
}
