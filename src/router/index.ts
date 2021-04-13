import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Room', // TODO: Change to Login
    component: Room
  }
]

const router = new VueRouter({
  routes
})

export default router
