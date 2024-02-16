<script setup>
import { useRouter,useRoute } from 'vue-router';
import { ref, computed,onBeforeMount, onMounted} from 'vue'
import validation from '../JS/validation'
import cookie from '../JS/cookie';
import fetch from '../JS/api'
// const {params} =useRoute()
const emit= defineEmits(['search'])
const props = defineProps({
    search: {
        type: String,
        require: true
    }
})
// this for check now in shop page? 
const isShopPage=computed(()=>{
    return window.location.href.split("/").includes("shop")
})


// for link in tablet and mobile phone
const changeIconColor=(element)=>{
    for(let i=0;i<element.getElementsByTagName('path').length;i++){

        element.getElementsByTagName('path')[i].setAttribute('style','stroke: #26AC34')
    }
}

// this function check current page and change color link that have same name
const checkCurrentURL=()=>{
    console.log(keyPass.value)
    // console.log(testing.split("/"))
    const location=window.location.href.split("/")[4]
    console.log(window.width)
    if(window.width<744){
        console.log('hello')
    }
    if(location==''){
        let link=document.getElementsByName('home')
        for(let i =0;i<link.length;i++){
            //change text
            if(window.innerWidth>744){
                link[i].setAttribute('style','color:#26AC34;border-bottom: 2px solid #26AC34;padding-bottom: min(0.278dvw, 4px);background: #FAFAFA;')
            }else{
                link[i].setAttribute('style','color:#26AC34;border-bottom: none;padding-bottom: min(0.278dvw, 4px);background: #FAFAFA;')

            }
            changeIconColor(link[i])
        }
       
    }else{
        console.log(window.innerWidth)
        let link=document.getElementsByName(`${location}`)
        for(let i=0;i<link.length;i++){
            //change text
            if(window.innerWidth>744){
                link[i].setAttribute('style','color:#26AC34;border-bottom: 2px solid #26AC34;padding-bottom: min(0.278dvw, 4px);background: #FAFAFA;')
            }else{
                link[i].setAttribute('style','color:#26AC34;border-bottom: none;padding-bottom: min(0.278dvw, 4px);background: #FAFAFA;')

            }

            changeIconColor(link[i])
        }
    }
    
}

// this search attribute
const search =ref('')
// and this compute value for assign value
// const searchCompute=computed(()=>{
    // let isShop = window.location.href.split("/").includes("shop")
    // return search.value = isShop==true?params.search:""
//     return search.value = props.search
// })

const myRouter =useRouter()
const goHome=()=>myRouter.push({name:'Home'})
const goSignin=()=>myRouter.push({name:'SignIn'})
const goSignUp=()=>myRouter.push({name:'SignUp'})
const goShop=()=>{
    if(isShopPage.value){
        // return emit("search",{search:search.value})
        return myRouter.push({name:'Shop',params:{search:search.value}})
    }else{
        return myRouter.push({name:'Shop',params:{search:search.value}})
    }
}
const goCartList=()=>myRouter.push({name:'CartList'})
const goProfile=(id=11)=>myRouter.push({name:'Profile',params:{id:id}})

const signOut = async () => {
    let isOut=await fetch.signOut()
    if(isOut){
        return myRouter.push({name:'SignIn'})
    }
}

const keyPass = ref(undefined)
onBeforeMount(()=>{
    keyPass.value = cookie.decrypt()
    console.log('keyPass is : '+keyPass.value)
    search.value=props.search
})

const showMenu2 = ref(false)

onMounted(()=>{
    checkCurrentURL()
})

</script>
<template>
    <div class="main_menu">
        <div class="main_menu_container">
            <!-- burger icon -->
            <div @click="showMenu2 = !showMenu2" class="burger_icon">
                <div>
                    <!-- <img v-show="!showMenu2" src="../assets/icon/hamberger_menu_icon.png" alt="hamberger_icon">
                    <img v-show="showMenu2" src="../assets/icon/cross_icon.svg" alt="close_icon"> -->
                    <svg v-show="!showMenu2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 18H20M4 6H20H4ZM4 12H20H4Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-show="showMenu2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6L18 18M6 18L18 6L6 18Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>

                </div>
            </div>
            <!-- link and logo -->
            <div class="element_link">
                <div class="leafy_icon">
                    <!-- <img src="../assets/LEAFY_leaf_logo.png" alt="leafy_icon"> -->
                    <img src="../assets/LEAFY_leaf_logo.png" alt="leafy_icon">
                    <img src="../assets/LEAFY_logo.png" alt="leafy_icon">
                </div>
                <div class="container_link">
                    <button @click="goHome" class="link" name="home">
                        Home
                    </button>
                    <button @click="goShop" class="link" name="shop">
                        Shop
                    </button>
                    <button class="link" name="gallery">
                        Gallery
                    </button>
                    <button class="link " name="about">
                        About
                    </button>
                    <button class="link contact">
                        Contact
                    </button>
                </div>
            </div>
            <div class="element_service">
                <!-- search input -->
                <div class="service_container_search" >
                    <label for="search">
                        <svg @click="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="search_icon">
                            <mask id="mask0_2745_19829" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="1" width="17" height="17">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6665 1.6665H17.8972V17.8973H1.6665V1.6665Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_2745_19829)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.78234 2.9165C5.9965 2.9165 2.9165 5.99567 2.9165 9.7815C2.9165 13.5673 5.9965 16.6473 9.78234 16.6473C13.5673 16.6473 16.6473 13.5673 16.6473 9.7815C16.6473 5.99567 13.5673 2.9165 9.78234 2.9165ZM9.78234 17.8973C5.30734 17.8973 1.6665 14.2565 1.6665 9.7815C1.6665 5.3065 5.30734 1.6665 9.78234 1.6665C14.2573 1.6665 17.8973 5.3065 17.8973 9.7815C17.8973 14.2565 14.2573 17.8973 9.78234 17.8973Z" fill="#BDBDBD"/>
                            </g>
                            <mask id="mask1_2745_19829" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="14" width="5" height="5">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3667 14.7559H18.5534V18.9348H14.3667V14.7559Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask1_2745_19829)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9286 18.9348C17.7694 18.9348 17.6094 18.874 17.4869 18.7523L14.5502 15.824C14.3061 15.5798 14.3052 15.184 14.5494 14.9398C14.7927 14.694 15.1886 14.6957 15.4336 14.9382L18.3702 17.8673C18.6144 18.1115 18.6152 18.5065 18.3711 18.7507C18.2494 18.874 18.0886 18.9348 17.9286 18.9348Z" fill="#BDBDBD"/>
                            </g>
                        </svg>
                        <!-- <img @click=""  class="search_icon"
                        src="../assets/icon/magnifying.svg" alt="search_icon"> -->
                    </label>
                        <svg @click="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="search_icon_2">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.5C17 14.09 14.09 17 10.5 17C6.91 17 4 14.09 4 10.5C4 6.91 6.91 4 10.5 4C14.09 4 17 6.91 17 10.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 16L20 20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    <!-- <img @click="" src="../assets/icon/search_icon_2.png"
                        alt="search_icon_2.png" class="search_icon_2"> -->
                    <input id="search" @keypress.enter="goShop" type="text" placeholder="Search" v-model="search">
                </div>
                <!-- cart icon -->
                <button @click="goCartList" class="cart_b">
                    <!-- <img src="../assets/icon/cart_icon.svg" alt="cart_icon"> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 17.9928C9.672 17.9928 9 18.6648 9 19.4928C9 20.3208 9.672 20.9928 10.5 20.9928C11.328 20.9928 12 20.3208 12 19.4928C12 18.6648 11.328 17.9928 10.5 17.9928Z" fill="#252525"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 17.9928C16.672 17.9928 16 18.6648 16 19.4928C16 20.3208 16.672 20.9928 17.5 20.9928C18.328 20.9928 19 20.3208 19 19.4928C19 18.6648 18.328 17.9928 17.5 17.9928Z" fill="#252525"/>
                        <path d="M3 5H5.331C6.297 5 7.126 5.691 7.299 6.642L8.701 14.358C8.874 15.309 9.703 16 10.669 16H17.494C18.386 16 19.17 15.41 19.416 14.553L20.961 9.181C21.136 8.572 20.707 7.955 20.074 7.908L8 7" stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <!-- profile -->
                <!-- <button v-show="true" class="profile_icon">
                    <img src="../assets/vue.svg" alt="profile" loading="lazy">
                </button> -->
                <!-- sign-in -->
                <button v-if="keyPass==undefined" @click="goSignin" class="service_sign-in">
                        Sign In 
                </button>
                <!-- user profile -->
                <button @click="goProfile(keyPass.id)" v-else class="user_profile">
                        <img src="../assets/icon/user_icon.png" alt="user_icon"> 
                </button>
            </div>
        </div>
        <div v-show="showMenu2" class="main_menu_container_2">
            <div class="container_link_2">
                <div class="link_list">
                    <button @click="goHome" name="home">
                        <!-- <img src="../assets/icon/home.png" alt="home_icon"> -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9755 8.11309L13.9755 3.74209C12.8445 2.75309 11.1555 2.75309 10.0245 3.74209L5.02451 8.11309C3.99951 9.00909 3.99951 10.1431 3.99951 11.0071V16.0031C3.99951 19.0011 4.99951 20.0001 7.99951 20.0001H15.9995C18.9995 20.0001 19.9995 19.0011 19.9995 16.0031V11.0071C19.9995 10.1431 19.9995 9.00909 18.9755 8.11309Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 16H15" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3> Home</h3>
                    </button>
                    <button  @click="goShop" name="shop">
                        <!-- <img  src="../assets/icon/shop.png" alt="shop_icon"> -->
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.776 9.52449C16.868 9.32349 17.133 9.32349 17.224 9.52449C17.619 10.3885 18.492 10.9925 19.5 10.9925V10.9925C20.875 10.9925 22 9.86749 22 8.49249V8.49249V8.49249C22 7.50649 21.441 5.87549 21 4.99249C21 4.99249 20 2.99249 18.764 2.99249H5.236C4 2.99249 3 4.99249 3 4.99249C2.559 5.87549 2 7.50649 2 8.49249V8.49249C2 9.86749 3.125 10.9925 4.5 10.9925V10.9925C5.508 10.9925 6.381 10.3885 6.776 9.52449C6.868 9.32349 7.133 9.32349 7.224 9.52449C7.619 10.3885 8.492 10.9925 9.5 10.9925V10.9925C10.508 10.9925 11.381 10.3885 11.776 9.52449C11.868 9.32349 12.133 9.32349 12.224 9.52449C12.619 10.3885 13.492 10.9925 14.5 10.9925V10.9925C15.508 10.9925 16.381 10.3885 16.776 9.52449Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 10.9928V16.9928C4 19.9928 5 20.9928 8 20.9928H16C19 20.9928 20 19.9928 20 16.9928V10.9928" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 20.9928H9V17.9928C9 16.8878 9.895 15.9928 11 15.9928H13C14.105 15.9928 15 16.8878 15 17.9928V20.9928Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 8.9928L8 2.9928" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17 8.9928L16 2.9928" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.9928V2.9928" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                        <h3> Shop</h3>
                    </button>
                    <button @click="validation.clickingTest('link gallery')" name="gallery">
                        <!-- <img  src="../assets/icon/gallery.png" alt="gallery_icon"> -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 10V10C4.567 10 3 8.433 3 6.5V6.5C3 4.567 4.567 3 6.5 3V3C8.433 3 10 4.567 10 6.5V6.5C10 8.433 8.433 10 6.5 10Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 10V10C15.567 10 14 8.433 14 6.5V6.5C14 4.567 15.567 3 17.5 3V3C19.433 3 21 4.567 21 6.5V6.5C21 8.433 19.433 10 17.5 10Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 21V21C4.567 21 3 19.433 3 17.5V17.5C3 15.567 4.567 14 6.5 14V14C8.433 14 10 15.567 10 17.5V17.5C10 19.433 8.433 21 6.5 21Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 21V21C15.567 21 14 19.433 14 17.5V17.5C14 15.567 15.567 14 17.5 14V14C19.433 14 21 15.567 21 17.5V17.5C21 19.433 19.433 21 17.5 21Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3> Gallery</h3>
                    </button>
                    <button @click="validation.clickingTest('link about')" name="about">
                        <!-- <img src="../assets/icon/about.png" alt="about_icon"> -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15.7463V11.7993" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C11.448 8 11 8.448 11 9C11 9.552 11.448 10 12 10C12.552 10 13 9.552 13 9C13 8.448 12.552 8 12 8Z" fill="#212121"/>
                        </svg>
                        <h3> About</h3>
                    </button>
                    <button @click="validation.clickingTest('link contact')" name="contact">
                        <!-- <img src="../assets/icon/contact.png" alt="contact_icon"> -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V6C3 14.284 9.716 21 18 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V15.721C21.0001 15.511 20.934 15.3064 20.8112 15.136C20.6885 14.9657 20.5152 14.8383 20.316 14.772L15.823 13.274C15.5947 13.1981 15.3466 13.2071 15.1244 13.2993C14.9021 13.3915 14.7205 13.5607 14.613 13.776L13.483 16.033C11.0345 14.9267 9.07332 12.9655 7.967 10.517L10.224 9.387C10.4393 9.27945 10.6085 9.0979 10.7007 8.87564C10.7929 8.65339 10.8019 8.40534 10.726 8.177L9.228 3.684C9.16171 3.48496 9.03449 3.3118 8.86436 3.18905C8.69422 3.0663 8.48979 3.00016 8.28 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
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
                                    {{keyPass.firstname}} {{keyPass.lastname}}
                                    <!-- whitney Francis -->
                                </h4>
                                <h5>
                                    {{keyPass.email}}
                                    <!-- francis@gmail.com -->
                                </h5>
                            </div>
                        </div>
                        <button @click="goProfile(keyPass.id)" class="account_bt">
                            My profile
                        </button>
                       
                        <button class="account_bt">
                            Settings
                        </button>
                        <button class="signOut" @click="signOut">
                            Sign out
                        </button>
                    </div>
                    <div v-else class="service_no_keyPass">
                        <button @click="goSignin">
                            Sign In
                        </button>
                        <div>
                            <span>
                                Create a new account
                            </span> 
                            <hr> 
                            <!-- <div class="hrLine"></div> -->
                            <span @click="goSignUp">
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
    width: fit-content;
    height: auto;
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
}

.leafy_icon img:nth-child(1) {
    width: min(2.222dvw, 32px);
    height: min(2.222dvw, 32px);
}
.leafy_icon img:nth-child(2){
    width: min(4.792dvw,69px);
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
    color: #212121;
    cursor: pointer;
    border: none;
    background-color: inherit;
    font-size: min(1.111dvw, 16px);
    font-weight: 700;
}
.link:hover {
    color: #212121;
    border-bottom: 2px solid #26AC34;
    padding-bottom: min(0.278dvw, 4px);
}
/* .link:focus {
    color: #26AC34;
} */
.link:active {
    color: #FFCE3D;
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
    border: min(0.069dvw, 1px) solid #FFF;
}

.service_container_search:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
    background-color: #fff;
    box-shadow: 0px 0px 0px 4px #FFF, 0px 0px 0px 2px #26AC34;
}

.search_icon {
    display: flex;
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
    color: #212121;
    font-size: min(1.111dvw, 16px);
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
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.service_sign-in:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
    color: #26AC34;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
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

.cart_b svg {
    width: min(1.667dvw, 24px);
    height: min(1.667dvw, 24px);
}

.cart_b svg:hover path {
    /* fill: #26AC34; */
    stroke: #26AC34
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
        width: min(2.688dvw, 20px);
        height: min(2.688dvw, 20px);
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
        padding: min(3.763dvw, 28px) min(4.301dvw,32px) min(4.301dvw,32px) min(4.301dvw,32px);
        box-sizing: border-box;
        gap: min(3.763dvw, 28px);
        z-index: 999;
    }

    .link_list {
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        gap: min(0.583dvw, 4px);
    }

    .link_list button {
        display: flex;
        width: inherit;
        height: min(6.452dvw,48px);
        border: none;
        background-color: inherit;
        cursor: pointer;
        padding: min(1.613dvw, 12px);
        align-items: center;
    }
    .link_list button h3{
        width: fit-content;
        height: inherit;
        font-size: min(2.151dvw, 16px);
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: min(0.027dvw, 0.2px);
        display: flex;
        align-items: center;
    }
    .link_list button svg{
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);
        margin-right: min(2.151dvw, 16px);
    }
    .link_list button:hover svg path{
        stroke: #26AC34;
        /* fill: #26AC34; */
    }
    .link_list button:hover {
        color: #26AC34;
        /* background-color: #26AC34; */
        border-radius: min(0.538dvw, 4px);
        background: #FAFAFA;
    }
    .service_container_2{
        width: auto;
        height: fit-content;
        padding: 0 min(1.613dvw,12px);
    }
    .service_no_keyPass {
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        /* padding: 0 min(1.613dvw,12px); */
        padding-top: min(3.763dvw, 28px);
        border-top: min(0.134dvw, 1px) solid #E0E0E0;
        /* border-color: #E0E0E0; */
        box-sizing: border-box;
        gap: min(3.763dvw, 28px);
        color: #757575;
    }
    .service_no_keyPass button{
        width: inherit;
        height: min(5.376dvw, 40px);
        padding: min(1.075dvw, 8px) min(1.613dvw, 12px);
        box-sizing: border-box;
        background-color: #26AC34;
        color: white;
        border: none;
        border-radius: min(0.538dvw, 4px);
        cursor: pointer;
        font-size: min(2.151dvw, 16px);
        box-shadow: 0px min(0.134dvw, 1px) min(0.269dvw, 2px) 0px rgba(0, 0, 0, 0.05);
    }
    .service_no_keyPass div{
        display: flex;
        width: inherit;
        height: fit-content;
        gap: min(2.151dvw, 16px);
        justify-content: center;
    }
    .service_no_keyPass div span{
        font-size: min(1.882dvw, 14px);
        /* justify-content: center;
        display: flex; */
        margin: auto 0px;
    }
    /* .service_container_2 div  span:nth-child(1){
        font-size: 14px;
        font-weight: 400;
        line-height: 144%;
        letter-spacing: 0.2px;
        color: #757575;
        cursor: pointer;
    } */
    .service_no_keyPass div span:nth-child(3){
        font-size: min(1.882dvw, 14px);
        font-weight: 700;
        line-height: 144%;
        /* 20.16px */
        letter-spacing: min(0.027dvw, 0.2px);
        color: #26AC34;
        cursor: pointer;
    }

    .service_with_keyPass{
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        padding-top: min(3.763dvw, 28px);
        border-top: min(0.134dvw, 1px) solid;
        border-color: #E0E0E0;
        box-sizing: border-box;
        gap: min(3.763dvw, 28px);
    }
    .search_icon {
        display: none;
        width: min(5.319dvw, 20px);
        height: min(5.319dvw, 20px);
    }
    .user_2{
        display: flex;
        width: 100%;
        height: min(5.914dvw, 44px);
        flex-direction: row;
        gap: min(1.613dvw, 12px);
    }
    .icon_2{
        width: min(5.914dvw, 44px);
        height: min(5.914dvw, 44px);
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
        height: min(3.226dvw, 24px);
        font-size: min(2.151dvw, 16px);
        font-weight: 700;
        line-height: 150%; /* 24px */
        letter-spacing: min(0.027dvw, 0.2px);
    }
    .information_2 h5{
        width: 100%;
        height: min(3.226dvw, 24px);
        font-size: min(1.882dvw, 14px);
        font-weight: 400;
        line-height: 144%; /* 20.16px */
        letter-spacing: min(0.027dvw, 0.2px);
    }
    .account_bt{
        height: 100%;
        font-size: min(2.151dvw, 16px);
        border: 0px;
        background:inherit;
        text-align: left;
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: min(0.027dvw, 0.2px);
        color: black;
        cursor: pointer;
    }
    .signOut{
        width: auto;
        height: min(5.376dvw, 40px);
        padding: min(1.075dvw, 8px) min(1.613dvw, 12px);
        background:#26AC34;
        border-radius: min(0.538dvw, 4px);
        border: 0px;
        color: #fff;
        font-size: min(2.151dvw, 16px);
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: min(0.027dvw, 0.2px);
        cursor: pointer;
    }
    .leafy_icon{
        width: min(9.274dvw, 69px);
        /* height: min(4.435dvw,33px); */
        /* margin: auto 0px; */
    }
    .leafy_icon img:nth-child(1) {
        display: none;
    }
    .leafy_icon img:nth-child(2){
        width: inherit;
        height: auto;
    }

    .burger_icon {
        display: flex;
        width: fit-content;
        height: fit-content;
        /* margin: 0px; */
        gap: min(2.151dvw, 16px);
        
        
    }

    .burger_icon div:nth-child(1) svg {
        display: flex;
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }
    .burger_icon div:nth-child(2) {
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);
        /* cursor: pointer */
    }

    .element_service {
        padding: 0px;
        gap: min(2.151dvw, 16px);
        margin: 0px;
    }

    .service_container_search {
        display: block;
        background-color: inherit;
        width: fit-content;
        height: fit-content;
        padding: 0px;
        justify-content: center;
        /* margin: auto 0px; */
        cursor: pointer;

    }
    .service_container_search:hover {
        border: min(0.069dvw, 1px) solid transparent;
        background-color: transparent;
        box-shadow: 0px 0px 0px 4px #FFF, 0px 0px 0px 2px #26AC34;
    }
    .user_profile{
        display: none;
    }
    .cart_b{
        display: flex;
        margin: auto 0px;
    }

    .cart_b svg {
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

@media (width <= 376px) {
    .main_menu {
        height: min(15.957dvw, 60px);
        padding: min(3.191dvw, 12px) min(4.255dvw, 16px);
    }

    /* .main_menu_container{
        height: 44px;
        
    } */
    .main_menu_container_2 {
        top: min(15.957dvw, 60px);
    }
    .container_link_2 {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding: min(3.191dvw, 12px) min(1.064dvw, 4px) min(4.255dvw,16px) min(1.064dvw, 4px);
        box-sizing: border-box;
        gap: min(4.255dvw,16px);
        z-index: 999;
    }
    
    
    .link_list{
        display: flex;
        flex-direction: column;
        width: inherit;
        height: fit-content;
        gap: min(1.064dvw, 4px);
    }
    .link_list button {
        display: flex;
        width: inherit;
        height: min(12.766dvw,48px);
        border: none;
        background-color: inherit;
        cursor: pointer;
        padding: min(3.191dvw, 12px);
        align-items: center;
    }
    .link_list button svg{
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
    }
       /* .link_list button svg{
        width: min(3.226dvw, 24px);
        height: min(3.226dvw, 24px);
        margin-right: min(2.151dvw, 16px);
    } */
    .link_list button h3{
        font-size: min(3.723dvw, 14px);
    }
    .link_list svg path:hover{
        stroke: #26AC34;
        /* fill: #26AC34; */
    }
    .link_list button:hover {
        color: #26AC34;
        /* background-color: #26AC34; */
        border-radius: min(1.064dvw, 4px);
        background: #FAFAFA;
    }

    .service_no_keyPass{
        padding-top: min(4.255dvw, 16px);
        gap: min(4.255dvw, 16px);
    }
    .service_no_keyPass button {
        height: min(9.574dvw, 36px);
        font-size: min(3.723dvw, 14px);
        border-radius: min(1.064dvw, 4px);
        box-shadow: 0px min(0.266dvw, 1px) min(0.532dvw, 2px) 0px rgba(0, 0, 0, 0.05);
    }
    .service_no_keyPass div{
        gap: min(3.191dvw, 12px);
    }
    .service_no_keyPass div span{
        font-size: min(3.191dvw, 12px);
    }
    .service_no_keyPass div span:nth-child(3){
        font-size: min(3.191dvw, 12px);
    }
    .service_with_keyPass{       
        padding-top: min(6.383dvw, 24px);
        gap: min(4.255dvw, 16px);
    }
    .user_2{
        height: min(9.574dvw, 36px);
    }
    .icon_2{
        width: min(9.574dvw, 36px);
        height: min(9.574dvw, 36px);
    }
    .information_2 h4{
        height: min(5.319dvw, 20px);
        font-size: min(3.723dvw, 14px);
    }
    .information_2 h5{
        height: min(4.255dvw, 16px);
        font-size: min(3.191dvw, 12px);
    }
    .account_bt{
        height: min(5.319dvw, 20px);
        font-size: min(3.723dvw, 14px);
    }
    .signOut{
        height: min(9.574dvw, 36px);
        font-size: min(3.723dvw, 14px);
    }

    .burger_icon {
        height: min(6.383dvw, 24px);
        gap: min(4.255dvw, 16px);
    }
    .burger_icon div:nth-child(1) svg {
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
        cursor: pointer;
    }
    .burger_icon div:nth-child(2) {
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
        /* cursor: pointer */
    }

    .cart_b svg {
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
        cursor: pointer;
    }

    .search_icon_2 {
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
    }

    .leafy_icon {
        width: min(18.351dvw, 69px);
        height: min(9.574dvw, 36px);
    }
    .leafy_icon img:nth-child(2){
        width: inherit;
        height: auto;
    }
}</style>