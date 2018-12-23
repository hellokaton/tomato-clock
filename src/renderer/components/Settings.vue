<template>
  <div id="wrapper">
    <div class="has-text-centered title">
      <h1 class="title is-3">Tomato Settings</h1>
    </div>
    <section class='setting-form'>
      <div class="columns is-mobile">
        <div class="column">
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
        </div>
        <div class="column">
          <b-field label="Play Sound">
            <b-switch
              type="is-success"
              v-model="setting.is_play_sound"
            >
            </b-switch>
          </b-field>

          <b-field label="Show Dock Icon">
            <b-switch
              type="is-success"
              v-model="setting.is_dock_icon"
              @input="showDockIcon"
            >
            </b-switch>
          </b-field>

        </div>
      </div>

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
export default {
  name: 'settings',
  data () {
    return {
      workTimes: [15, 20, 25, 30],
      sleepTimes: [1, 2, 3, 4, 5, 10],
      setting: {
        work_mins: 0,
        sleep_mins: 0,
        is_play_sound: true,
        is_dock_icon: false
      }
    }
  },
  created () {
    this.setting = this.$db.get('setting').value()
  },
  methods: {
    showDockIcon (isShow) {
      if (isShow) {
        this.$electron.remote.app.dock.show()
      } else {
        this.$electron.remote.app.dock.hide()
      }
    },
    cancelSetting () {
      this.$electron.remote.getCurrentWindow().hide()
    },
    saveSetting () {
      this.$db.set('setting', this.setting).write()
      this.$electron.ipcRenderer.send('change-settings', this.setting)
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
