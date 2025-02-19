export interface Problem {
  id: number
  slug: string
  title: string
  content: string
  category: string
  createdAt: string
}

export interface Solution {
  id: number
  word: string
  clue: string
  problemId: number
  userId: string
  createdAt: string
}

export interface User {
  id: string
  username: string | null
  email: string
  passwordHash: string
  createdAt: string
}

export interface Comment {
  id: number
  content: string
  problemId: number
  userId: string
  createdAt: string
}

export interface Vote {
  id: number
  solutionId: number
  userId: string
  value: number
  createdAt: string
}

// Initial database state
export const db = {
  problems: [
    {
      id: 1,
      slug: "mots-croises-debutant",
      title: "Mots Croisés Débutant",
      content: "Une grille simple pour commencer",
      category: "débutant",
      createdAt: new Date().toISOString(),
    },
  ] as Problem[],
  solutions: [
    {
      id: 1,
      word: "EBAUBIR",
      clue: "Étonner fortement",
      problemId: 1,
      userId: "1",
      createdAt: new Date().toISOString(),
    },
  ] as Solution[],
  users: [] as User[],
  comments: [] as Comment[],
  votes: [] as Vote[],
}

