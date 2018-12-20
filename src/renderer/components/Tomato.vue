<template>
  <div id="wrapper">
    <main class="container">
      <div class="header">
        <div class="is-pulled-left">
          aaa
        </div>
        <div class="is-pulled-right">
          <b-icon
            icon="view-dashboard"
            size="is-large"
            type="is-primary"
          >
          </b-icon>
        </div>
      </div>
      <timer></timer>
      <action></action>
      <div class="footer">
        底部菜单
      </div>
    </main>
  </div>
</template> 
 
<script>
import Timer from './Tomato/Timer'
import Action from './Tomato/Action'
import Progress from './Tomato/Progress'

export default {
  name: 'tomato',
  components: { Timer, Action, Progress },
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
  padding: 1.5rem;
}
</style>
