<template>
  <div id="wrapper">
    <main>
      <div>
        <div class="header">
          <div class="left">
            左边
          </div>
          <div class="right">
            右边
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
import Process from './Tomato/Process'

export default {
  name: 'tomato',
  components: { Timer, Action, Process },
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

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
