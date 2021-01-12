import Vue from 'vue'
import Clipboard from 'clipboard'

export const clipboardSuccess = () => {
  Vue.prototype.$message('复制成功')
}

export const clipboardError = () => {
  Vue.prototype.$message('复制失败')
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
