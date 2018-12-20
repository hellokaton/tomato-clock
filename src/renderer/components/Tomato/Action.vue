<template>
  <section class="section">
    <button class="button is-warning btn-start">START</button>
    <button class="button btn-reset">RESET</button>
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
.btn-start {
  background: #ccc;
}
</style>
