<template>
  <div class="info">
    <line-title title="专业技能" />
    <color-list :list="skillList" />

    <line-title title="项目经历" />
    <project v-for="(item, index) in projectList" :key="index" :data="item" />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineTitle from './LineTitle.vue'
import ColorList from './ColorList.vue'
import { Project, ProjectData } from './Project'

@Component({
  name: 'Info',
  components: {
    LineTitle,
    ColorList,
    Project,
  },
})
export default class extends Vue {
  skillList: string[] = [
    '基础知识扎实，能用JavaScript、Css、Html结合现代框架来制作前端应用',
    '掌握 vue、vue-router、vuex、vue-cli3 全家桶的使用，了解webpack的常用配置',
    '使用 uni-app 开发微信小程序和安卓app',
    '使用 vue-element-admin 搭建后台管理系统',
    '微信小程序登录、支付、定位等功能流程',
    '掌握 Git 基本使用',
  ]

  projectList: ProjectData[] = [
    {
      name: '雪健农场',
      info: '广州逗芽科技',
      tags: ['安卓app'],
      detail: '服务雪健农场内农民的买卖粮食需求，粮食贮藏、加工、出售预约，还有农场产品销售，社区文章交流。负责全部前端开发，安卓app和后台管理系统的前端页面制作和对接接口，使用 uni-app 框架基于 vue 语法开发基于 uni-app 构建安卓项目，使用 nvue 提高页面性能，原生子窗体等技巧完成弹框交互。实现基本商城功能、农民预约服务、我的地址定位功能，可使用微信、支付宝、银联支付(银联使用网页支付实现)社区基本功能的实现，使用简单的富文本发布文章。农场后台使用 vue-element-admin 模板制作。',
    },
  ]
}
</script>

<style lang="scss" scoped>
.info {
  min-height: 100%;
  background-color: #FFFFFF;
  padding: 20rem;
}
</style>
