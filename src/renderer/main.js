import Vue from 'vue'

import App from './App'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// use bulma css ui
Vue.use(Buefy)

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  template: '<App/>'
}).$mount('#app')
