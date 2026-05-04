import { moedaPais, idioma } from "./global"

function formataPreco(preco) {
  return Number(preco).toLocaleString(idioma, {
    style: 'currency',
    currency: moedaPais
  })
}

export { formataPreco }
