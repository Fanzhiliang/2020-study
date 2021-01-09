<template>
  <div class="project">
    <div class="title">
      <div class="info">广州逗芽科技</div>
      <div class="name">雪健农场</div>
    </div>
    <p class="detail">
      <span class="tag">安卓app</span>
      <span class="value">服务雪健农场内农民的买卖粮食需求，粮食贮藏、加工、出售预约，还有农场产品销售，社区文章交流。负责全部前端开发，安卓app和后台管理系统的前端页面制作和对接接口，使用 uni-app 框架基于 vue 语法开发基于 uni-app 构建安卓项目，使用 nvue 提高页面性能，原生子窗体等技巧完成弹框交互。实现基本商城功能、农民预约服务、我的地址定位功能，可使用微信、支付宝、银联支付(银联使用网页支付实现)社区基本功能的实现，使用简单的富文本发布文章。农场后台使用 vue-element-admin 模板制作。</span>
    </p>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ProjectData } from './types'

@Component({
  name: 'Project',
})
export default class extends Vue {
  // render() {
  //   return <div></div>
  // }

  @Prop({
    type: Object,
    default: () => ({}),
  })
  data: ProjectData = {}
}
</script>

<style lang="scss">
@mixin normal-text {
  font-size: 10rem;
  color: $text-color;
  vertical-align: middle
}

.project {
  @include normal-text;
  padding-top: 10rem;
  .title {
    font-size: 0;
    letter-spacing: 0;
    & > * {
      @include normal-text;
      font-size: 11.5rem;
    }
    .info {
      @include ellipsis;
      display: inline-block;
      width: 35%;
      font-size: 12rem;
    }

    .name {
      display: inline-block;
      width: 65%;
      color: #333333;
      font-weight: bold;
    }
  }

  .detail {
    .tag {
      background-color: #F5F5F5;
      color: #666666;
      font-size: 9rem;
      font-weight: bold;
      padding: 2rem 5rem;
      display: inline-block;
      border-radius: 5rem;
    }
  }
}
</style>
