import { Providers } from "./providers"
import { Toaster } from "sonner"
import "./globals.css"
import type React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Header } from "@/components/header"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  // Log session data server-side
  console.log('Current Session:', JSON.stringify(session, null, 2))

  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
