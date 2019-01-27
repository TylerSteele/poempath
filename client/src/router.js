import Vue from 'vue'
import VueRouter from 'vue-router'
import UserEntry from './views/UserEntry'
import PrimaryView from './views/PrimaryView'
import UserIntroduction from './views/UserIntroduction'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: "welcome"
      }
    },
    {
      path: "/welcome",
      name: "welcome",
      component: UserEntry
    },
    {
      path: "/home",
      name: "home",
      component: PrimaryView
    },
    {
      path: "/introduction",
      name: "introduction",
      component: UserIntroduction
    }
  ]
})