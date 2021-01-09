let recalc = function() {}

const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

// 初始化 rem
export function init(maxWidth = 0) {
  const documentEl = document.documentElement
  recalc = function() {
    const clientWidth = !maxWidth || documentEl.clientWidth <= maxWidth ? documentEl.clientWidth : maxWidth
    if (!clientWidth) return
    documentEl.style.fontSize = 1 * (clientWidth / 750) + 'px'
  }
  if (document.addEventListener) {
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
  }
  recalc()
}

// 取消 rem
export function destroy() {
  const documentEl = document.documentElement
  documentEl.style.fontSize = ''
  if (document.removeEventListener) {
    window.removeEventListener(resizeEvt, recalc)
    document.removeEventListener('DOMContentLoaded', recalc)
  }
}

export default {
  init,
  destroy,
}
