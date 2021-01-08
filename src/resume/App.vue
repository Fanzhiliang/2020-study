<template>
  <div id="app">
    <div>{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
})
export default class extends Vue {
  msg = 'Resume'
}
</script>

<style lang="scss">
body {
  background-color: #FFFFFF;
}
</style>
