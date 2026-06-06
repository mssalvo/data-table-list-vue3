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
  },
  {
    path: '/es1',
    name: 'esempio1',
    component: ()=> import('../view/ScenarioAView.vue')
  },
  {
    path: '/es2',
    name: 'esempio2',
    component: ()=> import('../view/ScenarioBView.vue')
  
  },
  {
    path: '/es3',
    name: 'esempio3',
    component: ()=> import('../view/ScenarioCView.vue')
  },
  {
    path: '/es4',
    name: 'esempio4',
    component: ()=> import('../view/ScenarioDView.vue')
  },
  {
    path: '/es5',
    name: 'esempio5',
    component: ()=> import('../view/ScenarioEView.vue')
  },
  {
    path: '/es6',
    name: 'esempio6',
    component: ()=> import('../view/ScenarioFView.vue')
  },
  {
    path: '/es7',
    name: 'esempio7',
    component: ()=> import('../view/ScenarioGView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
