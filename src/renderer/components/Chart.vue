<template>
  <div id="wrapper">
    <div class="has-text-centered title">
      <h1 class="title is-2">Tomato Round Chart</h1>
    </div>
    <div>
      <calendar-heatmap
        tooltip-unit="rounds"
        :values="tomatos"
        endDate="2018-12-30"
        :max="10"
      ></calendar-heatmap>
    </div>
    <div class="foot">
      <button class="button is-warning">Export</button>
      <button
        class="button is-danger"
        @click="closeChart"
      >Close</button>
    </div>
  </div>
</template> 
 
<script>

import db from '../store'
import { remote } from 'electron'

export default {
  name: 'chart',
  data () {
    return {
      tomatos: []
    }
  },
  created () {
    this.tomatos = db.get('tomatos').value()
      .map(t => {
        return { date: t.date, count: t.round }
      })
  },
  methods: {
    closeChart () {
      remote.getCurrentWindow().hide()
    }
  }
}
</script>

<style scoped>
#wrapper {
  padding-top: 20px;
  font-size: 12px;
  color: azure;
  overflow: hidden;
}
.title {
  padding-bottom: 10px;
}
.foot {
  padding-top: 5px;
  padding-bottom: 15px;
  padding-left: 30px;
}
</style>
