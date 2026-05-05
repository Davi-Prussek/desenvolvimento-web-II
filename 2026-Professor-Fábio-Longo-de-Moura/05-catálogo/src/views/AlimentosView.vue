<script setup>
  import { ref } from 'vue'
  import { listaProdutos } from '@/data/produtos';
import ProdutoCard from '@/components/produtos/ProdutoCard.vue';
  const produtos = ref(listaProdutos);
  produtos.value = produtos.value.filter(p =>
    p.categoria === 'Alimentos');
</script>

<template>
  <div class="container">
    <h1>Alimentos</h1>
    <div class="produtos">
      <ProdutoCard v-for="produto in produtos" :key="produto.id"
        class="produto-card" :id="produto.id" :nome="produto.nome" :preco="produto.preco" :imagem="produto.imagem" :categoria="produto.categoria">
      </ProdutoCard>
    </div>
  </div>
</template>
<style scoped>
</style>
