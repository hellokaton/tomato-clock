<template>
  <div id="wrapper">
    <div class="has-text-centered title">
      <h1 class="title is-2">Tomato Settings</h1>
    </div>
    <section class='setting-form'>
      <b-field label="One tomato work time">
        <b-select
          placeholder="Select time"
          v-model='setting.work_mins'
        >
          <option
            v-for="item in workTimes"
            :value="item"
            :key="item"
          >
            {{ item }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Sleep time">
        <b-select
          placeholder="Select time"
          v-model='setting.sleep_mins'
        >
          <option
            v-for="item in sleepTimes"
            :value="item"
            :key="item"
          >
            {{ item }}
          </option>
        </b-select>
      </b-field>

      <div class="action">
        <button
          class="button is-primary"
          @click="saveSetting"
        >
          Save Setting
        </button>
        <button
          class="button"
          @click="cancelSetting"
        >
          Cancel
        </button>
      </div>
    </section>
  </div>
</template> 
 
<script>

import { remote } from 'electron'
import db from '../store'

export default {
  name: 'settings',
  data () {
    return {
      workTimes: [15, 20, 25, 30],
      sleepTimes: [1, 2, 3, 4, 5, 10],
      setting: {
        work_mins: 0,
        sleep_mins: 0
      }
    }
  },
  created () {
    this.setting = db.get('setting').value()
  },
  methods: {
    cancelSetting () {
      remote.getCurrentWindow().hide()
    },
    saveSetting () {
      db.set('setting', this.setting).write()
      this.$toast.open({
        message: 'Save Setting Successfuly!',
        type: 'is-dark'
      })
    }
  }
}
</script>

<style scoped>
.setting-form {
  padding: 10px;
}
.action {
  margin-top: 40px;
}
</style>
