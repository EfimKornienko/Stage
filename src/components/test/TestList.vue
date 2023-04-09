<script setup>
import { h, reactive, onMounted } from 'vue'
import { db } from '@/database'
import { NButton, NSpace } from "naive-ui";
import { RouterLink } from 'vue-router'

const state = reactive({
  userRole: '',
  jwt: '',
  data: []
})

const columns = [
  {
    title: "ФИО",
    key: "fio",
    render (row) {
      return h(
        RouterLink,
        {
          to: `/${row.userId}/form`
        },
        { 
          default: () => row.fio 
        }
      )
    }
  },
  {
    title: "Возраст",
    key: "age"
  },
  {
    title: "Баллы",
    key: "score"
  },
  {
    title: "Статус",
    key: "status"
  },
  {
    title: "Действия",
    key: "actions",
    render (row) {
      if(row.status === 'Check') {
        return h(
          NSpace,
          {},
          [
            h(
              NButton,
              {
                class: 'control',
                type: "success",
                strong: true,
                secondary: true,
                size: 'small',
                onClick: () => accept(row)
              },
              { default: () => 'Принять' }
            ),
            h(
              NButton,
              {
                class: 'control',
                type: "error",
                strong: true,
                secondary: true,
                size: 'small',
                onClick: () => decline(row)
              },
              { default: () => 'Отклонить' }
            )
          ]
        )
      } else {
        return '-'
      }
    }
  }
]

const accept = (row) => {
  console.log(row.attemptId)
  const url = 'http://p0var.ru' + `/api/admin/approve/${row.attemptId}`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.jwt}`
    }
  })
    .then(() => {
      fetchData()
    })
}

const decline = (row) => {
  console.log(row.attemptId)
  const url = 'http://p0var.ru' + `/api/admin/decline/${row.attemptId}`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.jwt}`
    }
  })
    .then(() => {
      fetchData()
    })
}

const fetchData = async () => {
  await db.jwt.get({user: 'token'})
    .then(data => {
      state.userRole = data.role
      state.jwt = data.jwt
      fetch(`http://p0var.ru/api/admin/results`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwt}`
        },
      })
        .then(resp => resp.json())
        .then(data => {
          state.data = data
        })
    })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="test-list">
    <h3>Список пройденых тестов</h3>
    <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="state.userRole === 'ADMIN' ? columns : columns.filter(el => el.key !== 'actions')"
      :data="state.data"
    />
  </div>

</template>

<style scoped>

  .test-list {
    height: calc(100vh - 50px);  
    padding: 30px 20px; 
  }
  .test-list ::v-deep(.control) {
    margin-right: 5px !important;
  }
</style>