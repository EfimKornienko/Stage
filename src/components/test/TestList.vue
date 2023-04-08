<template>
    <n-data-table
            :bordered="false"
            :single-line="false"
            :columns="columns"
            :data="None"
    />

</template>

<script setup>
const columns = [
    {
        title: "ФИО",
        key: "fio"
    },
    {
        title: "Возраст",
        key: "age"
    },
    {
        title: "Оценка",
        key: "points"
    },
    {
        title: "Статус",
        key: "status"
    },
    {
        title: "Действия",
        key: "actions"
    }]
</script>

<style scoped>

</style>