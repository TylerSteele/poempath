import Vue from 'vue'
import VueX from 'vuex'
import {UserAPI} from './services/api/UserAPI'
import { PoetryAPI } from './services/api/PoetryAPI'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    isLoading: false,
    currentUser: {},
    currentPoem: {}
  },
  mutations: {
    SET_IS_LOADING(state, status) {
      state.isLoading = status
    },
    SET_CURRENT_USER(state, newUser) {
      state.currentUser = newUser
    },
    SET_CURRENT_POEM(state, newPoem) {
      state.currentPoem = newPoem
    }

  },
  actions: {
    async loadCurrentUser({commit}, username) {
      if (username === '') {
        commit('SET_CURRENT_USER', {})
      } else {
        commit('SET_IS_LOADING', true)
        let newUser = await UserAPI.getUser(username)
          .catch(err => console.log(err))
        commit('SET_CURRENT_USER', newUser)
        commit('SET_IS_LOADING', false)
      }
    },
    async loadCurrentPoem({commit}) {
      commit('SET_IS_LOADING', true)
      // API returns an array of length 1 (depends on the route, may need to change
      let newPoemArray = await PoetryAPI.getPoem()
        .catch(err => console.log(err))
      commit('SET_CURRENT_POEM', newPoemArray[0])
      commit('SET_IS_LOADING', false)

    },
    async updateUser({commit}, updatedUser) {
      commit('SET_IS_LOADING', true)
      let newUser = await UserAPI.updateUser(updatedUser)
        .catch(err => console.log(err))
      commit('SET_CURRENT_USER', newUser.data)
      commit('SET_IS_LOADING', false)
    }
  }
})