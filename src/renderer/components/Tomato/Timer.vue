<template>
  <div>
    <section class="section tomato-timer has-text-centered">
      <h1 class="title">{{`${minutes}:${seconds}`}}</h1>
    </section>
    <section class="section tomato-action">
      <div class="columns is-mobile">
        <div class="column">
          <button
            class="button is-rounded is-warning"
            @click="toggleTimer"
            v-text="isTimerActive ? 'PAUSE' : 'START'"
          >START</button>
        </div>
        <div class="column">
          <button
            class="button is-rounded is-info"
            @click="resetUI"
          >RESET</button>
        </div>
      </div>

    </section>
  </div>
</template>

<script>

import db from '../../store'
import { remote, screen } from 'electron'

const sleepURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/sleeptime`
  : `file://${__dirname}/#/sleeptime`

export default {
  data () {
    return {
      // Settings
      initWork: 20,
      initShortBreak: 5,
      initSleepTime: 5,

      // App state
      isBreakTime: false,
      isTimerActive: false,
      minutes: 20,
      seconds: '00',
      timer: null
    }
  },
  created () {
    this.initWork = parseInt(db.get('setting').get('work_mins').value())
    this.initSleepTime = parseInt(db.get('setting').get('sleep_mins').value())
    this.minutes = this.initWork
  },
  methods: {
    resetUI () {
      this.isBreakTime = false
      this.isTimerActive = false
      this.minutes = this.initWork
      this.seconds = '00'
      clearInterval(this.timer)
    },
    finisheOnce () {
      clearInterval(this.timer)
      this.minutes = this.initWork
      this.isTimerActive = false
      this.isBreakTime = true

      const today = this.todayDate()
      const todayTomato = db.get('tomatos')
        .find({ date: today })
        .value()

      if (todayTomato) {
        db.get('tomatos')
          .find({ date: today })
          .assign({ date: today, round: todayTomato.round + 1 })
          .write()
      } else {
        db.get('tomatos')
          .push({ date: today, round: 1 })
          .write()
      }

      remote.getCurrentWindow().hide()

      const screenSize = screen.getPrimaryDisplay().size
      let sleepWin = new remote.BrowserWindow({
        parent: remote.getCurrentWindow(),
        width: screenSize.width - 250,
        height: screenSize.height - 200,
        frame: false,
        center: true
      })
      sleepWin.on('close', () => { sleepWin = null })
      sleepWin.loadURL(sleepURL + '?time=' + this.initSleepTime)
    },
    toggleTimer () {
      let self = this
      function countDown () {
        let seconds = Number(self.$data.seconds)
        let minutes = self.minutes

        if (seconds === 0) {
          if (minutes === 0) {
            self.finisheOnce()
          } else {
            // Remove minute + start counting down from 60 seconds again
            self.minutes--
            self.seconds = '59'
          }
        } else {
          // Remove seconds + if less than 10 prepend 0
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
  padding-top: 2rem;
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
  font-size: 18px;
  padding: 0 40px;
  font-family: "Roboto", sans-serif;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.tomato-action button:hover {
  background-color: #292929;
  box-shadow: 0px 15px 20px rgba(18, 21, 20, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.tomato-action button:active {
  background-color: #292929;
  box-shadow: 0px 15px 20px rgba(18, 21, 20, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>
