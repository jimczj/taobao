import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './pages/Login.vue'
import NotFound from './pages/NotFound.vue'
import routes from './routes.js'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router