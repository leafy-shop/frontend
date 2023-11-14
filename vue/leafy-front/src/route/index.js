import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Shop from '../view/Shop.vue'
const history=createWebHistory(import.meta.env.VITEBASE_URL)

const routes=[
    {   path:'/',
        name:'Home',
        component: Home,
    },
    {   path:'/shop',
        name:'Shop',
        component: Shop,
    }    
]

const router=createRouter({history,routes})
export default router