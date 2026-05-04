<script setup>
  import { ref } from 'vue'
  import { listaProdutos } from '@/data/produtos';
  const produtos = ref(listaProdutos);
  produtos.value = produtos.value.filter(p =>
    p.categoria === 'Alimentos');
</script>

<template>
  <div class="container">
    <h1>Alimentos</h1>
    <div class="produtos">
      <div v-for="produto in produtos" :key="produto.id"
        class="produto-card">
          <img :src="produto.imagem" class="produto-imagem" />
          <h2>{{ produto.nome }}</h2>
          <p>Preço {{ produto.preco.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
