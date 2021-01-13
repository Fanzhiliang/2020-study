export interface HandleMessage {
  (message: string): void
}

export interface MessageInstance {
  message?: string
  isShow?: boolean
  duration?: number
  show?(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $message: HandleMessage
    prototype: {
      $message: HandleMessage
    }
  }
}
