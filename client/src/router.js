import Vue from 'vue'
import Router from 'vue-router'
import UserEntry from "./views/UserEntry"
import PrimaryView from "./views/PrimaryView"

Vue.use(Router)

export default new Router({
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
    }
  ]
})