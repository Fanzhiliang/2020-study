<template>
  <div>
    <p>About</p>
    <p>{{ token }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapGetters(['token']),
  },
}
</script>

<style>

</style>
