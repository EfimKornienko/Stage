<script setup>
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
const data = []
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