<template>
  <ul class="color-list" :class="{
    'disc': isDisc
  }">
    <li class="item" v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'SkillList',
})
export default class extends Vue {
  @Prop({
    type: Array,
    default: () => ([]),
  })
  list!: string[]

  // 是否显示实心圆
  @Prop({
    type: Boolean,
    default: true,
  })
  isDisc!: boolean
}
</script>

<style lang="scss">
.color-list {
  margin: 0;
  padding: 0;
  .item {
    list-style: none;
    margin: 5rem 0;
    font-size: 10rem;
    color: $text-color;
  }

  &.disc {
    .item {
      &::before {
        content: '●';
        color: $primary-color;
        margin-right: 5rem;
      }
    }
  }

  @media (max-width: $screen-xs-max) {
    .item {
      font-size: 20rem;
    }
  }
}

</style>
