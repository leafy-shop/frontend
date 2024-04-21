<script setup>
import BaseMenu from '../../components/BaseMenu.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import {useRouter} from 'vue-router'
import {onMounted, onUpdated, ref,onBeforeMount} from 'vue'
import cookie from '../../JS/cookie';
const myRouter =useRouter()
const goProfile=()=>myRouter.push({name:'Profile_AS'})
const goAddress=()=>myRouter.push({name:'Address_AS'})
const goChangePW=()=>myRouter.push({name:'ChangePW_AS'})
const goBank=()=>myRouter.push({name:'Bank_AS'})
const goMyPurchase=()=>myRouter.push({name:'MyPurchase'})
const goMyShop=()=>myRouter.push({name:'Shop_AS'})
const goOrder=()=>myRouter.push({name:'Order_AS'})
const goMyGallery=()=>myRouter.push({name:'MyGallery_AS'})
const goSignIn=()=>myRouter.push({name:'SignIn'})
//common attribute
const userRole=ref('')
const isShowNested=ref(false) //show nested link my shop
const isSupplier=ref(false)
const arrayLink=ref([
    {name:'profile',index:0},
    {name:'address',index:1},
    {name:'new-address',index:1},
    {name:'change-password',index:2} ,
    {name:'bank',index:3},
    {name:'new-bank',index:3},
    {name:'my-purchase',index:4},
    {name:'my-gallery',index:5},
    {name:'products',index:6,child:0},
    {name:'add-product',index:6,child:0},
    {name:'orders',index:6,child:1},
    
])
// for show nested link
const showNestedLink=()=>{
    goMyShop()

}

//function for detect link
const linkSelected=()=>{
    let linkLocation={}
    // const listClass=['link_selected']
    const element =document.getElementsByClassName('url_link')

    //get url and split it out to get last one
    let urlArray=location.href.split('/') //url
    for(let i of arrayLink.value){ //array link
        let status=urlArray.includes(i.name)
        if(status){
            console.log(i)
            linkLocation=i
        }
    }
    
    element[linkLocation.index].classList.add('link_selected')
    if(linkLocation.index==6){
        
        isShowNested.value=true
        if(linkLocation.child!=undefined){
            //add
            document.getElementsByClassName('child_link')[linkLocation.child].classList.add('link_selected')
        }
    }
}

onMounted(()=>{
   
    linkSelected()
})
onBeforeMount(()=>{
    if(cookie.decrypt()!=undefined){
        userRole.value=cookie.decrypt().role
        if( userRole.value=='supplier'){
            isSupplier.value=true
        }
    }else{
        goSignIn()
    }
    //  console.log(cookie.decrypt().role,'lsdfjlkasdf')
})
onUpdated(()=>{
    // linkSelected()
})
</script>
<template>
    <BaseMenu/>
    <div class="wrapper_account">
        <!-- menu -->
        <div class="container_menu">
            <!-- profile -->
            <button class="url_link" @click="goProfile">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.12104 15.8037C5.15267 14.6554 7.4998 14 10 14C12.5002 14 14.8473 14.6554 16.879 15.8037M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    Profile
                </h5></div>
            </button>
            <!-- address -->
            <button class="url_link" @click="goAddress">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.657 14.6572L10.414 18.9002C10.2284 19.0859 10.0081 19.2333 9.76556 19.3338C9.52303 19.4344 9.26305 19.4861 9.0005 19.4861C8.73796 19.4861 8.47798 19.4344 8.23544 19.3338C7.99291 19.2333 7.77256 19.0859 7.587 18.9002L3.343 14.6572C2.22422 13.5384 1.46234 12.1129 1.15369 10.5611C0.845043 9.00922 1.00349 7.40071 1.60901 5.93893C2.21452 4.47714 3.2399 3.22774 4.55548 2.3487C5.87107 1.46967 7.41777 1.00049 9 1.00049C10.5822 1.00049 12.1289 1.46967 13.4445 2.3487C14.7601 3.22774 15.7855 4.47714 16.391 5.93893C16.9965 7.40071 17.155 9.00922 16.8463 10.5611C16.5377 12.1129 15.7758 13.5384 14.657 14.6572V14.6572Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.1213 11.1213C11.6839 10.5587 12 9.79565 12 9C12 8.20435 11.6839 7.44129 11.1213 6.87868C10.5587 6.31607 9.79565 6 9 6C8.20435 6 7.44129 6.31607 6.87868 6.87868C6.31607 7.44129 6 8.20435 6 9C6 9.79565 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    Addresses
                </h5>
            </div>
            </button>
            <!-- change password -->
            <button class="url_link" @click="goChangePW">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 5.00008C13.5304 5.00008 14.0391 5.21079 14.4142 5.58586C14.7893 5.96094 15 6.46964 15 7.00008M19 7.00008C19.0003 7.93725 18.781 8.86145 18.3598 9.69862C17.9386 10.5358 17.3271 11.2627 16.5744 11.821C15.8216 12.3792 14.9486 12.7535 14.0252 12.9136C13.1018 13.0737 12.1538 13.0153 11.257 12.7431L9 15.0001H7V17.0001H5V19.0001H2C1.73478 19.0001 1.48043 18.8947 1.29289 18.7072C1.10536 18.5196 1 18.2653 1 18.0001V15.4141C1.00006 15.1489 1.10545 14.8946 1.293 14.7071L7.257 8.74308C7.00745 7.91809 6.93857 7.04902 7.05504 6.19502C7.17152 5.34102 7.47062 4.52215 7.93199 3.79412C8.39336 3.0661 9.00616 2.44602 9.72869 1.97609C10.4512 1.50617 11.2665 1.19743 12.1191 1.07088C12.9716 0.944336 13.8415 1.00296 14.6693 1.24276C15.4972 1.48256 16.2637 1.89791 16.9166 2.46054C17.5696 3.02317 18.0936 3.71987 18.4531 4.50322C18.8127 5.28656 18.9992 6.13817 19 7.00008Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    Password
                </h5></div>
            </button>
            <!-- Banks -->
            <button class="url_link" @click="goBank">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6H19M5 11H6M10 11H11M4 15H16C16.7956 15 17.5587 14.6839 18.1213 14.1213C18.6839 13.5587 19 12.7956 19 12V4C19 3.20435 18.6839 2.44129 18.1213 1.87868C17.5587 1.31607 16.7956 1 16 1H4C3.20435 1 2.44129 1.31607 1.87868 1.87868C1.31607 2.44129 1 3.20435 1 4V12C1 12.7956 1.31607 13.5587 1.87868 14.1213C2.44129 14.6839 3.20435 15 4 15Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    Banks
                </h5></div>
            </button>
            <!-- My Purchase -->
            <button class="url_link" @click="goMyPurchase">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M8 10H11M8 14H11M5 10H5.01M5 14H5.01" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    My Purchase
                </h5></div>
            </button>
            <!-- My Gallery -->
            <button class="url_link" @click="goMyGallery">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L5.586 8.414C5.96106 8.03906 6.46967 7.82843 7 7.82843C7.53033 7.82843 8.03894 8.03906 8.414 8.414L13 13M11 11L12.586 9.414C12.9611 9.03906 13.4697 8.82843 14 8.82843C14.5303 8.82843 15.0389 9.03906 15.414 9.414L17 11M11 5H11.01M3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    My Gallery
                </h5></div>
            </button>
            <!-- My Shop -->
            <button v-if="isSupplier" class="url_link" @click="showNestedLink()">
                <div class="header_link">
                <div class="link_icon">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7758 7.52468C15.8678 7.32368 16.1328 7.32368 16.2238 7.52468C16.6188 8.38868 17.4918 8.99268 18.4998 8.99268V8.99268C19.8748 8.99268 20.9998 7.86768 20.9998 6.49268V6.49268V6.49268C20.9998 5.50668 20.4408 3.87568 19.9998 2.99268C19.9998 2.99268 18.9998 0.992676 17.7638 0.992676H4.23576C2.99976 0.992676 1.99976 2.99268 1.99976 2.99268C1.55876 3.87568 0.999756 5.50668 0.999756 6.49268V6.49268C0.999756 7.86768 2.12476 8.99268 3.49976 8.99268V8.99268C4.50776 8.99268 5.38076 8.38868 5.77576 7.52468C5.86776 7.32368 6.13276 7.32368 6.22376 7.52468C6.61876 8.38868 7.49176 8.99268 8.49976 8.99268V8.99268C9.50776 8.99268 10.3808 8.38868 10.7758 7.52468C10.8678 7.32368 11.1328 7.32368 11.2238 7.52468C11.6188 8.38868 12.4918 8.99268 13.4998 8.99268V8.99268C14.5078 8.99268 15.3808 8.38868 15.7758 7.52468Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 8.99316V14.9932C3 17.9932 4 18.9932 7 18.9932H15C18 18.9932 19 17.9932 19 14.9932V8.99316" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 18.9932H8V15.9932C8 14.8882 8.895 13.9932 10 13.9932H12C13.105 13.9932 14 14.8882 14 15.9932V18.9932Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 6.99316L7 0.993164" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 6.99316L15 0.993164" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 6.99316V0.993164" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h5>
                    My Shop
                </h5>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="link_arrow">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.35092 8.76551C6.57568 8.541 6.88048 8.41487 7.1983 8.41487C7.51611 8.41487 7.82091 8.541 8.04567 8.76551L11.9925 12.7092L15.9393 8.76551C16.0499 8.65113 16.1822 8.5599 16.3284 8.49713C16.4746 8.43437 16.6319 8.40133 16.791 8.39995C16.9502 8.39857 17.108 8.42887 17.2553 8.48908C17.4026 8.5493 17.5364 8.63822 17.649 8.75067C17.7615 8.86311 17.8505 8.99683 17.9107 9.14401C17.971 9.29119 18.0013 9.44888 18 9.6079C17.9986 9.76691 17.9655 9.92406 17.9027 10.0702C17.8399 10.2163 17.7486 10.3484 17.6341 10.4589L12.8399 15.2493C12.6151 15.4738 12.3103 15.5999 11.9925 15.5999C11.6747 15.5999 11.3699 15.4738 11.1451 15.2493L6.35092 10.4589C6.12623 10.2343 6 9.92977 6 9.61221C6 9.29465 6.12623 8.99009 6.35092 8.76551V8.76551Z" fill="#212121"/>
                </svg>
            </button>
            <div v-if="isSupplier" v-show="isShowNested" class="shop_list">
                <button @click="goMyShop()" class="child_link">
                    Products
                </button>
                <button @click="goOrder()" class="child_link">
                    Orders
                </button>
            </div>
            
        </div>
        <!-- nested page -->
        <div class="wrapper_content">
            <router-view></router-view>
        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_account{
    display: flex;
    width: auto;
    height: fit-content;
    min-height: 90dvh;
    max-height: 100%;
    padding: min(1.667dvw,24px) min(11.111dvw,160px);
    gap: min(2.222dvw,32px);
    background-color: #F5F5F5;
}

.container_menu{
    display: flex;
    width: min(11.111dvw,160px);
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}
.container_menu .url_link{
    display: flex;
    width: inherit;
    height: min(2.778dvw,40px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border: none;
    border-radius: min(0.556dvw,8px);
    background-color: transparent;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
}
.container_menu .shop_list{
    display: flex;
    /* width: inherit; */
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: 0px 0px 0px min(2.5dvw,36px);
    gap: min(0.278dvw,4px);
    border: none;
    border-radius: min(0.556dvw,8px);
    background-color: transparent;
    cursor: pointer;
}
.container_menu .shop_list .child_link{
    display: flex;
    width: 100%;
    height: min(2.5dvw,36px);
    align-items: center;
    font-weight: 500;
    border: none;
    border-radius: min(0.556dvw,8px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
}
.container_menu .url_link .link_icon {
    display: flex;
    width: min(1.667dvw,24px);
    height: min(1.667dvw,24px);
    justify-content: center;
    align-items: center;
}
.container_menu .url_link .header_link h5{
    display: flex;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
    justify-content: center;
    align-items: center;
}
.container_menu .url_link:hover{
    background-color: #FFFFFF;
}
.container_menu .url_link:hover .header_link h5{
    color: #26AC34;
}
.container_menu .url_link:hover svg path{
    stroke: #26AC34;
} 
.container_menu .url_link:hover .link_arrow path{
    fill: #26AC34;
} 
.container_menu .header_link {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.833dvw,12px);
    border: none;
    align-items: center;
}
.wrapper_content{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw,24px);
    border: none;
    
}

.link_selected{
    background-color: #fff !important;
    color: #26AC34;
}
/* .link_selected h5{
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
} */
.link_selected div svg path{
    stroke: #26AC34;
}

</style>