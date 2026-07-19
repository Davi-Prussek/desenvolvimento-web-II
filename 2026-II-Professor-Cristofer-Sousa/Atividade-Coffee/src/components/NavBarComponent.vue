<script setup lang="ts">
import router from '@/router';
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';

const tasks = ref<boolean>(false)

const route = useRoute()

function estiloAtual(path: string) {
  return path === route.path
    ? {
        texto: '#ac7945',
        icone: '#ac7945',
        borda: '#ac7945'
      }
    : {
        texto: '#6B7280',
        icone: '#6B7280',
        borda: 'transparent'
      }
}
const rotas = router.getRoutes().slice(1, 5)
</script>

<template>
<header class="flex justify-between px-[2vw] border-b-2 border-[#dedede] border-solid h-[5vw] items-end">
    <!--3E1E04-->
    <RouterLink class="flex items-baseline-last gap-[1.3vw]" to="/">
      <img class="h-full max-h-[3.5vw] w-auto object-contain mb-[1vw]" src="../../public/icons/xicara.png" alt="logo"/>
      <h2 class="font-bold text-[#3E1E04] text-[1.4vw]">COFFEE QUALITY<br>CHALLENGE</h2>
    </RouterLink>
  <div>
    <ul class="flex text-[1.4vw] gap-[2vw]">
      <li v-for="rota in rotas" :key="rota.name" class="border-b-[3px] border-solid pb-[2vw] hover:border-[#ac7945]" :style="{ borderColor: estiloAtual(rota.path).borda }">
  <RouterLink :to="rota.path" class="flex gap-[1vw]" :style="{ color: estiloAtual(rota.path).texto }">
    <i :class="rota.meta.icon" :style="{ color: estiloAtual(rota.path).icone }"/>
    {{ rota.name }}
  </RouterLink>
</li>
    </ul>
  </div>
  <div class=" mb-[2vw]">
    <button @click="tasks = !tasks"><i class="fi fi-br-menu-dots-vertical text-[1.5vw]"></i><!-- <img class="w-[4vw] h-[4vw]" src="../../public/icons/perfil.png" alt="perfil"> --></button>
  </div>
  <div v-if="tasks" class="flex flex-col gap-[0.5vw] items-baseline z-1 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#dedede] border-solid bg-white p-[1vw] text-[2vw] rounded-[15px]">
    <button @click="tasks = !tasks"><i class="fi fi-rr-cross"></i></button>
    <h2>Lista de tarefas pra fazer nessa bomba:</h2>
    <ul class="text-[1.4vw]">
      <li>
        - Colocar no modo escuro
      </li>
      <li>
        - Fazer a parte de avaliaçõe
      </li>
      <li>
        - Fazer o ranking
      </li>
    </ul>
  </div>
</header>
</template>
