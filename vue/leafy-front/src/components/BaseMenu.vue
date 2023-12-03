<script setup>
import { useRouter } from 'vue-router';

const myRouter =useRouter()
const goHome=()=>myRouter.push({name:'Home'})
const goSignin=()=>myRouter.push({name:'Login'})
const goShop=()=>myRouter.push({name:'Shop'})
</script>
<template>
    <div class="main_menu">
        <div class="main_menu_container">
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
                <div class="service_container_search">
                    <img class="search_icon" src="../assets/icon/magnifying.svg" alt="search_icon">
                    <input type="text" placeholder="Search">
                </div>
                <button class="cart_b">
                    <img src="../assets/icon/cart_icon.svg" alt="cart_icon">
                </button>
                <button @click="goSignin" class="service_sign-in">
                        Sign in
                </button>    
            </div>
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
    border-radius: 8px;
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
</style>