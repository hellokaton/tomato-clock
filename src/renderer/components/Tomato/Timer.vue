<template>
  <section class="section tomato-timer has-text-centered">
    <h1 class="title">25:00</h1>
  </section>
</template>

<script>
export default {
  data () {
    return {
      electron: process.versions.electron,
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version
    }
  }
}
</script>

<style scoped>
.tomato-timer {
  padding: 3rem 1rem 0;
}
.tomato-timer h1 {
  font-size: 80px;
  color: white;
  font-family: monospace;
}
</style>
