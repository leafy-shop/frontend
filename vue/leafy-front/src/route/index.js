import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
const history=createWebHistory("/pl4")

const routes=[
    {   path:'/',
        name:'Home',
        component: Home
    }
]

const router=createRouter({history,routes})
export default router