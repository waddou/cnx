export interface User {
  id: string
  username: string | null
  email: string
  passwordHash: string
  createdAt: string
  role: "USER" | "ADMIN"
}

export interface Word {
  id: number
  word: string
  definition: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  createdBy: string
  createdAt: string
}

export interface SavedSearch {
  id: number
  userId: string
  query: string
  createdAt: string
}

// Initial database state
export const db = {
  users: [
    {
      id: "1",
      username: "admin",
      email: "admin@fsolver.fr",
      passwordHash: "$2a$10$hFgXRSyyCT/p8stv6JSNpOFNjUFnlMp/g9KgdLBlvGWm6tu17vefG", // admin123
      createdAt: "2024-02-01T00:00:00.000Z",
      role: "ADMIN",
    },
    {
      id: "2",
      username: "jean.dupont",
      email: "jean@fsolver.fr",
      passwordHash: "$2a$10$NQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN.6IHZeGqHe3qOATrYy2", // password123
      createdAt: "2024-02-01T00:00:00.000Z",
      role: "USER",
    },
    {
      id: "3",
      username: "marie.martin",
      email: "marie@fsolver.fr",
      passwordHash: "$2a$10$NQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN.6IHZeGqHe3qOATrYy2", // password123
      createdAt: "2024-02-01T00:00:00.000Z",
      role: "USER",
    },
  ] as User[],

  words: [
    {
      id: 1,
      word: "EBAUBIR",
      definition: "Étonner fortement",
      category: "verbes",
      difficulty: "hard",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 2,
      word: "ABATTRE",
      definition: "Faire tomber",
      category: "verbes",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 3,
      word: "BALADE",
      definition: "Promenade",
      category: "noms",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 4,
      word: "CABANE",
      definition: "Petite maison",
      category: "noms",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 5,
      word: "DAMIER",
      definition: "Plateau de jeu",
      category: "noms",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 6,
      word: "ECLAIR",
      definition: "Lumière brève",
      category: "noms",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 7,
      word: "FACILE",
      definition: "Simple",
      category: "adjectifs",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 8,
      word: "GAGNER",
      definition: "Remporter",
      category: "verbes",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 9,
      word: "HALAGE",
      definition: "Traction d'un bateau",
      category: "noms",
      difficulty: "hard",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 10,
      word: "IGNARE",
      definition: "Ignorant",
      category: "adjectifs",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 11,
      word: "JAMBON",
      definition: "Charcuterie",
      category: "noms",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 12,
      word: "KAYAK",
      definition: "Embarcation",
      category: "noms",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 13,
      word: "LANCER",
      definition: "Jeter",
      category: "verbes",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 14,
      word: "MANGER",
      definition: "S'alimenter",
      category: "verbes",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 15,
      word: "NAPPER",
      definition: "Couvrir d'une sauce",
      category: "verbes",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 16,
      word: "OPERER",
      definition: "Intervenir chirurgicalement",
      category: "verbes",
      difficulty: "hard",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 17,
      word: "PAGAIE",
      definition: "Rame courte",
      category: "noms",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 18,
      word: "QUARTZ",
      definition: "Minéral",
      category: "noms",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 19,
      word: "RAPIDE",
      definition: "Véloce",
      category: "adjectifs",
      difficulty: "easy",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 20,
      word: "SABLER",
      definition: "Boire d'un trait",
      category: "verbes",
      difficulty: "medium",
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
    },
  ] as Word[],

  savedSearches: [] as SavedSearch[],

  // Database operations
  findUserByEmail(email: string) {
    return this.users.find((u) => u.email === email)
  },

  findUserById(id: string) {
    return this.users.find((u) => u.id === id)
  },

  createUser(data: Omit<User, "id" | "createdAt" | "role">) {
    const user: User = {
      id: String(this.users.length + 1),
      ...data,
      role: "USER",
      createdAt: new Date().toISOString(),
    }
    this.users.push(user)
    return user
  },

  findWords(query: string) {
    const pattern = new RegExp(query.toLowerCase().replace(/\*/g, "."))
    return this.words.filter((w) => pattern.test(w.word.toLowerCase()))
  },

  findWordsByCategory(category: string) {
    return this.words.filter((w) => w.category === category)
  },

  saveSearch(userId: string, query: string) {
    const search: SavedSearch = {
      id: this.savedSearches.length + 1,
      userId,
      query,
      createdAt: new Date().toISOString(),
    }
    this.savedSearches.push(search)
    return search
  },

  findSearchesByUser(userId: string) {
    return this.savedSearches.filter((s) => s.userId === userId)
  },
}

// Export categories for filtering
export const categories = [
  { id: "verbes", name: "Verbes" },
  { id: "noms", name: "Noms communs" },
  { id: "adjectifs", name: "Adjectifs" },
  { id: "adverbes", name: "Adverbes" },
  { id: "expressions", name: "Expressions" },
]

// Export difficulties for filtering
export const difficulties = [
  { id: "easy", name: "Facile" },
  { id: "medium", name: "Moyen" },
  { id: "hard", name: "Difficile" },
]

