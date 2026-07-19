import { defineStore } from "pinia"
import { computed, ref } from "vue"

type form = string | null
type notaTipos = string | number
interface cafe {
  nome: form
  produtor: form
  caracteristicas: string
  origem: form
  processo: form
  ponto_de_torra: form
  nota: notaTipos
  aroma: number
  sabor: number
  acidez: number
  corpo: number
  finalização: number
}
export const AcervoDeCafeStore = defineStore(
  'coffee',
  () => {
const acervo = ref<cafe[]>([])
const melhorAvaliado = computed(() => {
  if (acervo.value.length == 0) {
    return<cafe> {
      nome: 'Lista ainda vazia',
      nota: '--',
      produtor: '',
    }
  } else {
  return acervo.value.reduce((acumulador, atual) => {
    return atual.nota > acumulador.nota ? atual : acumulador;
  })}
})
return {
  acervo,
  melhorAvaliado,
}
},
{
  persist: true,
}
)
