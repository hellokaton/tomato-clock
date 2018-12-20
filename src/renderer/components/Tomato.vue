<template>
  <div id="wrapper">
    <main class="container">
      <div class="header">
        <div class="is-pulled-left">
          <b-icon
            pack="fas"
            icon="home"
            type="is-white"
          >
          </b-icon>
        </div>
        <div class="is-pulled-right">
          <b-icon
            pack="fas"
            icon="tachometer-alt"
          >
          </b-icon>
        </div>
      </div>
      <timer></timer>
      <action></action>
      <planned></planned>
      <div
        class="has-text-centered"
        style="padding-top: 2rem;"
      >
        <span>Power by <a href="https://github.com/biezhi">biezhi</a></span>
      </div>
    </main>
  </div>
</template> 
 
<script>
import Timer from './Tomato/Timer'
import Action from './Tomato/Action'
import Planned from './Tomato/Planned'

export default {
  name: 'tomato',
  components: { Timer, Action, Planned },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgb(215, 61, 238) 40%,
    rgba(170, 67, 255, 0.755) 100%
  );
  height: 300px;
  padding: 1.3rem 1rem;
}
</style>
