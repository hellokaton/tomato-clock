<template>
  <div id="wrapper">
    <main class="container">
      <div class="header">
        <div class="is-pulled-right">
          <span class="icon">
            <i class="fas fa-lg fa-chart-bar"></i>
          </span>
        </div>
      </div>
      <timer></timer>
      <action></action>
      <planned></planned>
      <div class="tomato-footer has-text-centered">
        <div class="is-pulled-left">
          <span
            class="icon"
            @click="exit"
          >
            <i class="fas fa-lg fa-sign-out-alt"></i>
          </span>
        </div>
        <div class="is-pulled-right">
          <span class="icon">
            <i class="fas fa-lg fa-cog"></i>
          </span>
        </div>
        <span>Power by <a href="https://github.com/biezhi">biezhi</a></span>
      </div>
    </main>
  </div>
</template> 
 
<script>
import Timer from './Tomato/Timer'
import Action from './Tomato/Action'
import Planned from './Tomato/Planned'

import { remote } from 'electron'

export default {
  name: 'tomato',
  components: { Timer, Action, Planned },
  methods: {
    exit () {
      remote.app.quit()
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
