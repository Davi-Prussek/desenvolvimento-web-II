<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CardComponent from '@/components/CardComponent.vue';
  import { avaliacaoStore } from '@/stores/avaliacoes.ts';
  import { AcervoDeCafeStore } from '@/stores/coffee.ts';
  const avaliacao = avaliacaoStore()
  const total = avaliacao.total
  const AcervoDeCafe = AcervoDeCafeStore()
  const melhorAvaliado = AcervoDeCafe.melhorAvaliado
  const cards = [
  {
    titulo: 'Total de cafés avaliados',
    valor: total,
    desc: undefined,
    descsecundaria: 'cafés',
    colorValor: '7C3D03',
    colorBackground: 'FFF4E6',
    img: {
      src: 'grao_cafe.png',
      alt: 'Grão de café',
    },
  },
  {
    titulo: 'Café com a maior nota',
    valor: melhorAvaliado.nota,
    desc: melhorAvaliado.nome,
    descsecundaria: melhorAvaliado.produtor,
    colorValor: '376506',
    colorBackground: 'F1F5EB',
    img: {
      src: 'trofeu.png',
      alt: 'Troféu',
    },
  },
  {
    titulo: 'Última avaliação',
    valor: total,
    desc: 'Teste',
    descsecundaria: '14/07/2026 14:32',
    colorValor: '214C72',
    colorBackground: 'EDF2FA',
    img: {
      src: 'relogio.png',
      alt: 'Relógio',
    },
  },
]
</script>
<template>
<div class="pt-[2vw] px-[2vw] flex flex-col gap-[2vw] pb-[2vw]">
  <BannerComponent/>
  <div class="flex justify-between">
  <CardComponent
    v-for="card in cards"
    :key="card.titulo"
    :titulo="card.titulo"
    :valor="card.valor"
    :desc="card.desc"
    :descsecundaria="card.descsecundaria"
    :colorValor="card.colorValor"
    :colorBackground="card.colorBackground"
    :img="card.img"
  />
    </div>
    <div class="flex justify-center">
  <RouterLink to="/avaliacao" class="bg-[#5e3007] hover:bg-[#532a05] flex justify-center items-baseline gap-[1vw] rounded-[10px] text-white py-[1vw] px-[6vw] text-[1.6vw]">
    <i class="fi fi-rr-clipboard-list"/>Ver avaliações
  </RouterLink>
    </div>
    <div class="bg-[#F7F4F0] flex justify-between py-[1vw] rounded-[20px] border-[1.6px] border-[#dedede] border-solid gap-[15vw]">
       <div class="flex justify-center gap-[2vw] px-[3vw]">
        <i class="fi fi-rr-megaphone text-[#532a05] text-[3.5vw]"></i>
        <div>
          <h3 class="font-semibold text-[1.7vw]">Participe e faça a diferença!</h3>
          <p class="text-[1.2vw]">Cada avaliação ajuda a reconhecer o trabalho dos produtores e a valorizar o café de qualidade.</p>
        </div>
       </div>
       <img class="h-35" src="../../public/images/paisagem.png" alt="imagem de paisagem">
    </div>
  </div>
</template>
