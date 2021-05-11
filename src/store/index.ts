import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from '@/types/chat'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    id: '',
    user: '',
    room: '',
    chatService: '',
    imageService: '',
    roomService: '',
    image: '',
    words: [],
    matchedWords: [],
    messages: [],
    rooms: []
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
    },
    getChatService: state => {
      return state.chatService
    },
    getImageService: state => {
      return state.imageService
    },
    getImage: state => {
      return state.image
    },
    getWords: state => {
      return state.words
    },
    getMatchedWords: state => {
      return state.matchedWords
    },
    getMessages: state => {
      return state.messages
    },
    getRooms: state => {
      return state.rooms
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
    },
    SET_CHAT_SERVICE(state, service) {
      state.chatService = service
    },
    SET_IMAGE_SERVICE(state, service) {
      state.imageService = service
    },
    SET_ROOM_SERVICE(state, service) {
      state.roomService = service
    },
    SET_IMAGE(state, image) {
      state.image = image
    },
    SET_WORDS(state, words) {
      state.words = words
    },
    ADD_MATCHED_WORD(state, word) {
      (state.matchedWords as string[]).push(word)
    },
    CLEAR_MATCHED_WORDS(state) {
      state.matchedWords = []
    },
    ADD_MESSAGE(state, message) {
      (state.messages as Message[]).push(message)
    },
    SET_ROOMS(state, rooms) {
      state.rooms = rooms
    }
  },
  actions: {},
  modules: {}
})

export default store
