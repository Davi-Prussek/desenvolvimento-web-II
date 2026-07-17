import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeVue.vue'),
    },
    {
      path: '/Avaliacao',
      name: 'Avaliações',
      component: () => import('../views/AvaliacoesVue.vue'),
    },
    {
      path: '/Ranking',
      name: 'Ranking',
      component: () => import('../views/RankingVue.vue'),
    },
    {
      path: '/Desc/:id',
      name: 'DetailsPage',
      component: () => import('../views/CoffeeDesc.vue'),
    },
  ],
})

export default router
