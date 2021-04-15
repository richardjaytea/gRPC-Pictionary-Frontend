import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    room: ''
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, name) {
      state.user = name
    },
    SET_ROOM(state, key) {
      state.room = key
    }
  },
  actions: {
    setUser({ commit }, name) {
      commit('SET_USER', name)
    },
    setRoom({ commit }, key) {
      commit('SET_ROOM', key)
    }
  },
  modules: {}
})

export default store
