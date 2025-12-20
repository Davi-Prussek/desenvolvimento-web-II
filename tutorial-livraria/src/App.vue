<script setup>
import headerComponent from '@/components/headerApp.vue'
import footerComponent from '@/components/footerApp.vue'
import heroComponent from './components/heroComponent.vue';
import featuredComponent from './components/featuredComponent.vue';

</script>
<template>
  <headerComponent/>
<heroComponent/>
<featuredComponent/>
<RouterView/>  
<footerComponent/>
</template>

<style scoped>
</style>