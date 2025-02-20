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
  source?: string
  example?: string
}

export interface WordUsage {
  id: number
  wordId: number
  usage: string
  source: string
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

export interface RecentWord {
  id: number
  wordId: number
  viewedAt: string
}

export interface CrosswordDefinition {
  id: number
  wordId: number
  definition: string
  createdAt: string
}

export interface RelatedExpression {
  id: number
  wordId: number
  expression: string
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
    {
      id: 101,
      word: "CALIER",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 102,
      word: "CLAIRE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 201,
      word: "FULGURATION",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 202,
      word: "FOUDRE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 203,
      word: "ECLAT",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 204,
      word: "FLAMME",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 205,
      word: "LUEUR",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 206,
      word: "FLASH",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 207,
      word: "EBLOUISSEMENT",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 208,
      word: "MESSAGE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 209,
      word: "SPOT",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 210,
      word: "LUMIERE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 211,
      word: "CLARTE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 212,
      word: "RAYON",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 213,
      word: "SCINTILLEMENT",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 214,
      word: "ETINCELLE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 215,
      word: "ILLUMINATION",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 216,
      word: "FULGURANCE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 217,
      word: "LUISANCE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 218,
      word: "PHOSPHORESCENCE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 219,
      word: "FEU",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 220,
      word: "TONNERRE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 221,
      word: "ORAGE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 222,
      word: "TEMPETE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 300,
      word: "APARI",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 301,
      word: "APENS",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 302,
      word: "APERO",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 303,
      word: "APEXO",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 304,
      word: "APGAR",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 305,
      word: "APHIS",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 306,
      word: "APHTE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 307,
      word: "APICS",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 308,
      word: "APIDE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 309,
      word: "APIED",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 310,
      word: "APIOL",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 311,
      word: "APION",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 312,
      word: "APLAT",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 313,
      word: "APLET",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 314,
      word: "APNEE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 315,
      word: "APOCO",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 316,
      word: "APODE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 317,
      word: "APOIL",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 318,
      word: "APPAS",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 319,
      word: "APPAT",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 320,
      word: "APPEL",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 321,
      word: "APPLE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 322,
      word: "APPLI",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 323,
      word: "APPUI",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 324,
      word: "APRAT",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 325,
      word: "APREM",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 326,
      word: "APRES",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 327,
      word: "APTES",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 328,
      word: "APURA",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 329,
      word: "APURE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 330,
      word: "APYRE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 400,
      word: "CYAN",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 401,
      word: "CHAIR",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 402,
      word: "DONNEES",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 403,
      word: "RUDIMENTAIRES",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 404,
      word: "ELEMENTAIRE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 405,
      word: "TON",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 406,
      word: "OR",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 407,
      word: "ROUILLE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 408,
      word: "VERMEIL",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 409,
      word: "GREGE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 410,
      word: "FIGURE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 411,
      word: "CAMAIEU",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 412,
      word: "ROSEORANGE",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 413,
      word: "OUTREMER",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 414,
      word: "BIS",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 415,
      word: "VIOLET",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 416,
      word: "GRENAT",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 417,
      word: "AUBURN",
      categoryId: 1,
      difficultyId: 2,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 418,
      word: "ATOUT",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 419,
      word: "TEINTURE",
      categoryId: 1,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 420,
      word: "VELCRO",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 421,
      word: "EMBOLIE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 422,
      word: "ZIP",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 423,
      word: "GLISSIERE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 424,
      word: "FAILLITE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 425,
      word: "TIRETTE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 426,
      word: "ZIPPEE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 427,
      word: "ZIPPE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 428,
      word: "ZIPPER",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 429,
      word: "BRAGUETTE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 430,
      word: "BEA",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 431,
      word: "VERROU",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 432,
      word: "ABRI",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 433,
      word: "SERRURE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 434,
      word: "CLOTURE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 435,
      word: "RIDEAU",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 436,
      word: "EPAR",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 437,
      word: "BOUCHAGE",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 438,
      word: "ILEUS",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 439,
      word: "EPART",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 440,
      word: "SIFFLER",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    },
    {
      id: 441,
      word: "RAYER",
      categoryId: 2,
      difficultyId: 1,
      createdBy: "system",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: null,
      status: "APPROVED"
    }
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

  wordRelations: [
    {
      id: 1,
      wordId1: 6, // ECLAIR
      wordId2: 201, // FULGURATION
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 2,
      wordId1: 6,
      wordId2: 202, // FOUDRE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 3,
      wordId1: 6,
      wordId2: 203, // ECLAT
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 4,
      wordId1: 6,
      wordId2: 204, // FLAMME
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 5,
      wordId1: 6,
      wordId2: 205, // LUEUR
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 6,
      wordId1: 6,
      wordId2: 206, // FLASH
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 7,
      wordId1: 6,
      wordId2: 207, // EBLOUISSEMENT
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 8,
      wordId1: 6,
      wordId2: 208, // MESSAGE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 9,
      wordId1: 6,
      wordId2: 209, // SPOT
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 10,
      wordId1: 6,
      wordId2: 210, // LUMIERE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 11,
      wordId1: 6,
      wordId2: 211, // CLARTE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 12,
      wordId1: 6,
      wordId2: 212, // RAYON
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 13,
      wordId1: 6,
      wordId2: 213, // SCINTILLEMENT
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 14,
      wordId1: 6,
      wordId2: 214, // ETINCELLE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 15,
      wordId1: 6,
      wordId2: 215, // ILLUMINATION
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 16,
      wordId1: 6,
      wordId2: 216, // FULGURANCE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 17,
      wordId1: 6,
      wordId2: 217, // LUISANCE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 18,
      wordId1: 6,
      wordId2: 218, // PHOSPHORESCENCE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 19,
      wordId1: 6,
      wordId2: 219, // FEU
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 20,
      wordId1: 6,
      wordId2: 220, // TONNERRE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 21,
      wordId1: 6,
      wordId2: 221, // ORAGE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 22,
      wordId1: 6,
      wordId2: 222, // TEMPETE
      relationType: "SYNONYM",
      createdAt: "2024-02-01T00:00:00.000Z"
    }
  ] as WordRelation[],

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
      definition: "Lumière vive et soudaine causée par la foudre, qui brille entre les nuages et qui précède le bruit du tonnerre lors d'un orage.",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 7,
      wordId: 6,
      definition: "Éclat fugace.",
      isMainDefinition: false,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 8,
      wordId: 6,
      definition: "Manifestation brusque et rapide.",
      isMainDefinition: false,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 9,
      wordId: 6,
      definition: "Tout éclat de lumière étincelante et mobile qui paraît à la surface des objets.",
      isMainDefinition: false,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 10,
      wordId: 6,
      definition: "Gâteau en longueur, fait d'une pâte à choux, glacée sur le dessus, et fourrée de crème pâtissière à l'intérieur.",
      isMainDefinition: false,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 11,
      wordId: 6,
      definition: "Synonyme de anomie pelure (espèce d'animaux).",
      isMainDefinition: false,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 12,
      wordId: 6,
      definition: "Très rapide.",
      isMainDefinition: false,
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 13,
      wordId: 7,
      definition: "Simple",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 14,
      wordId: 8,
      definition: "Remporter",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 15,
      wordId: 9,
      definition: "Traction d'un bateau",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 16,
      wordId: 10,
      definition: "Ignorant",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 17,
      wordId: 11,
      definition: "Charcuterie",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 18,
      wordId: 12,
      definition: "Embarcation",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 19,
      wordId: 13,
      definition: "Jeter",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 20,
      wordId: 14,
      definition: "S'alimenter",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 21,
      wordId: 15,
      definition: "Couvrir d'une sauce",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 22,
      wordId: 16,
      definition: "Intervenir chirurgicalement",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 23,
      wordId: 17,
      definition: "Rame courte",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 24,
      wordId: 18,
      definition: "Minéral",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 25,
      wordId: 19,
      definition: "Véloce",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
    {
      id: 26,
      wordId: 20,
      definition: "Boire d'un trait",
      isMainDefinition: true,
      createdAt: "2024-02-01T00:00:00.000Z",
    },
  ] as WordDefinition[],

  wordUsages: [
    {
      id: 1,
      wordId: 6,
      usage: "L'éclair a illuminé le ciel nocturne",
      source: "Littérature",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 2,
      wordId: 6,
      usage: "Un délicieux éclair au chocolat",
      source: "Gastronomie",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 3,
      wordId: 6,
      usage: "Il est passé comme un éclair",
      source: "Expression courante",
      createdAt: "2024-02-01T00:00:00.000Z"
    }
  ] as WordUsage[],

  crosswordDefinitions: [
    {
      id: 1,
      wordId: 6,
      definition: "RENNE DU PERE NOEL",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 2,
      wordId: 6,
      definition: "MOMENT DE GENIE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 3,
      wordId: 6,
      definition: "MOMENT TRES COURT",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 4,
      wordId: 6,
      definition: "IL TOMBE DES NUES",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 5,
      wordId: 6,
      definition: "IL EST FOURRE A LA CREME",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 6,
      wordId: 6,
      definition: "MANIFESTATION SOUDAINE ET PASSAGERE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 7,
      wordId: 6,
      definition: "LUMIERE VIVE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 8,
      wordId: 6,
      definition: "CHOU ALLONGE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 9,
      wordId: 6,
      definition: "ATTRIBUT DE ZEUS",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 10,
      wordId: 6,
      definition: "PATISSERIE ALLONGEE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 101,
      wordId: 400,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 102,
      wordId: 401,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 103,
      wordId: 402,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 104,
      wordId: 403,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 105,
      wordId: 404,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 106,
      wordId: 405,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 107,
      wordId: 406,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 108,
      wordId: 407,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 109,
      wordId: 408,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 110,
      wordId: 409,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 111,
      wordId: 410,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 112,
      wordId: 411,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 113,
      wordId: 412,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 114,
      wordId: 413,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 115,
      wordId: 414,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 116,
      wordId: 415,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 117,
      wordId: 416,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 118,
      wordId: 417,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 119,
      wordId: 418,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 120,
      wordId: 419,
      definition: "COULEUR DE BASE",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 121,
      wordId: 420,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 122,
      wordId: 421,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 123,
      wordId: 422,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 124,
      wordId: 423,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 125,
      wordId: 424,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 126,
      wordId: 425,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 127,
      wordId: 426,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 128,
      wordId: 427,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 129,
      wordId: 428,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 130,
      wordId: 429,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 131,
      wordId: 430,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 132,
      wordId: 431,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 133,
      wordId: 432,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 134,
      wordId: 433,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 135,
      wordId: 434,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 136,
      wordId: 435,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 137,
      wordId: 436,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 138,
      wordId: 437,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 139,
      wordId: 438,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 140,
      wordId: 439,
      definition: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 141,
      wordId: 420,
      definition: "OPERATION ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 142,
      wordId: 421,
      definition: "OUVERTURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 143,
      wordId: 422,
      definition: "COURRIER ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 144,
      wordId: 423,
      definition: "PETIT ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 145,
      wordId: 424,
      definition: "ECLAIR CEREBRAL",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 146,
      wordId: 425,
      definition: "PASSAGES ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 147,
      wordId: 426,
      definition: "VISITE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 148,
      wordId: 427,
      definition: "ECLAIR LUMINEUX",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 149,
      wordId: 428,
      definition: "OPERATION ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 150,
      wordId: 440,
      definition: "OPERATION ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 151,
      wordId: 441,
      definition: "OPERATION ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    }
    
  ] as CrosswordDefinition[],

  relatedExpressions: [
    {
      id: 1,
      wordId: 6,
      expression: "FERMETURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 2,
      wordId: 6,
      expression: "OPERATION ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 3,
      wordId: 6,
      expression: "OUVERTURE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 4,
      wordId: 6,
      expression: "COURRIER ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 5,
      wordId: 6,
      expression: "PETIT ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 6,
      wordId: 6,
      expression: "ECLAIR CEREBRAL",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 7,
      wordId: 6,
      expression: "PASSAGES ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 8,
      wordId: 6,
      expression: "VISITE ECLAIR",
      createdAt: "2024-02-01T00:00:00.000Z"
    },
    {
      id: 9,
      wordId: 6,
      expression: "ECLAIR LUMINEUX",
      createdAt: "2024-02-01T00:00:00.000Z"
    }
  ] as RelatedExpression[],

  recentWords: [
    {
      id: 1,
      wordId: 6, // ECLAIR
      viewedAt: "2024-02-19T09:30:00.000Z"
    },
    {
      id: 2,
      wordId: 1, // EBAUBIR
      viewedAt: "2024-02-19T09:15:00.000Z"
    }
  ] as RecentWord[],

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

  findWordUsagesByWordId(wordId: number) {
    return this.wordUsages.filter(u => u.wordId === wordId)
  },

  findCrosswordDefinitionsByWordId(wordId: number) {
    return this.crosswordDefinitions.filter(d => d.wordId === wordId)
  },

  findRelatedExpressionsByWordId(wordId: number) {
    return this.relatedExpressions.filter(e => e.wordId === wordId)
  },

  findRecentWords(limit: number = 10) {
    return this.recentWords
      .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
      .slice(0, limit)
      .map(rw => {
        const word = this.findWordById(rw.wordId)
        return {
          ...word,
          viewedAt: rw.viewedAt
        }
      })
  },

  addRecentWord(wordId: number) {
    const now = new Date().toISOString()
    const newId = Math.max(...this.recentWords.map(rw => rw.id)) + 1
    
    // Vérifier si le mot existe déjà dans les récents
    const existingIndex = this.recentWords.findIndex(rw => rw.wordId === wordId)
    
    if (existingIndex !== -1) {
      // Mettre à jour la date de consultation
      this.recentWords[existingIndex].viewedAt = now
    } else {
      // Ajouter un nouveau mot récent
      this.recentWords.push({
        id: newId,
        wordId,
        viewedAt: now
      })
    }
    
    // Garder seulement les 10 derniers mots
    this.recentWords = this.recentWords
      .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
      .slice(0, 10)
  },

  getWordStats(wordId: number) {
    const word = this.findWordById(wordId)
    if (!word) return null

    // Récupérer toutes les définitions
    const definitions = this.findWordDefinitionsByWordId(wordId)
    
    // Récupérer les synonymes
    const synonyms = this.wordRelations
      .filter(r => (r.wordId1 === wordId || r.wordId2 === wordId) && r.relationType === "SYNONYM")
      .map(r => {
        const relatedWordId = r.wordId1 === wordId ? r.wordId2 : r.wordId1
        return this.findWordById(relatedWordId)
      })
      .filter(w => w !== undefined)

    // Récupérer les anagrammes
    const anagrams = this.words
      .filter(w => {
        if (w.id === wordId) return false
        return this.isAnagram(word.word, w.word)
      })

    // Récupérer les solutions de mots croisés
    const crosswordSolutions = this.words
      .filter(w => w.word.length >= 3 && w.word.length <= 10)
      .filter(w => this.areLettersContained(word.word, w.word))

    return {
      word: word.word,
      solutionsCount: crosswordSolutions.length,
      solutionsLengthRange: {
        min: Math.min(...crosswordSolutions.map(w => w.word.length)),
        max: Math.max(...crosswordSolutions.map(w => w.word.length))
      },
      synonymsCount: synonyms.length,
      synonymsLengthRange: {
        min: Math.min(...synonyms.map(w => w.word.length)),
        max: Math.max(...synonyms.map(w => w.word.length))
      },
      definitionsCount: definitions.length,
      crosswordDefinitionsCount: this.findCrosswordDefinitionsByWordId(wordId).length,
      anagramsCount: anagrams.length
    }
  },

  isAnagram(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) return false
    const sortLetters = (str: string) => str.split('').sort().join('')
    return sortLetters(word1) === sortLetters(word2)
  },

  areLettersContained(source: string, target: string): boolean {
    const sourceLetters = source.split('').reduce((acc, letter) => {
      acc[letter] = (acc[letter] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const targetLetters = target.split('').reduce((acc, letter) => {
      acc[letter] = (acc[letter] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(targetLetters).every(([letter, count]) => 
      (sourceLetters[letter] || 0) >= count
    )
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