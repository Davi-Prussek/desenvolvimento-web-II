<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router';
  import { listaProdutos } from './data/produtos';
  import ProdutoChild from './components/ProdutoChild.vue';
  import ButtonChild from './components/ButtonChild.vue';
  const produtos = ref(listaProdutos)

  const alterando = ref(false)
  const preco = ref(0)
  const posicaoProduto = ref(-1)
  function salvarPreco() {
    produtos.value[posicaoProduto.value].preco = preco.value;
    alterando.value = false;
  }

  function corrigirPreco(idProduto) {
    posicaoProduto.value = produtos.value.findIndex(p => p.id === idProduto);
    preco.value = produtos.value[posicaoProduto.value].preco
    alterando.value = true;
  }
</script>

<template>
<routerView/>
  <div class="container">
    <h1>Catálogo de Produtos</h1>
    <div>
      <ul>
        <ProdutoChild v-for="produto in produtos"
            :key="produto.id" :id="produto.id"
            :nome="produto.nome" :preco="produto.preco"
            :categoria="produto.categoria"
            @corrigirpreco="corrigirPreco"
          >
        </ProdutoChild>
      </ul>
    </div>
    <div v-show="alterando">
      <label>Preço</label>
      <input type="number" v-model.number="preco">
      <ButtonChild @clique="salvarPreco()">Salvar</ButtonChild>
    </div>
  </div>
</template>

<style scoped>
</style>
