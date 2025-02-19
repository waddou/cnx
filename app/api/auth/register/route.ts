import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/data"
import { errorLogger } from "@/lib/error-logger"

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json()

    if (!email || !password || !username) {
      const error = new Error("Tous les champs sont requis")
      errorLogger.log(error, "auth/register")
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = db.findUserByEmail(email)
    if (existingUser) {
      const error = new Error("Cet email est déjà utilisé")
      errorLogger.log(error, "auth/register", email)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = db.createUser({
      email,
      username,
      passwordHash: hashedPassword,
    })

    // Don't send the password hash back
    const { passwordHash: _, ...safeUser } = user

    return NextResponse.json(safeUser)
  } catch (error) {
    errorLogger.log(error as Error, "auth/register")
    return NextResponse.json({ error: "Erreur lors de la création du compte" }, { status: 500 })
  }
}

