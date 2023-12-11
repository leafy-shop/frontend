import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Shop from '../view/Shop.vue'
import Login from '../view/Login.vue'
// const history=createWebHistory(import.meta.env.VITEBASE_URL)
const history=createWebHistory('/pl4')


const routes=[
    {   path:'/',
        name:'Home',
        component: Home,
    },
    {   path:'/shop',
        name:'Shop',
        component: Shop,
    },
    {   path:'/login',
        name:'Login',
        component: Login,
    },

]

const router=createRouter({history,routes})
export default router