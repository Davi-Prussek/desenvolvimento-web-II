<template>
<div>
  <img :src="'../../public/icons/'+props.img.src" :alt="props.img.alt">
  <div>
    <h3>{{ props.titulo }}</h3>
    <p>{{ props.valor }}</p>
    <p>{{ props.desc }}</p>
    <p>{{ props.descsecundaria }}</p>
  </div>
</div>
</template>
<script setup lang="ts">
type notaTipos = string | number

interface imagem {
  src: string
  alt: string
}
const props = defineProps<{
  img: imagem
  titulo: string
  valor: notaTipos
  desc?: string
  descsecundaria?: string
}>()
</script>
