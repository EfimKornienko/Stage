import Main from '../components/main/Main.vue'
import Form from '../components/Form.vue'
import Test from '../components/Test.vue'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/form/:tab',
      name: 'Form',
      component: Form
    },
    {
      path: '/test/:tab',
      name: 'Test',
      component: Test
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router