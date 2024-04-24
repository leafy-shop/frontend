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
import GalleryProfile from '../view/GalleryProfile.vue'
import SignUp from '../view/SignUp.vue'
import ProductDetail from '../view/ProductDetail.vue'
import ServerError from '../view/ServerError.vue'
import Payment from '../view/Payment.vue'
import ConfirmPayment from '../view/ConfirmPayment.vue'

// account setting
import AccountSetting from '../view/accountSetting/AccountSetting.vue'
import Profile_AS from '../view/accountSetting/Profile.vue'
import Address_AS from '../view/accountSetting/addresses_page/Address.vue'
import Address_AS_add from '../view/accountSetting/addresses_page/Address_add.vue'
import ChangePW_AS from '../view/accountSetting/ChangePassword.vue'
import Bank_AS from '../view/accountSetting/bank_page/Bank.vue'
import Bank_AS_add from '../view/accountSetting/bank_page/Bank_add.vue'
import Shop_AS from '../view/accountSetting/myShop_page/MyShop.vue'
import Shop_AS_add from '../view/accountSetting/myShop_page/MyShopCreate.vue'
import Order_AS from '../view/accountSetting/myShop_page/OrderList.vue'
import Chat from '../view/Chat 2.vue'
import MyPurchase_AS from '../view/accountSetting/myPurchase_page/MyPurchase.vue'
import MyPurchaseDetail_AS from '../view/accountSetting/myPurchase_page/MyPurchaseDetail.vue'
import MyGallery_AS from '../view/accountSetting/myGallery/MyGallery.vue'
import MyGallery_AS_add from '../view/accountSetting/myGallery/MyGalleryCreate.vue'
// const history=createWebHistory(import.meta.env.VITEBASE_URL)
// let keyPass= cookie.get("information")
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
    {
        path:'/product-detail/:id',
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
        path:'/cart-list/check-out/:cartList',
        name:'Payment',
        component:Payment
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
        path:'/gallery/gallery-detail/:id',
        name:'GalleryDetail',
        component:GalleryDetail
    },
    {
        path:'/gallery/profile/:id',
        name:'GalleryProfile',
        component:GalleryProfile
    },
    {
        path:'/pay-order/:id?',
        name:'ConfirmPayment',
        component:ConfirmPayment
    },
    {
        path:'/account-setting', //:id?
        name:'AccountSetting',
        component:AccountSetting,
        children:[
            {
                path:'profile',
                name:'Profile_AS',
                component:Profile_AS
            },
            {
                path:'address',
                name:'Address_AS',
                component:Address_AS
            },
            {
                path:'address/:method/:id?', //new-address
                name:'Address_AS_add',
                component:Address_AS_add
            },
            {
                path:'change-password',
                name:'ChangePW_AS',
                component:ChangePW_AS
            },
            {
                path:'bank',
                name:'Bank_AS',
                component:Bank_AS
            },
            {
                path:'bank/:method/:id?',
                name:'Bank_AS_add',
                component:Bank_AS_add
            },
            {
                path:'my-purchase',
                name:'MyPurchase',
                component:MyPurchase_AS
            },
            {
                path:'my-purchase/detail/:id',
                name:'MyPurchaseDetail',
                component:MyPurchaseDetail_AS
            },
            {
                path:'my-shop/products',
                name:'Shop_AS',
                component:Shop_AS
            },
            {
                path:'my-shop/products/add-product/:id?',
                name:'Shop_AS_add',
                component:Shop_AS_add
            },
            {
                path:'my-shop/orders',
                name:'Order_AS',
                component:Order_AS
            },
            {
                path:'my-gallery',
                name:'MyGallery_AS',
                component:MyGallery_AS
            },
            {
                path:'my-gallery/add-project/:method/:id?',
                name:'MyGallery_AS_add',
                component:MyGallery_AS_add
            },
        ]
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
    },

    // use demo only
    {
        path:'/chat',
        name:'Chat',
        component:Chat
    },
]
const router=createRouter({history,routes})


router.beforeEach(async (to, from, next) => {
    try {
        await fetch.getRefresh();

        const isAuthenticated = cookie.checkKeyPass();

        switch (to.name) {
            case "SignIn":
                if (isAuthenticated) {
                    next({ name: 'Home' });
                } else {
                    next(); // Call next() to allow navigation
                }
                break;
            case "CartList":
                if (!isAuthenticated) {
                    next({ name: "SignIn" });
                } else {
                    next(); // Call next() to allow navigation
                }
                break;
            case "SignUp":
                if (isAuthenticated) {
                    next({ name: "Home" });
                } else {
                    next(); // Call next() to allow navigation
                }
                break;
            // case "Profile":
            //     if (!isAuthenticated) {
            //         next({ name: "Home" });
            //     } else {
            //         next(); // Call next() to allow navigation
            //     }
            //     break;
            case "AccountSetting":
                if (!isAuthenticated) {
                    next({ name: "SignIn" });
                } else
                if(window.innerWidth<=432){ //if is mobile
                    next();
                }else {
                    next({ name: "Profile_AS" });
                }
                break;
            case "ConfirmPayment":
                if (( from.name==="MyPurchase" || from.name==="ConfirmPayment" || from.name==="Payment")) {
                    next();
                } else {
                    next({ name: "MyPurchase" });
                }
                break;    
            case "Payment":
                if (!(from.name === "CartList" || from.name === "ProductDetail"|| from.name==="Payment")) {
                    next({ name: "CartList" });
                } else {
                    next(); // Call next() to allow navigation
                }
                break;
            default:
                next(); // Call next() to allow navigation for other routes
        }
    } catch (error) {
        console.error("Error in navigation guard:", error);
        // Handle error
        next(false); // Abort navigation
    }
});
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