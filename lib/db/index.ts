import { db, type User } from "./data"

// Simple in-memory database operations
export const database = {
  // Problems
  findProblems: () => {
    return Promise.resolve(db.problems)
  },

  findProblemBySlug: (slug: string) => {
    const problem = db.problems.find((p) => p.slug === slug)
    return Promise.resolve(problem)
  },

  // Solutions
  findSolutions: (query: string) => {
    const solutions = db.solutions.filter(
      (s) =>
        s.word.toLowerCase().includes(query.toLowerCase()) ||
        s.word.toLowerCase().match(query.toLowerCase().replace(/\*/g, ".")),
    )
    return Promise.resolve(solutions)
  },

  // Comments
  findCommentsByProblemId: (problemId: number) => {
    const comments = db.comments.filter((c) => c.problemId === problemId)
    return Promise.resolve(comments)
  },

  createComment: (data: Omit<Comment, "id" | "createdAt">) => {
    const comment = {
      id: db.comments.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
    }
    db.comments.push(comment)
    return Promise.resolve(comment)
  },

  // Users
  findUserByEmail: (email: string) => {
    const user = db.users.find((u) => u.email === email)
    return Promise.resolve(user)
  },

  createUser: (data: Omit<User, "id" | "createdAt">) => {
    const user = {
      id: String(db.users.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
    }
    db.users.push(user)
    return Promise.resolve(user)
  },
}

