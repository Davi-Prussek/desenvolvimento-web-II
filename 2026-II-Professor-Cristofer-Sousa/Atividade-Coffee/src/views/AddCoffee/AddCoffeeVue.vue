<template>
  <div
    class="
      py-[2vw] flex flex-row-reverse gap-[2vw] px-[2vw] bg-[url('/images/farm-wallpaper.jpg')] bg-cover bg-position[center_70%]">
    <form
      class="
        basis-1/2 min-w-0 p-[3vw] border-2 border-[#dedede] border-solid rounded-2xl bg-black/20 backdrop-blur-12">
      <h2 class="text-white text-[2vw] mb-[2vw]">
        <i class="fi fi-rr-coffee text-white"></i>
        Registrar café
      </h2>
      <div class="flex flex-col gap-[1.5vw]">
        <inputComponent id="nome" label="Nome do café" placeholder="Ex: Bourbon amarelo" type="text" v-model="nome"/>
        <div class="flex gap-[1.5vw]">
          <inputComponent id="produtor" label="Produtor" placeholder="Ex: Fazenda Boa Vista" type="text" v-model="produtor"/>
          <inputComponent id="origem" label="Origem" class="flex-1" placeholder="Ex: País ou Região" type="text" v-model="origem"/>
        </div>
        <div class="flex gap-[1.5vw] items-baseline-last">
          <inputComponent id="processo" label="Processo" class="flex-1" placeholder="Como o café foi beneficiado" type="text" v-model="processo"/>
          <selectComponent default="Clara" label="Ponto de torra" class="flex-1" id="pontoDeTorra" :options="['Clara', 'Média', 'Escura']" v-model="pontoDeTorra"/>
        </div>
        <div class="flex justify-between gap-[1vw]">
          <ButtonComponent icon="fi fi-rr-coffee-bean" class="flex-1" label="Adicionar Café" @click.prevent="AddCoffee(acervo,nome,produtor,origem,processo,pontoDeTorra);cleanForm()"/>
          <ButtonComponent icon="fi fi-rr-trash" class="flex-1" label="Limpar" @click.prevent="limpar"/>
        </div>
      </div>
    </form>
    <div class="basis-1/2 min-w-0 p-[3vw] border-2 border-[#dedede] border-solid rounded-2xl bg-black/20 backdrop-blur-12 flex flex-col justify-between">
    <ul v-if="acervo.length !== 0" class=" flex flex-col gap-[0.7vw] max-h-[23vw] overflow-y-auto no-scrollbar">
      <li
        v-for="(cafe, index) in acervo"
        :key="index"
        class="text-white flex justify-between border-2 border-[#dedede] border-solid rounded-md py-[0.8vw] px-[1vw] items-center gap-[1vw]">
        <div class="bg-[#dedede] p-[1vw] rounded-4xl flex w-min flex-col justify-center">
          <i class="text-[3vw] leading-0 text-[#5e3007] fi fi-rr-coffee-bean"></i>
        </div>
        <div class="flex-3">
          <p class="text-[1.5vw]">Nome: {{ cafe.nome !== '' && cafe.nome !== null ? letraMaiscPrep(cafe.nome) : '--' }}</p>
          <p class="text-[1.1vw]">Origem: {{ cafe.origem !== '' && cafe.origem !== null ? letraMaiscPrep(cafe.origem) : '--' }}</p>
          <p class="text-[1.1vw]">Produtor: {{ cafe.produtor !== '' && cafe.produtor !== null ? letraMaiscPrep(cafe.produtor) : '--' }}</p>
        </div>
        <p class="flex-1 text-[1.2vw]">Torra: <br><span :style="{backgroundColor: cafe.ponto_de_torra == 'Clara' ? '#5e3007' : cafe.ponto_de_torra == 'Média' ? '#542b07' : cafe.ponto_de_torra == 'Escura' ? '#472404' : '#282421'}" class="px-[0.5vw] py-[0.2vw] rounded-2xl">{{ cafe.ponto_de_torra !== '' && cafe.ponto_de_torra !== null ? letraMaiscPrep(cafe.ponto_de_torra) : '--' }}</span></p>
      </li>
    </ul>
    <p v-else class="text-[1.4vw] text-white">Acervo de cafés ainda vazio</p>
  <ButtonComponent label="Limpar lista de cafés" @click="acervo.length=0"/>
</div>
  </div>
</template>
<script setup lang="ts">
import inputComponent from '@/components/inputComponent.vue';
import selectComponent from '@/components/selectComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { AddCoffee,LimparForm, letraMaiscPrep } from './functions';
import { ref } from 'vue';
import type { form } from '@/types/cafe';
import { AcervoDeCafeStore } from '@/stores/coffee';

const AcervoDeCafe = AcervoDeCafeStore()
const acervo = AcervoDeCafe.acervo
const nome = ref<form>(null)
const produtor = ref<form>(null)
const pontoDeTorra = ref<form>(null)
const processo = ref<form>(null)
const origem = ref<form>(null)

function cleanForm() {
nome.value = null,
produtor.value = null,
origem.value = null,
processo.value = null,
pontoDeTorra.value = null
}

function limpar() {
  LimparForm(
    nome,
    produtor,
    origem,
    processo,
    pontoDeTorra
)}
</script>
