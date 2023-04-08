<template>
    <n-button>Добавить</n-button>
    <n-data-table
            :columns="columns"
            :data="data"
            :bordered="false"
    />
</template>

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

<style scoped>

</style>