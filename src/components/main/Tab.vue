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
            v-if="props.type === 'admindb'"
        />
        <DesktopSharp 
            v-if="props.type === 'dbproger'"
        />
    </n-icon>
    <span class="title">
        {{ title }}
    </span>
  </div>
</template>

<style scoped>
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 12vh;
  }

  .title {
    width: 70vw;
    margin-top: 30px;
    font-size: 24px;
  }

  @media (max-width: 730px) {
    .title {
      font-size: 14px;
    }
  }
</style>