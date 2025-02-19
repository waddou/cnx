"use client"

import { useEffect } from "react"
import { errorLogger } from "@/lib/error-logger"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    errorLogger.log(error, "dashboard")
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold text-red-600">Une erreur est survenue</h2>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={() => reset()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}

