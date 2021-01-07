<template>
  <div>
    <p>About</p>
    <p>{{ token }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'

@Component({
  name: 'About',
})
export default class extends Vue {
  get token() {
    return UserModule.token
  }
}
</script>

<style>

</style>
