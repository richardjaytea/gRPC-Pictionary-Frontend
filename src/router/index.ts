import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue'
import Room from '@/views/Room.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/room',
    name: 'Room',
    component: Room,
    props: true
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && store.getters.getUser === '') next({ name: 'Login' })
  else next()
})

export default router
