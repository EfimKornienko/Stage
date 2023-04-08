<script setup>
import { LogoApple, Analytics, DesktopSharp, AlbumsSharp } from '@vicons/ionicons5'
import { defineProps } from 'vue'

const props = defineProps(['type', 'title'])

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
            v-if="props.type === 'admin-db'"
        />
        <DesktopSharp 
            v-if="props.type === 'dev-db'"
        />
    </n-icon>
    <span class="title">
        С этой профессией ты станешь крутым
    </span>
  </div>
</template>

<style scoped>
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 15vh;
  }

  .title {
    margin-top: 30px;
    font-size: 24px;
  }
</style>