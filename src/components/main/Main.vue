<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import Tab from './Tab.vue'

  const state = reactive({
    width: window.innerWidth
  })

  const tab = ref('ios') 
  const options = [
    {
      label: "iOS разработчик",
      value: 'ios'
    },
    {
      label: "Системный аналитик",
      value: 'system'
    },
    {
      label: "Администратор баз данных",
      value: 'admin-db'
    },
    {
      label: "Разработчик баз данных",
      value: 'dev-db'
    },
  ]

  const setwWidth = () => {
    state.width = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', setwWidth)
  })
</script>

<template>
  <div class="main">
    <n-tabs 
      v-if="state.width > 730"
      :value="tab"
      :on-update:value="val => tab = val"
      justify-content="center" 
      type="line" 
    >
      <!-- animated -->
      <n-tab-pane name="ios" tab="iOS разработчик">
        <Tab 
          title="Хочешь стать программистом?"
          :type="tab"
        />
      </n-tab-pane>
      <n-tab-pane name="system" tab="Cистемный аналитик">
        <Tab 
          title="Хочешь стать программистом?"
          :type="tab"
        />
      </n-tab-pane>
      <n-tab-pane name="admin-db" tab="Аминистратор баз данных">
        <Tab 
          title="Хочешь стать программистом?"
          :type="tab"
        />
      </n-tab-pane>
      <n-tab-pane name="dev-db" tab="Разработчик баз данных">
        <Tab 
          title="Хочешь стать программистом?"
          :type="tab"
        />
      </n-tab-pane>
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
        title="Хочешь стать программистом?"
        :type="tab"
      />
    </div>
    <n-button 
      class="accept-btn"
      strong 
      secondary 
      type="primary"
      :onclick="() => $router.push({name: 'Form', params: {tab: tab}})"
    >
      Подать заявку
    </n-button>
  </div>
</template>

<style scoped>
  .main {
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
    margin-bottom: 20vh;
  }
</style>