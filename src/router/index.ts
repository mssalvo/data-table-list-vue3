import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import EsempioCellaView from '../view/EsempioCellaView.vue'
import EsempioMenuView from '../view/EsempioMenuView.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: HomeView
  },
  {
    path: '/data-table-list',
    name: 'datatablelist',
    component: HomeView
  },
  {
    path: '/esempio-cella',
    name: 'esempiocella',
    component: EsempioCellaView
  },
  {
    path: '/esempio-menu',
    name: 'esempiomenu',
    component: EsempioMenuView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
