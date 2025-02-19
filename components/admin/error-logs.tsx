"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ErrorLog {
  id: string
  timestamp: string
  error: string
  context?: string
  userId?: string
  stack?: string
}

export function ErrorLogs() {
  const [logs, setLogs] = useState<ErrorLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchLogs() {
    try {
      const response = await fetch("/api/errors")
      if (!response.ok) {
        throw new Error("Failed to fetch error logs")
      }
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error("Error fetching logs:", error)
      toast.error("Erreur lors du chargement des journaux")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, []) //Fixed: Added empty dependency array to useEffect

  if (isLoading) {
    return <div>Chargement des journaux...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Journaux récents</h3>
        <Button onClick={() => fetchLogs()} variant="outline" size="sm">
          Actualiser
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Contexte</TableHead>
              <TableHead>Erreur</TableHead>
              <TableHead>Utilisateur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Aucune erreur enregistrée
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.timestamp).toLocaleString("fr-FR")}</TableCell>
                  <TableCell>{log.context || "N/A"}</TableCell>
                  <TableCell>{log.error}</TableCell>
                  <TableCell>{log.userId || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

