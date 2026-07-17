<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CardComponent from '@/components/CardComponent.vue';
  import { avaliacaoStore } from '@/stores/avaliacoes.ts';
  import { AcervoDeCafeStore } from '@/stores/coffee.ts';
  const avaliacao = avaliacaoStore()
  const total = avaliacao.total
  const AcervoDeCafe = AcervoDeCafeStore()
  const melhorAvaliado = AcervoDeCafe.melhorAvaliado

</script>
<template>
<div class="pt-[2vw] px-[2vw]">
  <BannerComponent/>
  <div class="flex gap-[3vw] hidden">
    <!--7C3D03-->
      <CardComponent
      titulo="Total de cafés avaliados"
      :valor="total"
      descsecundaria="cafés"
      :img="{
        src: 'grao_cafe.png',
        alt: 'Grão de café',
        }"
      />

      <!--376506-->
      <CardComponent
      titulo="Café com a maior nota"
      :valor="melhorAvaliado.nota"
      :desc="melhorAvaliado.nome"
      :img="{
        src: 'trofeu.png',
        alt: 'Troféu',
        }"
      />

      <CardComponent
      titulo="Total de cafés avaliados"
      :valor="total"
      desc="cafés"
      :img="{
        src: 'relogio.png',
        alt: 'Relógio',
      }"
      />
    </div>
  </div>
</template>
