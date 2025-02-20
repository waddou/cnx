"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { UserNav } from "@/components/auth/user-nav"

export function Header() {
  const { data: session, status } = useSession()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white rounded-sm flex items-center justify-center">
            <span className="text-blue-900 font-bold">F</span>
          </div>
          <span className="text-xl font-bold text-white">FSolver</span>
          <span className="text-sm text-blue-100">pour les mots croisés</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {status === "loading" ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-blue-100/20" />
          ) : !session ? (
            <>
              <Link 
                href="/login" 
                className="text-sm font-medium text-blue-100 hover:text-white"
              >
                Connexion
              </Link>
              <Link 
                href="/login?tab=register"
                className="text-sm font-medium bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-blue-50"
              >
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              {session.user.role === "ADMIN" && (
                <Link 
                  href="/dashboard"
                  className="text-sm font-medium text-blue-100 hover:text-white"
                >
                  Dashboard
                </Link>
              )}
              <UserNav />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
