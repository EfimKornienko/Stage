<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="header">
    <div class="routes">
      <router-link to="/">Главная</router-link>
    </div>
    <div class="auth">
      <router-link to="/">Войти</router-link>
    </div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    /* border-bottom: 1px solid #fff0ff; */
    /* box-shadow: rgb(0 0 0 / 4%) 0px 2px 0px; */
  }

  a {
    font-size: 16px;
    color: black;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
