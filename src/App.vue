<script setup>
import Header from './components/Header.vue'

</script>

<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>
  
<style scoped>
  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
  }
</style>
