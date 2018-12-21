<template>
  <div id="wrapper">
    <main class="container">
      <div class="header">
        <div class="is-pulled-right">
          <b-dropdown :mobile-modal="false">
            <button
              class="button is-primary is-small"
              slot="trigger"
            >
              <span>Tomato</span>
              <span class="icon">
                <i class="fas fa-chevron-down"></i>
              </span>
            </button>

            <b-dropdown-item @click="openSettings">Settings</b-dropdown-item>
            <b-dropdown-item @click="openChart">Chart</b-dropdown-item>
            <b-dropdown-item @click="exit">Exit</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <timer></timer>
      <planned></planned>
      <div class="tomato-footer has-text-centered">
        <span>Power by <a @click="openAuthorURL">biezhi</a></span>
      </div>
    </main>
  </div>
</template> 
 
<script>
import Timer from './Tomato/Timer'
import Planned from './Tomato/Planned'
import { remote } from 'electron'

const settingURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/settings`
  : `file://${__dirname}/#/settings`

const chartURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/chart`
  : `file://${__dirname}/#/chart`

let chartWin, settingsWin

export default {
  name: 'tomato',
  components: { Timer, Planned },
  methods: {
    exit () {
      remote.app.exit()
    },
    openAuthorURL () {
      window.top.open('https://github.com/biezhi')
    },
    openChart () {
      remote.getCurrentWindow().hide()
      if (chartWin == null) {
        chartWin = new remote.BrowserWindow({
          width: 960,
          height: 260,
          frame: false,
          center: true
        })
        chartWin.loadURL(chartURL)
      }
      chartWin.show()
    },
    openSettings () {
      remote.getCurrentWindow().hide()
      // create settings window
      if (settingsWin == null) {
        settingsWin = new remote.BrowserWindow({
          width: 400,
          height: 300,
          frame: false,
          center: true
        })
        settingsWin.loadURL(settingURL)
      }
      settingsWin.show()
    }
  }
}
</script>

<style scope>
#wrapper {
  background-color: #fc5296;
  background-image: linear-gradient(315deg, #fc5296 0%, #f67062 74%);
  height: 100%;
  padding: 1.3rem 1rem;
  overflow-y: hidden;
}

#wrapper .dropdown-menu {
  min-width: 5rem;
  max-width: 5rem;
}

.header .icon {
  color: #a4fe65;
}
.tomato-footer {
  padding-top: 0.3rem;
}
.tomato-footer .icon {
  color: #ebe7e7;
  opacity: 0.9;
}
</style>
