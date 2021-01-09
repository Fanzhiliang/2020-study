<template>
  <div class="line-title">
    <h2 class="value">{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'LineTitle',
})
export default class extends Vue {
  @Prop({
    type: String,
    default: '',
    required: true,
  })title!:string
}
</script>

<style lang="scss">
  $height: 30rem;

  .line-title {
    height: $height;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgb(216, 216, 216);
    }

    .value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $primary-color;
      font-size: 16rem;
      margin: 0;
      padding: 0 20rem;
      z-index: 2;
      background-color: #FFFFFF;
    }
  }
</style>
