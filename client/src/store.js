import Vue from 'vue'
import VueX from 'vuex'
import {UserAPI} from "./services/api/UserAPI"

Vue.use(VueX)

export default new VueX.Store({
  state: {
    loadingStatus: 'notLoading',
    currentUser: {}
    },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status
    },
    SET_CURRENT_USER (state, newUser){
      state.currentUser = newUser
    }

  },
  actions: {
    async loadCurrentUser ({commit}, username) {
      if (username === '') {
        commit('SET_CURRENT_USER', {})
      } else {
        commit('SET_LOADING_STATUS', 'loading')
        let newUser = await UserAPI.getUser(username)
          .catch(err => console.log(err))
        commit('SET_CURRENT_USER', newUser)
        commit('SET_LOADING_STATUS', 'notLoading')
      }
    }
  }
})