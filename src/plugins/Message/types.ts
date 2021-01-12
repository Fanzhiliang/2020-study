import Vue from 'vue'

export interface MessageInterface {
  (message: string): void
}

export interface MessageInstance extends Vue {
  message?: string
  isShow?: boolean
  duration?: number
  show?(): void
}
