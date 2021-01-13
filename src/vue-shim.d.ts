declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 定义全局变量 window
declare const global: {
  something(): void
}
