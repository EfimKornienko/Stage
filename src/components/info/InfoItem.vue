<script setup>
import {reactive} from 'vue'
import { db } from '@/database'
import { useRoute, useRouter } from 'vue-router'


const router = useRouter()
const route = useRoute()
let criterias = reactive([{id: 0, content: ""}])
const state = reactive({
  key: '',
  title: '',
  description: ''
})

function addCriteria() {
  if (criterias.length < 10) {
    criterias.push({id: criterias.length, content: ""})
  }
}

function onUpdateInput(event, id) {
  criterias[id].content = event
}

const complete = async () => {
    const url = 'http://p0var.ru/' + 'api/category'
    await db.jwt.get({user: 'token'})
    .then(data => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.jwt}`
        },
        body: JSON.stringify({
          name: state.title,
          key: state.key,
          description: state.description,
          criteria: criterias.map(el => el.content)
        })
      })
        .then(resp => resp.json())
        .then(data => {
          router.push({name: 'TestList'})
        })
    })
  }

</script>
<template>
  <div class="info">
    <h3>Название</h3>
    <n-input
      v-model:value="state.title"
      maxlength="100" 
      show-count 
      clearable 
      type="textarea" 
      placeholder="Введите название новой программы"
      size="small"
      :autosize="{
        minRows: 2,
        maxRows: 2
      }"
    />
    <h3>Кодовое значение</h3>
    <n-input 
      v-model:value="state.key"
      maxlength="30" 
      show-count 
      clearable 
      type="text" 
      placeholder="Введите кодовое обозначение программы"
    />
    <h3>Описание программы</h3>
    <n-input
      v-model:value="state.description"
      placeholder="Введите описание программы стажировки"
      type="textarea"
      size="small"
      :autosize="{
          minRows: 3,
          maxRows: 8
      }"
    />
    <h3>Список требований</h3>
    <div class="crits">
      <n-input 
        v-for="cr in criterias" 
        :key="cr.id" 
        placeholder="Введите требование" 
        autosize        
        style="min-width: 50%" 
        @input="onUpdateInput($event, cr.id)"
      />
    </div>
    <div class="add-btn">
      <n-button @click="addCriteria">+</n-button>
    </div>
    <div class="footer">
      <n-button
        class="complete-btn"
        type="success"
        strong 
        secondary
        @click="complete"
      >
        Завершить
      </n-button>
    </div>
  </div>
</template>

<style scoped>
  .info {
    height: calc(100vh -- 50px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
  .crits {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
  
  .crits > div {
    margin: 5px 0;
  }
  .add-btn {
    margin: 5px 0 10px;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .complete-btn {
    margin-right: 30px;
  }

</style>