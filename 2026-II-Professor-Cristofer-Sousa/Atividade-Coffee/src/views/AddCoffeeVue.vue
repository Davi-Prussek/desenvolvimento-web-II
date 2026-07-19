<template>
  <div
    class="
      py-[2vw]
      flex
      flex-row-reverse
      gap-[2vw]
      px-[2vw]
      bg-[url('/images/farm-wallpaper.jpg')]
      bg-cover
      bg-[position:center_70%]
    "
  >

    <form
      class="
        basis-1/2
        min-w-0
        p-[3vw]
        border-[2px]
        border-[#dedede]
        border-solid
        rounded-md
        bg-black/20
        backdrop-blur-[12px]
      "
    >
      <h2 class="text-white text-[2vw] mb-[2vw]">
        <i class="fi fi-rr-coffee text-white"></i>
        Registrar café
      </h2>

      <div class="flex flex-col gap-[1.5vw]">

        <inputComponent
          id="nome"
          label="Nome do café"
          placeholder="Ex: Bourbon amarelo"
          type="text"
          v-model="nome"
        />

        <inputComponent
          id="produtor"
          label="Produtor"
          placeholder="Ex: Fazenda Boa Vista"
          type="text"
          v-model="produtor"
        />

        <div class="flex gap-[1.5vw]">

          <inputComponent
            id="processo"
            label="Processo"
            class="flex-1"
            placeholder="Como o café foi beneficiado"
            type="text"
            v-model="processo"
          />

          <inputComponent
            id="origem"
            label="Origem"
            class="flex-1"
            placeholder="Ex: País ou Região"
            type="text"
            v-model="origem"
          />

        </div>

        <multiSelectComponent
          label="Ponto de torra"
          id="pontoDeTorra"
          :options="['Clara', 'Média', 'Escura']"
          v-model="pontoDeTorra"
        />

        <ButtonComponent
        icon="fi fi-rr-coffee-bean"
        label="Adicionar Café"
          @click.prevent="AddCoffee"
          type="submit"
        />

      </div>
    </form>


    <div
      class="
        basis-1/2
        min-w-0
        p-[3vw]
        border-[2px]
        border-[#dedede]
        border-solid
        rounded-md
        bg-black/20
        backdrop-blur-[12px]
        flex
        flex-col
        justify-between
      "
    >
      <ul>
        <li
          v-for="(cafe, index) in acervo"
          :key="index"
          class="
          text-white
          border-[2px]
        border-[#dedede]
        border-solid
        rounded-md
          ">
          {{ cafe.nome }}
          {{ cafe.origem }}
          {{ cafe.produtor }}
        </li>
      </ul>
      <ButtonComponent label="Limpar lista de cafés"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import inputComponent from '@/components/inputComponent.vue';
import multiSelectComponent from '@/components/multiSelectComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { AcervoDeCafeStore } from '@/stores/coffee';
const AcervoDeCafe = AcervoDeCafeStore()
const acervo = AcervoDeCafe.acervo
import { ref } from 'vue';

const nome = ref<string | null>(null)
const produtor = ref<string | null>(null)
const pontoDeTorra = ref<string | null>(null)
const processo = ref<string | null>(null)
const origem = ref<string | null>(null)

function AddCoffee() {
acervo.push({
  nome: nome.value,
  produtor: produtor.value,
  origem: origem.value,
  processo: processo.value,
  caracteristicas: '',
  ponto_de_torra: pontoDeTorra.value,
  nota: 0,
  aroma: 0,
  sabor: 0,
  acidez: 0,
  corpo: 0,
  finalização: 0,
})
}
/* const caracteristicas = ref<string | null>(null) */

</script>
