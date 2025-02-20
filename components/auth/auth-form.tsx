"use client"

import { useState, useRef, type React } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Github } from "lucide-react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthFormData {
  email: string
  password: string
  username?: string
}

export function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const loginFormRef = useRef<HTMLFormElement>(null)
  const registerFormRef = useRef<HTMLFormElement>(null)
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  async function handleRegister(data: AuthFormData) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'inscription")
      }

      // If registration successful, sign in
      return handleLogin(data)
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'inscription")
      return false
    }
  }

  async function handleLogin(data: AuthFormData) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast.success("Connexion réussie")
      router.push(callbackUrl)
      router.refresh()
      return true
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Erreur lors de la connexion")
      return false
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const data: AuthFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }

      const username = formData.get("username") as string
      if (username) {
        data.username = username
      }

      const isRegister = event.currentTarget.dataset.mode === "register"
      const success = isRegister ? await handleRegister(data) : await handleLogin(data)

      if (success) {
        if (isRegister && registerFormRef.current) {
          registerFormRef.current.reset()
        } else if (!isRegister && loginFormRef.current) {
          loginFormRef.current.reset()
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <Tabs defaultValue={searchParams.get("tab") === "register" ? "register" : "login"}>
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="space-y-4">
          <TabsContent value="login">
            <form ref={loginFormRef} onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemple@fsolver.fr"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" type="password" required disabled={isLoading} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form ref={registerFormRef} onSubmit={onSubmit} data-mode="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                <Input id="username" name="username" placeholder="votre_nom" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemple@fsolver.fr"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" type="password" required disabled={isLoading} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Création..." : "Créer un compte"}
              </Button>
            </form>
          </TabsContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("github", { callbackUrl })}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </CardContent>
      </Tabs>
    </Card>
  )
}
