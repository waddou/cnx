import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
        <div className="animate-fade-in mb-8 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">
            Bienvenue
          </h1>
          <p className="text-lg text-gray-600">
            Connectez-vous pour accéder à toutes les fonctionnalités
          </p>
        </div>
        <div className="animate-fade-in-up w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
