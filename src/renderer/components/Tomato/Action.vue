<template>
  <section class="section tomato-action has-text-centered">
    <button
      class="button is-warning btn-start"
      @click="doStart"
    >START</button>
    <button
      class="button btn-reset"
      @click="doReset"
    >RESET</button>
  </section>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    doStart () {
      console.log('start tomato')
    },
    doReset () {
      console.log('reset tomato')
    }
  }
}
</script>

<style scoped>
.tomato-action {
  padding-top: 2rem;
}

.tomato-action button {
  width: 130px;
  height: 40px;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
