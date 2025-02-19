import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import { db } from "@/lib/data"

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exemple@fsolver.fr",
        },
        password: {
          label: "Mot de passe",
          type: "password",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email et mot de passe requis")
          }

          const user = db.findUserByEmail(credentials.email)
          if (!user) {
            throw new Error("Utilisateur non trouvé")
          }

          const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
          const hashedPassword = await bcrypt.hash("admin123", 10)
          if (!isValid) {
            throw new Error("Mot de passe incorrect"+ hashedPassword +" vs "+ user.passwordHash)
          }

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // On first sign in, user and account will be present
      if (account && user) {
        token.role = user.role
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      // If the url is relative, prefix it with the base url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // If the url is absolute but on the same origin, prefix it with the base url
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + "/dashboard"
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as "USER" | "ADMIN"
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Create route handler
const handler = NextAuth(authOptions)

// Export route handlers with proper typing
export { handler as GET, handler as POST }

