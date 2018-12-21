<template>
  <div id="wrapper">
    <main>
      This is Settings Page.
      <br>
      <a @click="closeMe">Close Me</a>
    </main>
  </div>
</template> 
 
<script>

import { remote } from 'electron'

export default {
  name: 'settings',
  methods: {
    closeMe () {
      remote.getCurrentWindow().destroy()
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background-color: bisque;
}
</style>
