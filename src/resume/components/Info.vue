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
import { Component, Vue, Prop } from 'vue-property-decorator'
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
  @Prop({
    type: Array,
    default: () => [],
  })
  skillList!: string[]

  @Prop({
    type: Array,
    default: () => [],
  })
  projectList!: ProjectData[]

  @Prop({
    type: Array,
    default: () => [],
  })
  summaryList!: string[]
}
</script>

<style lang="scss" scoped>
.info {
  min-height: 100%;
  background-color: #FFFFFF;
  padding: 20rem;
}
</style>
