<script setup>
import { ref, reactive, onMounted } from 'vue'
import { db } from '../database'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const state = reactive({
  jwt: '',
  data: null,
  loading: true
})

const fetchTest = async () => {
  await db.jwt.get({user: 'token'})
    .then(data => {
      console.log(data.jwt)
      // ${route.params.id}
      fetch(`http://p0var.ru/api/tests/start/1`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        Authorization: `Bearer ${data.jwt}`
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
        })
    })
}

onMounted(() => {
  fetchTest()
})
</script>

<template>
  <div class="test">

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
</style>