<script setup>
import { useRouter } from 'vue-router';
import { ref, computed,onBeforeMount} from 'vue'
import validation from '../JS/validation'
import cookie from '../JS/cookie';
const myRouter =useRouter()
const goHome=()=>myRouter.push({name:'Home'})
const goSignin=()=>myRouter.push({name:'SignIn'})
const goShop=()=>myRouter.push({name:'Shop'})
const goCartList=()=>myRouter.push({name:'CartList'})
const goProfile=()=>myRouter.push({name:'Profile',params:{name:'mago',id:'11'}})

// import { defineStore } from 'pinia'
// import { productFilterStore } from '../store/baseFilter'

const props = defineProps({
    search: {
        type: String,
        require: true
    }
})

let searchItem = computed(() => {
    return { search: props.search }
})

defineEmits(['search'])

const keyPass = ref(undefined)
onBeforeMount(()=>{
    keyPass.value = cookie.get("information")
})

const showMenu2 = ref(false)

// const search = ref("")

</script>
<template>
    <div class="main_menu">
        <div class="main_menu_container">
            <!-- burger icon -->
            <div @click="showMenu2 = !showMenu2" class="burger_icon">
                <img v-show="!showMenu2" src="../assets/icon/hamberger_menu_icon.png" alt="hamberger_icon">
                <img v-show="showMenu2" src="../assets/icon/cross_icon.svg" alt="close_icon">
            </div>
            <!-- link and logo -->
            <div class="element_link">
                <div class="leafy_icon">
                    <img src="../assets/LEAFY_logo.png" alt="leafy_icon">
                </div>
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
                <div class="service_container_search" @keydown.enter="$emit('search', 1, searchItem.search)">
                    <img @click="$emit('search', 1, searchItem.search)"  class="search_icon"
                        src="../assets/icon/magnifying.svg" alt="search_icon">
                    <img @click="$emit('search', 1, searchItem.search)" src="../assets/icon/search_icon_2.png"
                        alt="search_icon_2.png" class="search_icon_2">
                    <input type="text" placeholder="Search" v-model="searchItem.search">
                </div>
                <!-- cart icon -->
                <button @click="goCartList" class="cart_b">
                    <img src="../assets/icon/cart_icon.svg" alt="cart_icon">
                </button>
                <!-- profile -->
                <button v-show="false" class="profile_icon">
                    <img src="../assets/vue.svg" alt="profile" loading="lazy">
                </button>
                <!-- sign-in -->
                <button v-if="keyPass==undefined" @click="goSignin" class="service_sign-in">
                        Sign in
                </button>
                <!-- user profile -->
                <button @click="goProfile" v-else class="user_profile">
                        <img src="../assets/icon/user_icon.png" alt="user_icon">
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
                        <img  src="../assets/icon/Shop.png" alt="shop_icon">
                        <h3> Shop</h3>
                    </button>
                    <button @click="validation.clickingTest('link gallery')">
                        <img  src="../assets/icon/gallery.png" alt="gallery_icon">
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
                    <div v-if="keyPass!=undefined" class="service_with_keyPass">
                        <div class="user_2">
                            <div class="icon_2">
                                <img src="../assets/icon/user_icon.png" alt="user_icon">
                            </div>
                            <div class="information_2">
                                <h4>
                                    whitney Francis
                                </h4>
                                <h5>
                                    francis@gmail.com
                                </h5>
                            </div>
                        </div>
                        <button @click="goProfile" class="account_bt">
                            Your Profile
                        </button>
                        <button class="account_bt">
                            Seeting
                        </button>
                        <button class="signOut">
                            Sign Out
                        </button>
                    </div>
                    <div v-else class="service_no_keyPass">
                        <button @click="goSignin">
                            Sign in
                        </button>
                        <div>
                            <span>
                                Create a new account
                            </span> 
                            <hr> 
                            <span @click="validation.clickingTest('link sign-in')">
                                Sign Up
                            </span>
                        </div>
                    </div>
                    
                </div>    
            </div>

            <div @click="showMenu2 = !showMenu2" class="action_area"></div>

        </div>
    </div>
</template>
<style scoped>
*{
   box-sizing: border-box;
}
.main_menu{
    display: flex;
    width: auto;
    height: min(5.556dvw, 80px);
    /* margin:auto; */
    background-color: white;
    justify-content: center;
    padding: min(1.389dvw, 20px) min(11.111dvw, 160px);
    box-sizing: border-box;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);

    /* justify-content: space-between; */
}

.main_menu_container {
    /* width:1120px; */
    width: 100%;
    height: fit-content;

    /* margin:auto; */

    display: flex;
    justify-content: space-between;
}

.element_link {
    /* flex-grow:8; */
    display: flex;
    /* padding:10px; */
    /* margin:auto 0px; */
    width: fit-content;
    height: fit-content;
    gap: min(2.222dvw, 32px);
    justify-content: center;


}

.leafy_icon {
    display: flex;
    width: min(4.792dvw, 69px);
    height: auto;
    justify-content: center;
    align-items: center;
}

.leafy_icon img {
    width: inherit;
    height: auto;

}

.container_link {
    display: flex;
    width: fit-content;
    height: fit-content;
    padding: min(0.556dvw, 8px) 0px;
    gap: min(2.222dvw, 32px);
    align-items: center;
}

.link {
    width: fit-content;
    height: min(1.667dvw, 24px);
    color: #252525;
    cursor: pointer;
    border: none;
    background-color: inherit;
    font-size: min(1.111dvw, 16px);
    font-weight: 700;
}

.link:focus {
    color: #26AC34;
}

.element_service {
    /* flex-grow:6; */
    /* padding:10px; */
    display: flex;
    width: fit-content;
    height: fit-content;
    margin: auto 0px;
    gap: min(1.389dvw, 20px);
}

.service_container_search {
    display: flex;
    width: min(22.222dvw, 320px);
    height: min(2.778dvw, 40px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    justify-content: center;
    background-color: #F5F5F5;
    color: #BDBDBD;
    box-sizing: border-box;
    gap: min(0.833dvw, 12px);
}

.search_icon {
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    /* margin:auto 12px auto 0px; */
}

.service_container_search input {

    width: inherit;
    height: min(1.667dvw, 24px);
    /* align-items: center; */
    margin: auto 0px;
    /* padding:6px; */
    font-weight: 300;
    border: none;
    background-color: inherit;
    /* border-radius: ; */
    outline: inherit;

}

.service_sign-in {
    width: min(5.347dvw, 77px);
    height: min(2.778dvw, 40px);
    border: none;
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    background-color: #26AC34;
    color: #FFFFFF;
    font-weight: 500;
    cursor: pointer;
    font-size: min(1.111dvw, 16px);
}

.service_sign-in:hover {
    background-color: gray;
}

.user_profile{
    width: min(2.778dvw,40px);
    height: min(2.778dvw,40px);
    border-radius: 50%;
    border: 0px;
    overflow: hidden;
    cursor: pointer;
}
.user_profile img{
    width: inherit;
    height: inherit;
}

.cart_b{
    display: flex;
    height: auto;
    width: fit-content;
    /* margin: 0px 20px; */
    align-items: center;
    background-color: inherit;
    border: none;
    cursor: pointer;
}

.cart_b img {
    width: min(1.667dvw, 24px);
    height: min(1.667dvw, 24px);

}

.burger_icon {
    display: none;
}

.search_icon_2 {
    display: none;
}

.profile_icon {
    width: min(2.778dvw, 40px);
    height: min(2.778dvw, 40px);
    border: none;
    background-color: gray;
    border-radius: 50%;
    overflow: hidden;
}

.profile_icon img {
    width: inherit;
    height: inherit;
}

.main_menu_container_2 {
    display: none;
}



@media (width <=744px) {
    .main_menu {
        height: min(10.753dvw, 80px);
        padding: min(2.688dvw, 20px) min(5.914dvw, 44px);
    }

    .container_link,
    .service_sign-in,
    .search_icon {
        display: none;
    }

    .main_menu {
        position: relative;

    }

    .main_menu_container {
        height: 100%;
        /* height: 40px; */
        /* padding: 20px 44px; */
        z-index: 1001;
        align-items: center;
    }

    .main_menu_container_2 {
        display: flex;
        width: 100%;
        height: 100dvh;
        position: absolute;
        top: min(10.753dvw, 80px);
        flex-direction: column;
        z-index: 1000;
    }

    .action_area {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: black;
        opacity: 0.5;
        z-index: 998;
    }

    .container_link_2 {
        /* position: absolute; */
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        background-color: white;
        padding: min(5.914dvw,44px) min(5.914dvw,44px);
        box-sizing: border-box;
        gap: min(4.301dvw,32px);
        z-index: 999;
    }

    .link_list {
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        gap: min(3.763dvw,28px);
    }

    .link_list button {
        display: flex;
        width: inherit;
        height: 24px;
        border: none;
        background-color: inherit;
        cursor: pointer;
    }
    .link_list button h3{
        width: fit-content;
        height: inherit;
        font-size: 16px;
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: 0.2px;
    }
    .link_list button img{
        width: 24px;
        height: inherit;
        margin-right: 16px;
    }
    .service_container_2{
        width: auto;
        height: fit-content;
    }
    .service_no_keyPass{
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        padding-top: 28px;
        border-top: 1px solid;
        border-color: #E0E0E0;
        box-sizing: border-box;
        gap: 28px;
    }
    .service_no_keyPass button{
        width: inherit;
        height: 40px;
        padding: 8px 12px;
        box-sizing: border-box;
        background-color: #26AC34;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .service_no_keyPass div{
        display: flex;
        width: inherit;
        height: fit-content;
        gap: 16px;
        justify-content: center;
    }
    /* .service_container_2 div  span:nth-child(1){
        font-size: 14px;
        font-weight: 400;
        line-height: 144%;
        letter-spacing: 0.2px;
        color: #757575;
        cursor: pointer;
    } */
    .service_no_keyPass div  span:nth-child(3){
        font-size: 14px;
        font-weight: 700;
        line-height: 144%;
        /* 20.16px */
        letter-spacing: 0.2px;
        color: #26AC34;
        cursor: pointer;
    }

    .service_with_keyPass{
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        padding-top: 28px;
        border-top: 1px solid;
        border-color: #E0E0E0;
        box-sizing: border-box;
        gap: 28px;
    }
    .user_2{
        display: flex;
        width: 100%;
        height: 44px;
        flex-direction: row;
        gap: 12px;
    }
    .icon_2{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #E0E0E0;
        overflow: hidden;
    }
    .icon_2 img{
        width: inherit;
        height: inherit;
    }
    .information_2{
        display: flex;
        flex-direction: column;
    }
    .information_2 h4{
        width: 100%;
        height: 24px;
        font-size: 16px;
        font-weight: 700;
        line-height: 150%; /* 24px */
        letter-spacing: 0.2px;
    }
    .information_2 h5{
        width: 100%;
        height: 24px;
        font-size: 14px;
        font-weight: 400;
        line-height: 144%; /* 20.16px */
        letter-spacing: 0.2px;
    }
    .account_bt{
        height: auto;
        font-size: 16px;
        border: 0px;
        background:inherit;
        text-align: left;
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: 0.2px;
        cursor: pointer;
    }
    .signOut{
        width: auto;
        height: 40px;
        padding: 8px 12px;
        background:#26AC34;
        border-radius: 4px;
        border: 0px;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: 0.2px;
        cursor: pointer;
    }
    .leafy_icon{
        width: min(9.274dvw,69px);
        /* height: min(4.435dvw,33px); */
        /* margin: auto 0px; */
    }

    .burger_icon {
        display: block;
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);
        margin: 0px;
        cursor: pointer;
    }

    .burger_icon img {
        width: inherit;
        height: inherit;
    }

    .element_service {
        padding: 0px;
        gap: min(2.151dvw, 16px);
        margin: 0px;
    }

    .service_container_search {
        /* display: block; */
        background-color: inherit;
        width: fit-content;
        height: fit-content;
        padding: 0px;
        justify-content: center;
        margin: auto 0px;
    }
    .user_profile{
        display: none;
    }
    .cart_b{
        display: block;
        margin: auto 0px;
    }

    .cart_b img {
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);
        cursor: pointer;
    }

    .search_icon_2 {
        display: block;
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);

        margin: auto 0px auto 0px;
    }

    .service_container_search input {
        display: none;
    }


}

@media (width <=376px) {
    .main_menu {
        height: 60px;
        padding: min(3.191dvw, 12px) min(4.255dvw, 16px);
    }

    /* .main_menu_container{
        height: 44px;
        
    } */
    .main_menu_container_2 {
        top: 60px;
    }
    .container_link_2{
       width: inherit;
       /* height: 376px; */
       height: fit-content;
       padding: min(4.255dvw,16px);
    }
    .link_list{
        gap: min(6.383dvw,24px);
    }
    .link_list button h3{
        font-size: 14px;
    }

    .service_no_keyPass{
        padding-top: 16px;
        gap: 16px;
    }
    .service_no_keyPass button{
        height: 36px;
        font-size: 14px;
    }
    .service_no_keyPass div{
        gap: 12px;
    }
    .service_no_keyPass div span{
        font-size: 12px;
    }
    .service_no_keyPass div  span:nth-child(3){
        font-size: 12px;
    }
    .service_with_keyPass{       
        padding-top: 24px;
        gap: 16px;
    }
    .user_2{
        height: 36px;
    }
    .icon_2{
        width: 36px;
        height: 36px;
    }
    .information_2 h4{
        height: 20px;
        font-size: 14px;
    }
    .information_2 h5{
        height: 16px;
        font-size: 12px;
    }
    .account_bt{
        height: 20px;
        font-size: 14px;
    }
    .signOut{
        height: 36px;
        font-size: 14px;
    }

    .burger_icon {
        height: min(6.383dvw, 24px);
        width: min(6.383dvw, 24px);
    }

    .cart_b img {
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
        cursor: pointer;
    }

    .search_icon_2 {
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
    }

    .leafy_icon {
        width: 69px;
        height: min(9.574dvw, 36px);
    }
}</style>