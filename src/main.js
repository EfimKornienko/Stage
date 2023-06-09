import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from "naive-ui"
import router from '../src/router/index'

createApp(App).use(router).use(naive).mount('#app')
