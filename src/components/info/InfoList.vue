<script setup>
import { reactive, onMounted } from 'vue'

const state = reactive({
  userRole: '',
  jwt: ''
})

const columns = [
  {
    title: "№",
    key: "index"
  },
  {
    title: "Название",
    key: "keyword"
  }
]

const fetchData = async () => {
  await db.jwt.get({user: 'token'})
    .then(data => {
      state.userRole = data.role
      state.jwt = data.jwt
      fetch(`http://p0var.ru/api/admin/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwt}`
        },
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
        })
    })
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <n-button>Добавить</n-button>
  <n-data-table
    :columns="columns"
    :data="data"
    :bordered="false"
  />
</template>

<style scoped>

</style>