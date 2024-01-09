import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Shop from '../view/Shop.vue'
import Login from '../view/Login.vue'
import cookie from '../JS/cookie'
import fetch from '../JS/api'
// const history=createWebHistory(import.meta.env.VITEBASE_URL)
let keyPass= cookie.decrypt()
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

router.beforeEach(async (to, next)=>{
    // console.log("test")
    await fetch.getRefresh()
    // console.log(user)
    
    // console.log(document.cookie)
    // token=Cookies.get("token")
    // console.log(keyPass)

    // if(to.name=="Shop"){
    //     // alert("U so bad!!!")
    //     return "/"
    // }
    
})
router.beforeResolve((to)=>{
    // console.log(token)
})

export default router