import Vue from 'vue'
import VueX from 'vuex'
import {UserAPI} from "./services/api/UserAPI"

Vue.use(VueX)

export default new VueX.Store({
  state: {
    currentUser: {},
    currentUsername: ''
  },
  mutations: {
    setCurrentUserName(username) {
      state.currentUser =
        UserAPI.getUser(username).then((data) => {
          return data
        })
      state.currentUsername = username
    }
  }
})