<template>
  <div>
    <p>Home</p>
    <input v-model="value" type="text" placeholder="输入token">
    <button @click="sure">确定</button>

    <div class="block-20"></div>

    <div class="grid-panel">
      <my-row type="flex">
        <my-col :span="8">
          头部
        </my-col>
        <my-col :span="16">
          内容
        </my-col>
      </my-row>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'
import { Row, Col } from '@/components/Grid'

@Component({
  name: 'Home',
  components: {
    MyRow: Row,
    MyCol: Col,
  },
})
export default class extends Vue {
  value = ''

  sure() {
    if (this.value) {
      UserModule.setToken(this.value)
      this.value = ''
    }
  }
}
</script>

<style lang="scss">
.grid-panel {
  max-width: $max-width;
}
</style>
