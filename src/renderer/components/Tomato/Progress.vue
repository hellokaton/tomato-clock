<template>
  <section class="section">
    <ul>
      <li
        v-for="item in plans"
        :key="item.id"
      >
        <b-icon
          pack="fas"
          icon="user"
          size="is-small"
        >
        </b-icon>
      </li>
    </ul>
  </section>
</template>

<script>

const plans = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

export default {
  data () {
    return {
      plans: plans,
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
