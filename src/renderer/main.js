import Vue from 'vue'

import App from './App'
import router from './router'
import DB from './store'

import './assets/css/materialdesignicons.min.css'
import 'buefy/dist/buefy.css'
import Buefy from 'buefy'

import VueCalendarHeatmap from 'vue-calendar-heatmap'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.use(VueCalendarHeatmap)

Vue.use(DB)

// use bulma css ui
Vue.use(Buefy)

Vue.prototype.todayDate = function () {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return yyyy + '-' + mm + '-' + dd
}

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  template: '<App/>'
}).$mount('#app')
