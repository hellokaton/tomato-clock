<template>
  <section class="section">
    <h1 class="title is-1">25:00</h1>
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
.timer {
  font-size: 48px;
  font-weight: bold;
}
</style>
