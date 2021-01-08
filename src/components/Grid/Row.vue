<script lang="tsx">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { typeOptions, justifyOptions, alignOptions } from './types'
import { CreateElement } from 'vue/types'

@Component({
  name: 'Row',
})
export default class extends Vue {
  render(createElement: CreateElement) {
    return createElement(
      this.tag,
      {
        class: 'my-row',
        style: this.rowStyle,
      },
      this.$slots.default,
    )
  }

  // 间隔
  @Provide('gutter')
  @Prop({ type: Number, default: 0 }) gutter!:number

  // 布局模式，可选 flex，现代浏览器下有效
  @Prop({
    type: String,
    default: typeOptions[0],
    validator: (val) => typeOptions.includes(val),
  }) type!:string

  // flex 布局下的水平排列方式
  @Prop({
    type: String,
    default: justifyOptions[0],
    validator: (val) => justifyOptions.includes(val),
  }) justify!:string

  // flex 布局下的垂直排列方式
  @Prop({
    type: String,
    default: alignOptions[0],
    validator: (val) => alignOptions.includes(val),
  }) align!:string

  // 自定义元素标签
  @Prop({ type: String, default: 'div' }) tag!:string

  get rowStyle() {
    return {
      display: this.type,
      'justify-content': this.justify,
      'align-items': this.align,
      'margin-left': -this.gutter + 'px',
      'margin-right': -this.gutter + 'px',
      'flex-wrap': 'wrap',
      'white-space': 'normal',
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
