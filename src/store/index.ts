import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    id: '',
    user: '',
    room: ''
  },
  getters: {
    getId: state => {
      return state.id
    },
    getUser: state => {
      return state.user
    },
    getRoom: state => {
      return state.room
    }
  },
  mutations: {
    SET_ID(state, id) {
      state.id = id
    },
    SET_USER(state, name) {
      state.user = name
    },
    SET_ROOM(state, key) {
      state.room = key
    }
  },
  actions: {},
  modules: {}
})

export default store
