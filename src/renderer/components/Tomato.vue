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

            <b-dropdown-item @click="go('/settings')">Settings</b-dropdown-item>
            <b-dropdown-item @click="go('/chart')">Chart</b-dropdown-item>
            <b-dropdown-item @click="exit">Exit</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <timer></timer>
      <planned></planned>
      <div class="tomato-footer has-text-centered">
        <span>Power by <a href="https://github.com/biezhi">biezhi</a></span>
      </div>
    </main>
  </div>
</template> 
 
<script>
import Timer from './Tomato/Timer'
import Planned from './Tomato/Planned'
import { remote } from 'electron'

export default {
  name: 'tomato',
  components: { Timer, Planned },
  methods: {
    exit () {
      remote.app.quit()
    },
    go (path) {
      window.location.hash = path
    }
  }
}
</script>

<style scope>
#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgb(215, 61, 238) 40%,
    rgba(170, 67, 255, 0.755) 100%
  );
  height: 300px;
  padding: 1.3rem 1rem;
}

#wrapper .dropdown-menu {
  min-width: 5rem;
  max-width: 5rem;
}

.header .icon {
  color: #a4fe65;
}
.tomato-footer {
  padding-top: 2rem;
}
.tomato-footer .icon {
  color: #ebe7e7;
  opacity: 0.9;
}
</style>
