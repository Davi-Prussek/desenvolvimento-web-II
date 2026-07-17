<script setup lang="ts">
  import NavBarComponent from './components/NavBarComponent.vue';
  import { RouterView } from 'vue-router';

</script>
<template>
<div class="mt-[1vw] mx-[2vw] py-[2vw] border-[1.5px] border-[#dedede] border-solid bg-white">
    <NavBarComponent/>
  <RouterView>
</RouterView>
  <main>
  </main>
  <footer>
  </footer>
</div>
</template>
