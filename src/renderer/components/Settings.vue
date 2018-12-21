<template>
  <div id="wrapper">
    <main>
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

        <b-field label="Break time">
          <b-select
            placeholder="Select time"
            v-model='setting.break_mins'
          >
            <option
              v-for="item in breakTimes"
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
    </main>
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
      breakTimes: [1, 2, 3, 4, 5, 10],
      setting: {
        work_mins: 0,
        break_mins: 0
      }
    }
  },
  created () {
    this.setting.work_mins = parseInt(db.get('setting').get('work_mins').value())
    this.setting.break_mins = parseInt(db.get('setting').get('break_mins').value())
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
  padding: 20px;
}
.action {
  margin-top: 40px;
}
</style>
