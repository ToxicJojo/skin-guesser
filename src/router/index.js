import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import SkinGuesserGame from '@/views/SkinGuesserGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/game',
    name: 'game',
    component: SkinGuesserGame,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
