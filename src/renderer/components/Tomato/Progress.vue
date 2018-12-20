<template>
  <section class="section">
    <ul>
      <li>0</li>
      <li>0</li>
      <li>0</li>
      <li>0</li>
      <li>0</li>
    </ul>
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
