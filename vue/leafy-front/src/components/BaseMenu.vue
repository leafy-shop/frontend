<script setup>
import { useRouter } from 'vue-router';
import{ref}from 'vue'
import validation from '../JS/validation'
const myRouter =useRouter()
const goHome=()=>myRouter.push({name:'Home'})
const goSignin=()=>myRouter.push({name:'Login'})
const goShop=()=>myRouter.push({name:'Shop'})

const showMenu2 = ref(true)
</script>
<template>
    <div class="main_menu">
        <div class="main_menu_container">
            <div @click="showMenu2=!showMenu2" class="burger_icon">
                <img v-show="!showMenu2" src="../assets/icon/hamberger_menu_icon.png" alt="hamberger_icon">
                <img v-show="showMenu2" src="../assets/icon/cross_icon.svg" alt="close_icon">
            </div>
            <div class="element_link">
                <img src="../assets/LEAFY_logo.png" alt="leafy_icon" class="leafy_icon">
                <div class="container_link">
                    <button @click="goHome" class="link">
                        Home
                    </button>
                    <button @click="goShop" class="link">
                        Shop
                    </button>
                    <button class="link">
                        Gallery
                    </button>
                    <button class="link">
                        About
                    </button>
                    <button class="link">
                        Contract
                    </button>    
                </div>
                
                
            </div>
            <div class="element_service"> 
                <!-- search input -->
                <div class="service_container_search">
                    <img @click="validation.clickingTest('search')" class="search_icon" src="../assets/icon/magnifying.svg" alt="search_icon">
                    <img @click="validation.clickingTest('search2')" src="../assets/icon/search_icon_2.png" alt="search_icon_2.png" class="search_icon_2">
                    <input type="text" placeholder="Search">
                </div>
                <!-- cart icon -->
                <button @click="validation.clickingTest('cart')" class="cart_b">
                    <img src="../assets/icon/cart_icon.svg" alt="cart_icon">
                </button>
                <!-- profile -->
                <button v-show="false" class="profile_icon">
                    <img src="../assets/vue.svg" alt="profile" loading="lazy">
                </button>
                <!-- sign-in -->
                <button @click="goSignin" class="service_sign-in">
                        Sign in
                </button>    
            </div>
        </div>
        <div v-show="showMenu2" class="main_menu_container_2">
            <div class="container_link_2">
                <div class="link_list">
                    <button @click="validation.clickingTest('link home')">
                        <img src="../assets/icon/home.png" alt="home_icon">
                        <h3> Home</h3>
                    </button>
                    <button  @click="validation.clickingTest('link shop')">
                        <img src="../assets/icon/shop.png" alt="shop_icon">
                        <h3> Shop</h3>
                    </button>
                    <button @click="validation.clickingTest('link gallery')">
                        <img src="../assets/icon/gallery.png" alt="gallery_icon">
                        <h3> Gallery</h3>
                    </button>
                    <button @click="validation.clickingTest('link about')">
                        <img src="../assets/icon/about.png" alt="about_icon">
                        <h3> About</h3>
                    </button>
                    <button @click="validation.clickingTest('link contact')">
                        <img src="../assets/icon/contact.png" alt="contact_icon">
                        <h3> Contact</h3>
                    </button>
                </div>
                <div class="service_container_2">
                    <button @click="validation.clickingTest('link Sign-in')">
                        Sign in
                    </button>
                    <div>
                        <span @click="validation.clickingTest('link sign-up')">
                            Create a new account
                        </span> 
                        <hr> 
                        <span @click="validation.clickingTest('link sign-in')">
                            Sign In
                        </span>
                    </div>
                </div>    
            </div>
            
            <div @click="showMenu2=!showMenu2" class="action_area"></div>
            
        </div>
    </div>
</template>
<style scoped>
*{
    font-size: 16px;
    font-weight: 700;
    
}
.main_menu{
    display: flex;
    width:100%;
    height:80px;
    margin:auto;
    background-color: white;
    justify-content: center;
}
.main_menu_container{
    width:1120px;
    height:inherit;
    
    /* margin:auto; */
    
    display: flex;
    justify-content: space-between;
}
.element_link{
    /* flex-grow:8; */
    display: flex;
    /* padding:10px; */
    margin:auto 0px;
    width: fit-content;
    height:fit-content;
    
    justify-content: center;

    
}
.leafy_icon{
    width:114px;
    height:28px;
    /* padding-right:10px; */
    margin:auto 0 auto 0;
}
.container_link{
    display:flex;
    width: fit-content;
    height: 40px;
    /* padding:8px 0px 8px 0px; */
    
}
.link{
    width: fit-content;
    height: 24px;
    /* padding: 3px; */
    margin:auto 0px auto 32px;

    color:#252525;
    cursor: pointer;
    border:none;
    background-color: inherit;
}

.link:focus{
    color:#26AC34;
}

.element_service{
    /* flex-grow:6; */
    padding:10px;
    display:flex;
    width: fit-content;
    height:fit-content;
    margin:auto 0px;
}
.service_container_search{
    display:flex;
    width: 220px;
    height:40px;
    border-radius: 4px;
    justify-content: center;
    background-color:#F5F5F5;
    color:  #BDBDBD;
}
.search_icon{
    width:20px;
    height: 20px;
    margin:auto 12px auto 0px;
}
.service_container_search input{
    
    width:148px;
    height:24px;
    /* align-items: center; */
    margin: auto 0px;
    /* padding:6px; */
    font-weight: 300;
    border:none;
    background-color: inherit;
    /* border-radius: ; */
    outline:inherit;

}

.service_sign-in{
    width:77px;
    height:40px;
    border:none;
    padding: 8px,12px;
    border-radius: 4px;
    background-color: #26AC34;
    color:#FFFFFF;
    font-weight: 500;
    cursor: pointer;
}
.service_sign-in:hover{
    background-color: gray;
}

.cart_b{
    display: flex;
    margin: 0px 20px;
    align-items: center;
    background-color: inherit;
    border: none;
    cursor: pointer;
}
.cart_b img{
    width: 24px;
    height: 24px;

}
.burger_icon{
    display: none;
}
.search_icon_2{
    display: none;
}
.profile_icon{
    width: 40px;
    height: 40px;
    border: none;
    background-color: gray;
    border-radius: 50%;
    overflow: hidden;
}
.profile_icon img{
    width: inherit;
    height: inherit;
}

.main_menu_container_2{
    display: none;
}



@media (width < 1440px){
    .container_link, .service_sign-in, .search_icon{
        display: none;
    }
    .main_menu{
        position: relative;
       
    }
    .main_menu_container{
        height: 40px;
        padding: 20px 44px;
        box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
        z-index: 1001;
    }
    .main_menu_container_2{
        display: flex;
        width: 100%;
        height: 100dvh;
        position: absolute;
        top: 80px;
        flex-direction: column;
        z-index: 1000;
    }
    .action_area{
        width: 100%;
        height: 100%;
        position: relative;
        background-color: black;
        opacity: 0.5;
        z-index: 998;
    }
    
    .container_link_2{
        /* position: absolute; */
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 452px;
        background-color: white;
        padding: 32px 44px;
        box-sizing: border-box;
        gap: 32px;
        z-index: 999;
    }
    .link_list{
        display: flex;
        flex-direction: column;
        width: inherit;
        height: 248px;
        gap: 32px;
    }
    .link_list button{
        display: flex;
        width: inherit;
        height: 24px;
        border: none;
        background-color: inherit;
        cursor: pointer;
    }
    .link_list button img{
        width: 24px;
        height: inherit;
        margin-right: 16px;
    }
    
    .service_container_2{
        display: flex;
        flex-direction: column;
        width: inherit;
        height: 108px;
        padding-top: 24px;
        border-top: 1px solid;
        border-color: #E0E0E0;
        box-sizing: border-box;
        gap: 24px;
    }
    .service_container_2 button{
        width: inherit;
        height: 40px;
        padding: 8px 12px;
        box-sizing: border-box;
        background-color: #26AC34;
        color: white;
        border: none;
        border-radius: 14px;
        cursor: pointer;
    }
    .service_container_2 div{
        display: flex;
        width: inherit;
        height: fit-content;
        gap: 16px;
        justify-content: center;
    }
    .service_container_2 div  span:nth-child(1){
        font-size: 14px;
        font-weight: 400;
        line-height: 144%; /* 20.16px */
        letter-spacing: 0.2px;
        color: #757575;
        cursor: pointer;
    }
    .service_container_2 div  span:nth-child(3){
        font-size: 14px;
        font-weight: 700;
        line-height: 144%; /* 20.16px */
        letter-spacing: 0.2px;
        color: #26AC34;
        cursor: pointer;
    }
    .leafy_icon{
        display: block;
        width: 69px;
        height: auto;
    }
    .burger_icon {
        display: block;
        width: 24px;
        height: 24px;
        margin: auto 0px;
        cursor: pointer;
    }
    .burger_icon img{
        width: inherit;
        height: inherit;
    }
    .element_service{
        padding: 0px;
        gap: 16px;
    }
    .service_container_search{
        /* display: block; */
        background-color: inherit;
        width: fit-content;
    }
    .cart_b{
        display: block;
        margin:auto 0px;
    }
    .cart_b img{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .search_icon_2{
        display: block;
        width: 24px;
        height: 24px;
 
        margin: auto 0px auto 0px;
    }
    .service_container_search input{
        display: none;
    }
    

}

@media (width < 376px){
    .main_menu{
        height: 60px;
    }
    .main_menu_container{
        height: 44px;
        padding: 8px 16px;
    }
    .main_menu_container_2{
        top: 60px;
    }
    .container_link_2{
       width: inherit;
       height: 376px;
       padding: 16px;
    }
    .link_list{
        gap: 24px;
    }
    .service_container_2{
        width: inherit;
        height: 96px;
        gap: 20px;
    }
}
</style>