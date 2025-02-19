function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

type ErrorLog = {
  id: string
  timestamp: string
  error: string
  stack?: string
  context?: string
  userId?: string
}

class ErrorLogger {
  private static instance: ErrorLogger
  private errors: ErrorLog[] = []

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger()
    }
    return ErrorLogger.instance
  }

  log(error: Error, context?: string, userId?: string) {
    const errorLog: ErrorLog = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      context,
      userId,
    }

    this.errors.push(errorLog)
    console.error(`[${errorLog.timestamp}] ${context ? `[${context}] ` : ""}Error:`, error)

    return errorLog.id
  }

  getErrors() {
    return this.errors
  }

  getErrorById(id: string) {
    return this.errors.find((e) => e.id === id)
  }

  clearErrors() {
    this.errors = []
  }
}

export const errorLogger = ErrorLogger.getInstance()

