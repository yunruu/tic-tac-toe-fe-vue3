import * as VueRouter from 'vue-router'
import GamePage from '../views/GamePage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/game',
    name: 'game',
    component: GamePage,
    props: true,
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

export default router
