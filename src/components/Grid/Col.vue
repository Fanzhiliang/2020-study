<script lang="tsx">
import { Component, Vue, Inject, Prop } from 'vue-property-decorator'
import { ColProps } from './types'
import { CreateElement } from 'vue/types'

@Component({
  name: 'Col',
})
export default class extends Vue implements ColProps {
  render(createElement: CreateElement) {
    return createElement(
      this.tag,
      {
        class: 'my-col ' + this.colClassName + ' ' + this.offsetClassName + ' ' + this.offsetColClassName,
        style: this.colStyle,
      },
      this.$slots.default,
    )
  }

  // 间隔
  @Inject('gutter') gutter!:number

  // 占据的列数
  @Prop({ type: Number, default: 24 }) span!:number

  readonly colTypeList: string[] = ['xs', 'sm', 'md', 'lg', 'xl']

  // 不同分辨率下的占据
  @Prop({ type: [Number, Object], default: 0 }) xs!:number | ColProps
  @Prop({ type: [Number, Object], default: 0 }) sm!:number | ColProps
  @Prop({ type: [Number, Object], default: 0 }) md!:number | ColProps
  @Prop({ type: [Number, Object], default: 0 }) lg!:number | ColProps
  @Prop({ type: [Number, Object], default: 0 }) xl!:number | ColProps

  readonly offsetTypeList: string[] = ['push', 'pull']

  // 左右偏移距离
  @Prop({ type: Number, default: 0 }) push!:number
  @Prop({ type: Number, default: 0 }) pull!:number

  // 列数的类名
  get colClassName(): string {
    return this.colTypeList.map(type => {
      return `my-col-${type}-${typeof this.$props[type] === 'number' && this.$props[type] > 0 ? this.$props[type] : this.span}`
    }).join(' ')
  }

  // 偏移的类名
  get offsetClassName(): string {
    return this.offsetTypeList.map(type => `my-col-${type}-${this.$props[type]}`).join(' ')
  }

  // 不同分辨率下偏移的类名
  get offsetColClassName(): string {
    return this.colTypeList.map(type => {
      if (typeof this.$props[type] === 'object') {
        const temp = this.$props[type] as ColProps
        const result = []
        console.log(temp)
        if (temp.span) {
          result.push(`my-col-${type}-${temp.span}`)
        }
        if (temp.push) {
          result.push(`my-col-${type}-push-${temp.push}`)
        }
        if (temp.pull) {
          result.push(`my-col-${type}-pull-${temp.pull}`)
        }
        console.log(result.join(' '))
        return result.join(' ')
      }
      return ''
    }).join(' ')
  }

  // 自定义元素标签
  @Prop({ type: String, default: 'div' }) tag!:string

  get colStyle() {
    return {
      'padding-left': this.gutter + 'px',
      'padding-right': this.gutter + 'px',
    }
  }
}
</script>

<style>

</style>
