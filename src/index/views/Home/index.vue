<template>
  <div>
    <p>Home</p>
    <input v-model="value" type="text" placeholder="输入token">
    <button @click="sure">确定</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    sure() {
      if (this.value) {
        this.$store.commit('setToken', this.value)
        this.value = ''
      }
    }
  }
}
</script>

<style>

</style>