<template>
  <div>
    <p>Home</p>
    <input v-model="value" type="text" placeholder="输入token">
    <button @click="sure">确定</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'

@Component({
  name: 'Home',
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

<style>

</style>
