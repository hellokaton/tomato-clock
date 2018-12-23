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
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item @click="openSettings">Settings</b-dropdown-item>
            <b-dropdown-item @click="openChart">Chart</b-dropdown-item>
            <b-dropdown-item @click="exit">Quit</b-dropdown-item>
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

const settingURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/settings`
  : `file://${__dirname}/index.html#/settings`

const chartURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/chart`
  : `file://${__dirname}/index.html#/chart`

let chartWin, settingsWin

export default {
  name: 'tomato',
  components: { Timer, Planned },
  data () {
    return {
      actived: false
    }
  },
  created () {
    let remote = this.$electron.remote
    if (chartWin == null) {
      chartWin = new remote.BrowserWindow({
        width: 920,
        height: 330,
        frame: false,
        center: true,
        show: false
      })
      chartWin.loadURL(chartURL)
    }
    // create settings window
    if (settingsWin == null) {
      settingsWin = new remote.BrowserWindow({
        width: 560,
        height: 340,
        frame: false,
        center: true,
        show: false
      })
      settingsWin.loadURL(settingURL)
    }
  },
  methods: {
    fixedDropdownMenu () {
      document.getElementsByClassName('dropdown')[0].classList.remove('is-active')
    },
    exit () {
      this.$electron.remote.app.quit()
    },
    openAuthorURL () {
      this.$electron.shell.openExternal('https://github.com/biezhi')
    },
    openChart () {
      this.fixedDropdownMenu()
      this.$electron.remote.getCurrentWindow().hide()
      chartWin.show()
    },
    openSettings () {
      this.fixedDropdownMenu()
      this.$electron.remote.getCurrentWindow().hide()
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

.tomato-footer {
  padding-top: 1.3rem;
}
.tomato-footer .icon {
  color: #ebe7e7;
  opacity: 0.9;
}
</style>
