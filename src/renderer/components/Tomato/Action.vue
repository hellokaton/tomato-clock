<template>
  <section class="section tomato-action has-text-centered">
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
.tomato-action {
  padding: 1rem;
}
.tomato-action button {
  width: 120px;
  height: 45px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
