import Vue from 'vue'
import App from './App.vue'
import Router from './router.js'
import store from './store.js'

import './styles/quasar.styl'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import Quasar from 'quasar'

// Load necessary defaults
store.dispatch('loadStats')
store.dispatch('loadRandomPoem')
Vue.use(Quasar, {
  config: {}
 })

Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router: Router
}).$mount('#app')
