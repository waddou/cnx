import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <AuthForm />
      </div>
    </div>
  )
}

