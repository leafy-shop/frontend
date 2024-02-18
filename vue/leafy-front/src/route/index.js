import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Shop from '../view/Shop.vue'
import SignIn from '../view/SignIn.vue'
import cookie from '../JS/cookie'
import fetch from '../JS/api'
import NotFound from '../view/NotFound.vue'
import CartList from '../view/Cart.vue'
import Profile from '../view/Profile.vue'
import Gallery from '../view/Gallery.vue'
import GalleryDetail from '../view/GalleryDetail.vue'
import SignUp from '../view/SignUp.vue'
import ProductDetail from '../view/ProductDetail.vue'
import ServerError from '../view/ServerError.vue'
// const history=createWebHistory(import.meta.env.VITEBASE_URL)
// let keyPass= cookie.get("information")
const history=createWebHistory('/pl4')
const routes=[
    {   path:'/',
        name:'Home',
        component: Home,
    },
    {   path:'/shop/:search?',
        name:'Shop',
        component: Shop,
    },
    {
        path:'/shop/product-detail/:id',
        name:'ProductDetail',
        component: ProductDetail
    },
    {   path:'/sign-in',
        name:'SignIn',
        component: SignIn,
    },
    {
        path:'/sign-up/:email?',
        name:'SignUp',
        component:SignUp
    },
    {
        path:'/cart-list',
        name:'CartList',
        component:CartList
    },
    {
        path:'/user-profile/:id',
        name:'Profile',
        component:Profile
    },
    {
        path:'/gallery/:search?',
        name:"Gallery",
        component:Gallery
    },
    {
        path:'/gallery-detail/:id',
        name:'GalleryDetail',
        component:GalleryDetail
    },
    {
        path:'/:pathMatch(.*)*',
        name:'NotFound',
        component:NotFound,
    },
    {
        path:'/server-error',
        name:'ServerError',
        component:ServerError
    }

]
const router=createRouter({history,routes})


router.beforeEach(async (to,from)=>{
    // if(to.name !== "SignIn"){
        
    // }
    await fetch.getRefresh()
    // keyPass= cookie.get("information")
    // console.log(keyPass)
    
    if(to.name=="SignIn"&&cookie.checkKeyPass()){
        
        // alert("don't do that pls !!!")
        return {name:'Home'}
    }
    if(to.name=="CartList"&&!cookie.checkKeyPass()){
        return {name:"SignIn"}
    }
    if(to.name=="SignUp"&&cookie.checkKeyPass()){
        return {name:"Home"}
    }
    // alert('this new page')
    // console.log(document.cookie)
    // token=Cookies.get("token")
    // console.log(keyPass)

    // if(to.name=="Shop"){
    //     // alert("U so bad!!!")
    //     return "/"
    // }
    
})
router.beforeResolve((to,from)=>{
    
    // console.log(token)
    // if(to.name="SignIn"){
    //     if(keyPass==undefined){
    //         alert('no cookie')
    //     }else{
    //         alert('have cookie')
    //     }
    //     return ""
    // }
})

export default router