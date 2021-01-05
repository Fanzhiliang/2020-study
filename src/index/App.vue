<template>
  <div class="msg">{{ msg }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: '这个是index组件',
    }
  },
}
</script>

<style lang="scss">
  $color: #FFFFFF;

  .msg {
    color: $color;
  }
</style>
