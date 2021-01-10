<template>
  <div class="info">
    <line-title title="专业技能" />
    <color-list :list="skillList" />

    <line-title title="项目经历" />
    <project v-for="(item, index) in projectList" :key="index" :data="item" />

    <line-title title="个人总结" />
    <color-list :list="summaryList" :isDisc="false" />

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
    '能用JavaScript、Css、Html结合现代框架来制作前端应用',
    '掌握 vue、vue-router、vuex、vue-cli3 全家桶的使用，了解webpack的基本配置',
    '使用 uni-app 开发微信小程序和安卓app',
    '使用 vue-element-admin 搭建后台管理系统',
    '微信小程序登录、支付、定位等功能流程',
    '掌握 Git 基本使用',
  ]

  projectList: ProjectData[] = [
    {
      name: '雪健农场',
      link: 'http://www.sowjoyfarm.com',
      tags: ['安卓app'],
      detail: '服务雪健农场内农民的买卖粮食需求，粮食贮藏、加工、出售预约，还有农场产品销售，社区文章交流。负责全部前端开发，安卓app和后台管理系统的前端页面制作和对接接口，使用 uni-app 框架基于 vue 语法开发基于 uni-app 构建安卓项目，使用 nvue 提高页面性能，原生子窗体等技巧完成弹框交互。实现基本商城功能、农民预约服务、我的地址定位功能，可使用微信、支付宝、银联支付(银联使用网页支付实现)社区基本功能的实现，使用简单的富文本发布文章。农场后台使用 vue-element-admin 模板制作。',
    },
    {
      name: '云售PLUS',
      info: '广州逗芽科技',
      tags: ['微信小程序'],
      detail: '零售商品小程序，实现基本的购物车结算流程，优惠券和店铺活动，收藏评论功能，订单的付款、查看、退款、了解配送情况等功能。负责全部前端开发，微信小程序和后台管理系统的前端页面制作和对接接口，使用 uni-app 框架基于 vue 语法开发。基于 uni-app 构建微信小程序项目，完成微信登录和微信支付流程，使用分包解决包大小限制。实现基本商城功能，商品规格选择，购物车数据、个人信息、定位使用 vuex 管理，未付款订单倒计时等。使用腾讯地图sdk实现定位功能、搜索和获取附近地址，使用高德地图sdk获取配送路径的获取并把配送路径绘制到 map 组件上。使用腾讯Im实现顾客和团长聊天联系',
    },
    {
      name: '云售PLUS团长端',
      info: '广州逗芽科技',
      tags: ['安卓app', 'web管理后台'],
      detail: '团长端app，主要功能是管理店铺信息，查看、领取、分配订单，查看订单配送路径，聊天，提现等功能。团长端后台，对比app增加了商品、优惠券、活动、店铺区域管理，我负责店铺区域划分、聊天、菜单权限功能，使用 vue-element-admin 模板制作。平台后台，店铺、用户、平台优惠券、权限管理，我负责接口权限、菜单、角色权限功能，使用 vue-element-admin 模板制作。配送路径和聊天的实现方法和小程序相同，配送路径只是参考，有打开高德地图或者百度地图导航的功能。app实现用图表查看某段时间内店铺的订单、收入情况。团长端后台使用 vue-amap 组件的多边形功能实现店铺的区域划分功能。团长端后台和平台后台都实现了不同角色获取不同的路由表，通过 vue-router 生成不同的可访问页面来实现权限功能',
    },
  ]

  summaryList: string[] = [
    '毕业后一直学习使用 uni-app 开发微信小程序和安卓app，web端项目都是后台管理系统所以web端经验较少。学习能力还行，在工作期间也接触做过 flutter 项目和用 autojs 做安卓脚本，但是学了并没有在上线的项目里面用到。',
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
