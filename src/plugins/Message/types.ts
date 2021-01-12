export interface HandleMessage {
  (message: string): void
}

export interface MessageInstance {
  message?: string
  isShow?: boolean
  duration?: number
  show?(): void
}
