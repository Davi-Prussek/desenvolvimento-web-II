import { defineStore } from "pinia"
import { ref,computed } from "vue"


interface avaliacao {
  nome_avaliador: string
  data_avaliacao: Date
  media: number
  comentario: string
}

export const avaliacaoStore = defineStore('avaliacao', () => {
  const avaliacoes = ref<avaliacao[]>([])
  const total = computed(() => {
  return avaliacoes.value.length
})
const ultimaAvaliacao = computed(() => {

})
  return {
    avaliacoes,
    total,
  }
},
{
  persist: true
})
