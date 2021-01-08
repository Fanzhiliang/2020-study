<template>
  <div>
    <p>Home</p>
    <input v-model="value" type="text" placeholder="输入token">
    <button @click="sure">确定</button>

    <div class="block-20"></div>

    <div class="grid-panel">
      <my-row>
        <my-col :span="6" :xs="24">
          <div class="block block-head">头部</div>
        </my-col>
        <my-col :span="18" :xs="24">
          <div class="block block-main">内容</div>
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
  margin: 0 auto;
}

.block {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-size: 16px;

  &-head {
    background-color: red;
  }

  &-main {
    background-color: blue;
  }
}
</style>
