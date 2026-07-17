<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';
const rotas = router.getRoutes().slice(1, 4)
</script>

<template>
<header class="flex justify-around">
    <!--3E1E04-->
    <RouterLink class="flex items-center" to="/"><img src="../../public/icons/xicara.png" alt="logo">
      <h2>COFFEE QUALITY<br>CHALLENGE</h2>
    </RouterLink>
  <div>
    <ul>
      <li v-for="rota in rotas" :key="rota.name">
        <RouterLink :to="rota.path">{{ rota.name }}</RouterLink>
      </li>
    </ul>
  </div>
  <div>
    <img src="" alt="">
  </div>
</header>
</template>
