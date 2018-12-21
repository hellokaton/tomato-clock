<template>
  <section class="section tomato-planned has-text-centered">
    <span
      class="icon"
      v-for="(item, index) in rounds"
      :key="item"
    >
      <i
        class="fas fa-bullseye"
        :class="todayTomato.round > index ? 'finished' : ''"
      ></i>
    </span>
  </section>
</template>

<script>

import db from '../../store'

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
    const todayTomato = db.get('tomatos')
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
  padding-top: 1rem;
  padding-bottom: 0;
}
.tomato-planned span.icon {
  font-size: 15px;
  color: #ddd;
}
.finished {
  color: #23d160;
}
</style>
