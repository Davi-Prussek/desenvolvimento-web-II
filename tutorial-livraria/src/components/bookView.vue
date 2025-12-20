<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;

import { importBooks } from '@/composables/books';
const { books } = importBooks();
</script>

<template>
  <h1>Detalhes do livro: {{ books[id-1].title }}</h1>
</template>