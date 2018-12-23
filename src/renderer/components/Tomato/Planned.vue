<template>
  <section class="section tomato-planned has-text-centered">
    <span
      class="icon"
      v-for="(item, index) in rounds"
      :key="item"
    >
      <i
        class="mdi"
        :class="todayTomato.round > index ? 'mdi-check-circle finished' : 'mdi-circle-outline'"
      ></i>
    </span>
  </section>
</template>

<script>
export default {
  data () {
    return {
      rounds: 10,
      todayTomato: {
        round: 0
      }
    }
  },
  created () {
    const today = this.todayDate()
    const todayTomato = this.$db.get('tomatos')
      .find({ date: today })
      .value()

    if (todayTomato) {
      this.todayTomato = todayTomato
    }
  }
}
</script>

<style scoped>
.tomato-planned {
  padding-top: 0;
  padding-bottom: 0;
}
.tomato-planned span.icon {
  font-size: 18px;
  color: #ddd;
}
.finished {
  color: #4ec176;
  text-shadow: 1px 1px 0 #ef0505;
}
</style>
