<template>
  <div id="wrapper">
    <calendar-heatmap
      :values="[{ date: '2018-9-22', count: 6 }]"
      :end-date="2018-12-30"
    />
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
