<template>
  <div id="wrapper">
    <div class="has-text-centered title">
      <h1 class="title is-3">Tomato Round Chart</h1>
    </div>
    <div id="heatmap-chart">
      <calendar-heatmap
        tooltip-unit="rounds"
        :values="tomatos"
        endDate="2018-12-30"
        :max="10"
      ></calendar-heatmap>
    </div>
    <div class="foot">
      <button
        class="button is-warning"
        @click="exportAsPNG"
      >Export</button>
      <button
        class="button is-danger"
        @click="closeChart"
      >Close</button>
    </div>
  </div>
</template> 
 
<script>

import db from '../store'
import { remote, ipcRenderer } from 'electron'
import domtoimage from 'dom-to-image'

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
    },
    exportAsPNG () {
      ipcRenderer.on('show-file-dialog-ok', function (event, path) {
        if (path) {
          let node = document.getElementById('heatmap-chart')
          domtoimage.toBlob(node)
            .then(function (blob) {
              let reader = new FileReader()
              reader.onload = function () {
                if (reader.readyState === 2) {
                  var buffer = Buffer.from(reader.result)
                  ipcRenderer.send('save-file', path, buffer)
                }
              }
              reader.readAsArrayBuffer(blob)
            })
        }
      })
      const options = {
        title: '保存图片',
        filters: [{
          name: 'Images',
          extensions: ['png']
        }]
      }
      ipcRenderer.send('show-file-dialog', options)
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
