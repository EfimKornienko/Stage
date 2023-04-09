<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/database'

const router = useRouter()
const route = useRoute()
const state = reactive({
  auth: null
})

watch(route, () => {
  setAuth()
})

const logout = () => {
  db.jwt.delete('token')
  state.auth = false
  router.push({name: 'Main'})
}

const setAuth = () => {
  db.jwt.get({user: 'token'})
    .then(data => {
      state.auth = !data.token
    })
}

onMounted(() => {
  setAuth()
})
</script>

<template>
  <div class="header">
    <div class="routes">
      <router-link to="/">Главная</router-link>
    </div>
    <div 
      v-if="!state.auth"
      class="auth"
    >
      <router-link :to="'/login'">Войти</router-link>
    </div>
    <div 
      v-if="state.auth"
      class="controls"
    >
      <div 
        v-if="state.auth"
        class="auth"
      >
        <router-link :to="'/list'">Личный кабинет</router-link>
      </div>
      <div 
        v-if="state.auth"
        class="auth"
      >
        <a 
          @click="() => logout()"
        >
          Выйти
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    min-height: 50px;
    max-height: 50px;
    /* border-bottom: 1px solid #fff0ff; */
    /* box-shadow: rgb(0 0 0 / 4%) 0px 2px 0px; */
  }

  .controls {
    display: flex;
    gap: 30px;
  }

  a {
    font-size: 16px;
    color: black;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
