<script setup>
import {reactive} from 'vue'

let criterias = reactive([{id: 0, content: ""}])
const state = reactive({
  data: null
})

function addCriteria() {
  if (criterias.length < 10) {
    criterias.push({id: criterias.length, content: ""})
  }
}

function onUpdateInput(event, id) {
  criterias[id].content = event
}

// /api/category

</script>
<template>
  <div class="info">
    <n-space vertical>
      <n-input
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
      <n-input 
        maxlength="30" 
        show-count 
        clearable 
        type="text" 
        placeholder="Введите кодовое обозначение программы"
      />
      <n-input
        placeholder="Введите описание программы стажировки"
        type="textarea"
        size="small"
        :autosize="{
            minRows: 3,
            maxRows: 8
        }"
      />
  
      <n-input 
        v-for="cr in criterias" 
        :key="cr.id" 
        placeholder="Введите требование" 
        autosize        
        style="min-width: 50%" 
        @input="onUpdateInput($event, cr.id)"
      />
  
      <n-button @click="addCriteria">+</n-button>
      <n-button>Сохранить</n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>