<script setup>
import { LogoApple, Analytics, DesktopSharp, AlbumsSharp } from '@vicons/ionicons5'
import { defineProps } from 'vue'

const props = defineProps(['type', 'category'])

components: {
  LogoApple,
  Analytics,
  AlbumsSharp,
  DesktopSharp
}

</script>

<template>
  <div class="tab">
    <n-icon size="130">
        <LogoApple 
            v-if="props.type === 'ios'"
        />
        <Analytics 
            v-if="props.type === 'system'"
        />
        <AlbumsSharp 
            v-if="props.type === 'admindb'"
        />
        <DesktopSharp 
            v-if="props.type === 'dbproger'"
        />
    </n-icon>
    <span class="title">
      {{ category.description }}
    </span>
    <div class="crits">
      <h3>Критерии</h3>
      <div class="list">
        <span 
          v-for="text in category.criteria"
          :key="text"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5vh;
  }

  .title {
    width: 70vw;
    margin-top: 30px;
    font-size: 18px;
  }

  .crits {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 70vw;
    margin-top: 30px;
    font-size: 18px;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .crits span {
    margin-right: 10px;
  }

  @media (max-width: 730px) {
    .title {
      font-size: 14px;
    }

    .crits {
      font-size: 14px;
    }
  }
</style>