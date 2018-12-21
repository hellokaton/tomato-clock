<template>
  <div>
    <section class="section tomato-timer has-text-centered">
      <h1 class="title">{{`${minutes}:${seconds}`}}</h1>
    </section>
    <section class="section tomato-action has-text-centered">
      <button
        class="button is-warning btn-start"
        @click="toggleTimer"
        v-text="isTimerActive ? 'PAUSE' : 'START'"
      >START</button>
      <button
        class="button btn-reset"
        @click="resetUI"
      >RESET</button>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // Settings
      initWork: 25,
      initShortBreak: 5,

      // App state
      isBreakTime: false,
      isTimerActive: false,
      minutes: 25,
      seconds: '00',
      timer: null,
      round: 0,
      // UI
      isModalOpen: false
    }
  },
  methods: {
    toggleModal: function () {
      this.isModalOpen = !this.isModalOpen
    },
    resetUI () {
      this.isBreakTime = false
      this.isTimerActive = false
      this.minutes = this.initWork
      this.seconds = '00'
      clearInterval(this.timer)
    },
    toggleTimer () {
      let self = this
      function countDown () {
        let seconds = Number(self.$data.seconds)
        let minutes = self.minutes
        let isBreak = self.isBreakTime

        if (seconds === 0) {
          if (minutes === 0) { // End of cycle => switch to break / work
            isBreak ? self.minutes = self.initWork : self.minutes = self.initShortBreak
            self.isBreakTime = !self.isBreakTime
          } else { // Remove minute + start counting down from 60 seconds again
            self.minutes--
            self.seconds = '59'
          }
        } else { // Remove seconds + if less than 10 prepend 0
          seconds <= 10 ? self.seconds = `0${self.seconds - 1}` : self.seconds = `${self.seconds - 1}`
        }
      }

      // toggle timer
      self.isTimerActive ? clearInterval(self.timer) : self.timer = setInterval(countDown, 1000)
      self.isTimerActive = !self.isTimerActive
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Contrail+One");
.tomato-timer {
  padding-top: 3rem;
  padding-bottom: 1.5rem;
}

.tomato-timer h1 {
  font-size: 80px;
  color: white;
  font-family: "Contrail One";
  text-shadow: 0.2rem 0.5rem 0 #000;
}

.tomato-action {
  padding-top: 0;
  padding-bottom: 0;
}

.tomato-action button {
  width: 130px;
  height: 40px;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
