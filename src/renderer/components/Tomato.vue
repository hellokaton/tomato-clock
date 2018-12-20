<template>
  <div id="wrapper">
    <main>
      <div>
        <div class="header">
          <div class="left">
            左边
          </div>
          <div class="right">
            <a href="/chart">右边</a>
          </div>
        </div>
        <timer></timer>
        <div class="footer">
          底部菜单
        </div>
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
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

.left {
  float: left;
}
.right {
  float: right;
}
#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgb(215, 61, 238) 40%,
    rgba(170, 67, 255, 0.755) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}
</style>
