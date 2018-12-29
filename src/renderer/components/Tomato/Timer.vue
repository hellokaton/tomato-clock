<template>
  <div>
    <section class="section tomato-timer has-text-centered">
      <h1 class="title">{{ minutes }}:{{ seconds }}</h1>
    </section>
    <section class="section tomato-action">
      <div class="columns is-mobile">
        <div class="column">
          <button
            class="button is-rounded is-warning"
            v-on:click="toggleTimer"
            v-text="isTimerActive ? 'PAUSE' : 'START'"
          >START</button>
        </div>
        <div class="column">
          <button
            class="button is-rounded is-info"
            v-on:click="resetUI"
          >RESET</button>
        </div>
      </div>
      <audio
        ref='didaAudio'
        loop
      >
      </audio>
    </section>
  </div>
</template>

<script>
import http from 'http'
import https from 'https'
import fs from 'fs'

const sleepURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/sleeptime`
  : `file://${__dirname}/#/sleeptime`

const BG_API = 'http://www.splashbase.co/api/v1/images/random'

const soundURL = process.env.NODE_ENV === 'development'
  ? '/static/audio/dida.wav' : 'static/audio/dida.wav'

export default {
  data () {
    return {
      // Settings
      initWork: 20,
      initShortBreak: 5,
      initSleepTime: 5,

      // App state
      isTimerActive: false,
      minutes: 20,
      seconds: '00',
      timer: null,
      isShowSound: true,
      isStartDownload: false
    }
  },
  created () {
    function initSettings (self, setting) {
      self.initWork = setting.work_mins
      self.initSleepTime = setting.sleep_mins
      self.isShowSound = setting.is_play_sound
      if (!self.isTimerActive) {
        self.minutes = self.initWork
      }
    }

    let slef = this
    initSettings(slef, slef.$db.get('setting').value())

    this.$electron.remote.ipcMain.on('change-settings', (e, setting) => {
      initSettings(slef, setting)
    })
  },
  mounted () {
    this.$refs.didaAudio.src = soundURL
    this.$refs.didaAudio.volume = 0.4
  },
  watch: {
    minutes: function (newMinutes, oldMinutes) {
      if (newMinutes <= 2 && !this.isStartDownload) {
        this.isStartDownload = true
        http.get(BG_API, (response) => {
          let body = ''
          response.on('data', (chunk) => {
            body += chunk
          })
          response.on('end', () => {
            console.log('Got a response: ', body)
            let imgURL = JSON.parse(body).large_url
            let file = fs.createWriteStream(__static + '/images/bg.jpg')
            console.log('开始下载')
            https.get(imgURL, (response) => {
              response.pipe(file)
              console.log('下载完成')
            })
          })
        })
      }
    }
  },
  methods: {
    playSound (play) {
      if (this.isShowSound) {
        if (play) {
          this.$refs.didaAudio.play()
        } else {
          this.$refs.didaAudio.pause()
        }
      } else {
        this.$refs.didaAudio.pause()
      }
      this.$refs.didaAudio.currentTime = 0
    },
    resetUI () {
      this.isTimerActive = false
      this.minutes = this.initWork
      this.seconds = '00'
      this.playSound(false)
      clearInterval(this.timer)
    },
    finisheOnce () {
      this.playSound(false)
      clearInterval(this.timer)
      this.minutes = this.initWork
      this.isTimerActive = false

      const today = this.todayDate()
      const todayTomato = this.$db.get('tomatos')
        .find({ date: today })
        .value()

      if (todayTomato) {
        this.$db.get('tomatos')
          .find({ date: today })
          .assign({ date: today, round: todayTomato.round + 1 })
          .write()
      } else {
        this.$db.get('tomatos')
          .push({ date: today, round: 1 })
          .write()
      }

      let app = this.$electron.remote
      app.getCurrentWindow().hide()

      const screenSize = screen.getPrimaryDisplay().size
      let sleepWin = new app.BrowserWindow({
        parent: app.getCurrentWindow(),
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
        self.playSound(true)

        if (seconds <= 0) {
          if (minutes <= 0) {
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
      if (!self.isTimerActive) {
        self.playSound(false)
      }
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Press Start 2P";
  src: url("../../assets/fonts/PressStart2P-Regular.woff2") format("woff2");
}
.tomato-timer {
  padding-top: 3rem;
  padding-bottom: 2rem;
}

.tomato-timer h1 {
  font-size: 50px;
  color: white;
  font-weight: 300;
  font-family: "Press Start 2P", cursive;
  text-shadow: 0.2rem 0.3rem 0 #111;
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
