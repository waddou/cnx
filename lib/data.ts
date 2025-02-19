export interface User {
  id: string
  username: string | null
  email: string
  passwordHash: string
  createdAt: string
  role: "USER" | "ADMIN" | "MODERATOR"
  lastLogin: string | null
}

export interface Word {
  id: number
  word: string
  categoryId: number
  difficultyId: number
  createdBy: string
  createdAt: string
  updatedAt: string | null
  status: "PENDING" | "APPROVED" | "REJECTED"
}

export interface Category {
  id: number
  name: string
}

export interface Difficulty {
  id: number
  name: string
}

export interface SavedSearch {
  id: number
  userId: string
  query: string
  createdAt: string
}

export interface Comment {
  id: number
  wordId: number
  userId: string
  content: string
  createdAt: string
}

export interface Vote {
  id: number
  wordId: number
  userId: string
  voteType: "UP" | "DOWN"
  createdAt: string
}

export interface GameSession {
  id: number
  userId: string
  startTime: string
  endTime: string | null
  score: number
}

export interface GameSessionWord {
  id: number
  gameSessionId: number
  wordId: number
  isCorrect: boolean
  responseTime: number
}

export interface Notification {
  id: number
  userId: string
  message: string
  createdAt: string
  isRead: boolean
}

export interface WordRelation {
  id: number
  wordId1: number
  wordId2: number
  relationType: "SYNONYM" | "ANTONYM" | "RELATED"
  createdAt: string
}

export interface WordDefinition {
  id: number
  wordId: number
  definition: string
  isMainDefinition: boolean
  createdAt: string
}

export interface Puzzle {
  id: number
  title: string
  categoryId: number
  difficultyId: number
  createdById: string
  createdAt: string
}

export interface PuzzleClue {
  id: number
  puzzleId: number
  clue: string
  answerId: number
  createdAt: string
}

export interface PuzzleAttempt {
  id: number
  puzzleId: number
  userId: string
  attempt: string
  isCorrect: boolean
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
      lastLogin: null,
    },
    {
      id: "2",
      username: "jean.dupont",
      email: "jean@fsolver.fr",
      passwordHash: "$2a$10$NQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN.6IHZeGqHe3qOATrYy2", // password123
      createdAt: "2024-02-01T00:00:00.000Z",
      role: "USER",
      lastLogin: null,
    },
    {
      id: "3",
      username: "marie.martin",
      email: "marie@fsolver.fr",
      passwordHash: "$2a$10$NQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN.6IHZeGqHe3qOATrYy2", // password123
      createdAt: "2024-02-01T00:00:00.000Z",
      role: "USER",
      lastLogin: null,
    },
  ] as User[],

  words: [
    {
      id: 1,
      word: "EBAUBIR",
      categoryId: 1,
      difficultyId: 3,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 2,
      word: "ABATTRE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 3,
      word: "BALADE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 4,
      word: "CABANE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 5,
      word: "DAMIER",
      categoryId: 2,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 6,
      word: "ECLAIR",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 7,
      word: "FACILE",
      categoryId: 3,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 8,
      word: "GAGNER",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 9,
      word: "HALAGE",
      categoryId: 2,
      difficultyId: 3,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 10,
      word: "IGNARE",
      categoryId: 3,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 11,
      word: "JAMBON",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 12,
      word: "KAYAK",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 13,
      word: "LANCER",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 14,
      word: "MANGER",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 15,
      word: "NAPPER",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 16,
      word: "OPERER",
      categoryId: 1,
      difficultyId: 3,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 17,
      word: "PAGAIE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 18,
      word: "QUARTZ",
      categoryId: 2,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 19,
      word: "RAPIDE",
      categoryId: 3,
      difficultyId: 1,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
    {
      id: 20,
      word: "SABLER",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "1",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED",
    },
  ] as Word[],

  categories: [
    { id: 1, name: "verbes" },
    { id: 2, name: "noms" },
    { id: 3, name: "adjectifs" },
  ] as Category[],

  difficulties: [
    { id: 1, name: "easy" },
    { id: 2, name: "medium" },
    { id: 3, name: "hard" },
  ] as Difficulty[],

  savedSearches: [] as SavedSearch[],

  comments: [] as Comment[],

  votes: [] as Vote[],

  gameSessions: [] as GameSession[],

  gameSessionWords: [] as GameSessionWord[],

  notifications: [] as Notification[],

  wordRelations: [] as WordRelation[],

  wordDefinitions: [
    {
      id: 1,
      wordId: 1,
      definition: "Étonner fortement",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 2,
      wordId: 2,
      definition: "Faire tomber",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 3,
      wordId: 3,
      definition: "Promenade",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 4,
      wordId: 4,
      definition: "Petite maison",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 5,
      wordId: 5,
      definition: "Plateau de jeu",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 6,
      wordId: 6,
      definition: "Lumière brève",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 7,
      wordId: 7,
      definition: "Simple",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 8,
      wordId: 8,
      definition: "Remporter",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 9,
      wordId: 9,
      definition: "Traction d'un bateau",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 10,
      wordId: 10,
      definition: "Ignorant",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 11,
      wordId: 11,
      definition: "Charcuterie",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 12,
      wordId: 12,
      definition: "Embarcation",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 13,
      wordId: 13,
      definition: "Jeter",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 14,
      wordId: 14,
      definition: "S'alimenter",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 15,
      wordId: 15,
      definition: "Couvrir d'une sauce",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 16,
      wordId: 16,
      definition: "Intervenir chirurgicalement",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 17,
      wordId: 17,
      definition: "Rame courte",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 18,
      wordId: 18,
      definition: "Minéral",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 19,
      wordId: 19,
      definition: "Véloce",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 20,
      wordId: 20,
      definition: "Boire d'un trait",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
  ] as WordDefinition[],

  puzzles: [] as Puzzle[],

  puzzleClues: [] as PuzzleClue[],

  puzzleAttempts: [] as PuzzleAttempt[],

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
      lastLogin: null,
    }
    this.users.push(user)
    return user
  },

  findWords(query: string) {
    const pattern = new RegExp(query.toLowerCase().replace(/\*/g, "."))
    return this.words.filter((w) => pattern.test(w.word.toLowerCase()))
  },

  findWordsByCategory(category: string) {
    const categoryId = this.categories.find((c) => c.name === category)?.id
    if (categoryId === undefined) return []
    return this.words.filter((w) => w.categoryId === categoryId)
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

  findWordById(id: number) {
    return this.words.find((w) => w.id === id)
  },

  findWordDefinitionsByWordId(wordId: number) {
    return this.wordDefinitions.filter((d) => d.wordId === wordId)
  },

  findMainDefinitionByWordId(wordId: number) {
    return this.wordDefinitions.find((d) => d.wordId === wordId && d.isMainDefinition)
  },

  createWord(data: Omit<Word, "id" | "createdAt" | "updatedAt" | "status">) {
    const word: Word = {
      id: this.words.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      status: "PENDING",
    }
    this.words.push(word)
    return word
  },

  createWordDefinition(data: Omit<WordDefinition, "id" | "createdAt">) {
    const definition: WordDefinition = {
      id: this.wordDefinitions.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
    }
    this.wordDefinitions.push(definition)
    return definition
  },

  updateMainDefinition(wordId: number, definitionId: number) {
    this.wordDefinitions.forEach((d) => {
      if (d.wordId === wordId) {
        d.isMainDefinition = d.id === definitionId
      }
    })
  },
}

// Export categories for filtering
export const categoriesForFiltering = [
  { id: "verbes", name: "Verbes" },
  { id: "noms", name: "Noms communs" },
  { id: "adjectifs", name: "Adjectifs" },
  { id: "adverbes", name: "Adverbes" },
  { id: "expressions", name: "Expressions" },
]

// Export difficulties for filtering
export const difficultiesForFiltering = [
  { id: "easy", name: "Facile" },
  { id: "medium", name: "Moyen" },
  { id: "hard", name: "Difficile" },
]