<template>
  <div class="sleep-time">
    <div>
      我是小计时器
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      time: 5,
      minutes: 20,
      seconds: '00',
      timer: null,
      isTimerActive: false
    }
  },
  created () {
    this.time = this.$route.query.time
    console.log('time:', this.time)

    let self = this
    function countDown () {
      let seconds = Number(self.$data.seconds)
      let minutes = self.minutes
      // let isBreak = self.isBreakTime

      if (seconds === 0) {
        if (minutes === 0) {
          //
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
</script>
<style scoped>
.sleep-time {
  width: 100%;
  min-height: 768px;
  height: 100%;
  overflow: hidden;
  background-image: url("/static/bg.jpg");
  background-size: cover;
}
</style>


