<template>
  <div id="app" v-if="isFinal">
    <my-row class="resume-wrap" type="flex" align="stretch">
      <my-col :span="7" :xs="24">
        <My :data="info" />
      </my-col>
      <my-col :span="17" :xs="24">
        <Info :skillList="skillList" :projectList="projectList" :summaryList="summaryList" />
      </my-col>
    </my-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Row, Col } from '@/components/Grid'
import My from './components/My.vue'
import InfoComponent from './components/Info.vue'
import Variable from './styles/variable.module.scss'
import Rem from '@/utils/rem'
import { getInfo, Info, getSkillList, getProjectList, Project, getSummaryList } from './api/resume'

@Component({
  name: 'App',
  components: {
    MyRow: Row,
    MyCol: Col,
    My,
    Info: InfoComponent,
  },
})
export default class extends Vue {
  beforeCreate() {
    Rem.init(parseInt(Variable.maxWidth))
  }

  // 是否完成可以渲染试图
  isFinal = false

  // 个人信息
  info: Info = null

  // 获取个人信息
  getInfo() {
    return getInfo({}).then(res => {
      this.info = res.data
    })
  }

  // 技能列表
  skillList: string[] = []

  // 获取技能列表
  getSkillList() {
    return getSkillList({}).then(res => {
      this.skillList = res.data
    })
  }

  // 项目列表
  projectList: Project[] = []

  // 获取项目列表
  getProjectList() {
    return getProjectList({}).then(res => {
      this.projectList = res.data
    })
  }

  // 个人总结列表
  summaryList: string[] = []

  // 获取个人总结列表
  getSummaryList() {
    return getSummaryList({}).then(res => {
      this.summaryList = res.data
    })
  }

  created() {
    Promise.all([
      this.getInfo(),
      this.getSkillList(),
      this.getProjectList(),
      this.getSummaryList(),
    ]).then(() => {
      this.isFinal = true
    })
  }

  // beforeDestroy() {
  //   Rem.destroy()
  // }
}
</script>

<style>
@import url('./styles/icons/iconfont.css');
</style>

<style lang="scss">
html, body {
  height: 100%;
  min-height: 100%;
  background-color: $bg-color;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

#app {
  max-width: $max-width;
  margin: 30px auto;
  background-color: #FFFFFF;
  box-shadow: 0 0 10px rgba(136, 136, 136, 0.2);
}

.resume-wrap {
  min-height: 100vh;
}

@media (max-width: $max-width + 20px) {
  #app {
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: none;
  }
}

@media (max-width: $screen-xs-max) {
  html, body {
    background-color: #FFFFFF;
  }

  .resume-wrap {
    min-height: auto;
  }
}
</style>
