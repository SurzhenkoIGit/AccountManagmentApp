import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Accounts from '../pages/Accounts.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/accounts', component: Accounts },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
