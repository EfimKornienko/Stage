<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { db } from '@/database'
  import Tab from './Tab.vue'

  const router = useRouter()
  const route = useRoute()

  const state = reactive({
    width: window.innerWidth,
    catrgories: [],
    loading: true
  })

  const tab = ref('dbproger') 

  const setwWidth = () => {
    state.width = window.innerWidth
  }

  const options = computed(() => {
    return state.catrgories.map(el => {
      return {
        label: el.name,
        value: el.key
      }
    })
  })

  const fetchCatrgories = async () => {
    await fetch('http://p0var.ru/api/category', {method: 'GET'})
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        state.catrgories = data
        state.loading = false
      })
  }

  const next = () => {
    const tabId = state.catrgories.find(el => el.key === tab.value).id
    db.category.put({
      user: 'token', 
      category: tabId
    }).then(() => {
      router.push({name: 'Form', params: {tab: tab.value}})
    })
  }

  onMounted(() => {
    window.addEventListener('resize', setwWidth)
    fetchCatrgories()
  })
</script>

<template>
  <div 
    v-if="!state.loading"
    class="main"
  >
    <n-tabs 
      v-if="state.width > 730"
      :value="tab"
      :on-update:value="val => tab = val"
      justify-content="center" 
      type="line" 
    >
      <n-tab-pane
        v-for="cat in state.catrgories"
        :key="cat.id"
        :name="cat.key" 
        :tab="cat.name"
      >
        <Tab 
          :category="cat"
          :type="tab"
        />
      </n-tab-pane>
      <!-- animated -->
    </n-tabs>
    <div
      v-else
      class="select"
    >
      <n-select 
        v-model:value="tab" 
        :options="options" 
        size="medium"
      />
      <Tab 
        :category="state.catrgories.find(el => el.key === tab)"
        :type="tab"
      />
    </div>
    <n-button 
      class="accept-btn"
      strong 
      secondary 
      type="primary"
      :onclick="() => next()"
    >
      Подать заявку
    </n-button>
  </div>
</template>

<style scoped>
  .main {
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .main > div {
    display: flex;
    flex: 1;
  }

  .select {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .select ::v-deep(.n-select) {
    width: 60vw;
  }

  .accept-btn {
    width: 40vw;
    margin-bottom: 5vh;
  }
</style>