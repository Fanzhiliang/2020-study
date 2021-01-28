export type HandleMessage = (message: string) => void

export interface MessageInstance {
  message?: string
  isShow?: boolean
  duration?: number
  show?(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    prototype: {
      $message: HandleMessage
    }
  }
}
