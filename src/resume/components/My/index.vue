<template>
  <div class="my">
    <div class="avatar">
      <img src="http://xinpuduoautoparts.cdn.test.douyait.cn/1610173160709_avatar.jpg" alt="">
    </div>

    <h2 class="name">樊致良</h2>

    <h3 class="job">Web前端</h3>

    <p class="info">男 / 24岁</p>

    <p class="info">广东技术师范学院天河学院 - 计算机科学与技术</p>

    <p class="info">本科 / 2019年毕业</p>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'My',
})
export default class extends Vue {

}
</script>

<style lang="scss">
.my {
  min-height: 100%;
  background-color: $bg-color;
}
</style>
