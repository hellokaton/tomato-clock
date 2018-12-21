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

<style scoped>
#wrapper {
  padding-top: 50px;
}
</style>
