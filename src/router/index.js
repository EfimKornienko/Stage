import Main from '../components/main/Main.vue'
import Form from '../components/Form.vue'
import Test from '../components/Test.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import TestList from "../components/test/TestList.vue"
import InfoList from "../components/info/InfoList.vue"
import InfoItem from "../components/info/InfoItem.vue"
import Login from '../components/Login.vue'


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
      path: '/:user/form',
      name: 'User',
      component: Form
    },
    {
      path: '/test/:tab',
      name: 'Test',
      component: Test
    },
    {
      path: '/list',
      name: 'TestList',
      component: TestList
    },
    {
      path: '/infol',
      name: 'InfoList',
      component: InfoList
    },
    {
      path: '/info',
      name: 'InfoItem',
      component: InfoItem
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router