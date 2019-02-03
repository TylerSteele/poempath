import Vue from 'vue'
import VueRouter from 'vue-router'
import UserEntry from './views/UserEntry'
import PrimaryView from './views/PrimaryView'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: "introduction"
      }
    },
    {
      path: "/home",
      name: "home",
      component: PrimaryView
    },
    {
      path: "/introduction",
      name: "introduction",
      component: UserEntry
    }
  ]
})