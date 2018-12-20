<template>
  <div id="wrapper">
    <main>
    </main>
  </div>
</template> 
 
<script>

export default {
  name: 'chart',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
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
