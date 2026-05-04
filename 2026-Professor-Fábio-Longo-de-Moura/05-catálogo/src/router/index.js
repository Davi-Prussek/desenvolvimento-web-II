import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AlimentosView from "@/views/AlimentosView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/alimentos",
    component: AlimentosView,
    name: "alimentos"
  },
  {
    path: "/brinquedos",
    component: () => import('@/views/brinquedosView.vue'),
    name: "brinquedos"
  },
  {
    path: "/higiene",
    component: () => import('@/views/HigieneView.vue'),
    name: "higiene"
  },
  {
    path: "/acessorios",
    component: () => import('@/views/AcessóriosView.vue'),
    name: "acessorios"
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
