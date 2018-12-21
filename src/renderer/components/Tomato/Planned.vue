<template>
  <section class="section tomato-planned has-text-centered">
    <span
      class="icon"
      v-for="item in plans"
      :key="item.id"
    >
      <i class="fas fa-bullseye"></i>
    </span>
  </section>
</template>

<script>

const plans = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

export default {
  data () {
    return {
      plans: plans
    }
  }
}
</script>

<style scoped>
.tomato-planned {
  padding-top: 1rem;
}
.tomato-planned span.icon {
  font-size: 15px;
  color: #ddd;
}
</style>
