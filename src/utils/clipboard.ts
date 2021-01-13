import { message } from '@/plugins/Message/index.ts'
import Clipboard from 'clipboard'

export const clipboardSuccess = () => {
  message('复制成功')
}

export const clipboardError = () => {
  message('复制失败')
}

export const handleClipboard = (text: string, event: MouseEvent) => {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  });
  (clipboard as any).onClick(event)
}
