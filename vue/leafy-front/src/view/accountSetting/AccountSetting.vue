<script setup>
import BaseMenu from '../../components/BaseMenu.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import {useRouter} from 'vue-router'
import {onMounted, onUpdated, ref} from 'vue'
const myRouter =useRouter()
const goProfile=()=>myRouter.push({name:'Profile_AS'})
const goAddress=()=>myRouter.push({name:'Address_AS'})
const goChangePW=()=>myRouter.push({name:'ChangePW_AS'})
const goBank=()=>myRouter.push({name:'Bank_AS'})
const goMyShop=()=>myRouter.push({name:'Shop_AS'})
const goOrder=()=>myRouter.push({name:'Order_AS'})
//common attribute
const isShowNested=ref(false)
const arrayLink=ref([
    {name:'profile',index:0},
    {name:'address',index:1},
    {name:'new-address',index:1},
    {name:'change-password',index:2} ,
    {name:'bank',index:3},
    {name:'new-bank',index:3},
    {name:'products',index:4,child:0},
    {name:'add-product',index:4,child:0},
    {name:'orders',index:4,child:1},
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
    if(linkLocation.index==4){
        
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.12104 15.8037C5.15267 14.6554 7.4998 14 10 14C12.5002 14 14.8473 14.6554 16.879 15.8037M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h5>
                    Profile
                </h5>
            </button>
            <!-- address -->
            <button class="url_link" @click="goAddress">
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.657 14.6572L10.414 18.9002C10.2284 19.0859 10.0081 19.2333 9.76556 19.3338C9.52303 19.4344 9.26305 19.4861 9.0005 19.4861C8.73796 19.4861 8.47798 19.4344 8.23544 19.3338C7.99291 19.2333 7.77256 19.0859 7.587 18.9002L3.343 14.6572C2.22422 13.5384 1.46234 12.1129 1.15369 10.5611C0.845043 9.00922 1.00349 7.40071 1.60901 5.93893C2.21452 4.47714 3.2399 3.22774 4.55548 2.3487C5.87107 1.46967 7.41777 1.00049 9 1.00049C10.5822 1.00049 12.1289 1.46967 13.4445 2.3487C14.7601 3.22774 15.7855 4.47714 16.391 5.93893C16.9965 7.40071 17.155 9.00922 16.8463 10.5611C16.5377 12.1129 15.7758 13.5384 14.657 14.6572V14.6572Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.1213 11.1213C11.6839 10.5587 12 9.79565 12 9C12 8.20435 11.6839 7.44129 11.1213 6.87868C10.5587 6.31607 9.79565 6 9 6C8.20435 6 7.44129 6.31607 6.87868 6.87868C6.31607 7.44129 6 8.20435 6 9C6 9.79565 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h5>
                    Addresses
                </h5>
            </button>
            <!-- change password -->
            <button class="url_link" @click="goChangePW">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5.00008C13.5304 5.00008 14.0391 5.21079 14.4142 5.58586C14.7893 5.96094 15 6.46964 15 7.00008M19 7.00008C19.0003 7.93725 18.781 8.86145 18.3598 9.69862C17.9386 10.5358 17.3271 11.2627 16.5744 11.821C15.8216 12.3792 14.9486 12.7535 14.0252 12.9136C13.1018 13.0737 12.1538 13.0153 11.257 12.7431L9 15.0001H7V17.0001H5V19.0001H2C1.73478 19.0001 1.48043 18.8947 1.29289 18.7072C1.10536 18.5196 1 18.2653 1 18.0001V15.4141C1.00006 15.1489 1.10545 14.8946 1.293 14.7071L7.257 8.74308C7.00745 7.91809 6.93857 7.04902 7.05504 6.19502C7.17152 5.34102 7.47062 4.52215 7.93199 3.79412C8.39336 3.0661 9.00616 2.44602 9.72869 1.97609C10.4512 1.50617 11.2665 1.19743 12.1191 1.07088C12.9716 0.944336 13.8415 1.00296 14.6693 1.24276C15.4972 1.48256 16.2637 1.89791 16.9166 2.46054C17.5696 3.02317 18.0936 3.71987 18.4531 4.50322C18.8127 5.28656 18.9992 6.13817 19 7.00008Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h5>
                    Password
                </h5>
            </button>
            <!-- Banks -->
            <button class="url_link" @click="goBank">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6H19M5 11H6M10 11H11M4 15H16C16.7956 15 17.5587 14.6839 18.1213 14.1213C18.6839 13.5587 19 12.7956 19 12V4C19 3.20435 18.6839 2.44129 18.1213 1.87868C17.5587 1.31607 16.7956 1 16 1H4C3.20435 1 2.44129 1.31607 1.87868 1.87868C1.31607 2.44129 1 3.20435 1 4V12C1 12.7956 1.31607 13.5587 1.87868 14.1213C2.44129 14.6839 3.20435 15 4 15Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <h5>
                    Banks
                </h5>
            </button>
            <!-- My Shop -->
            <button class="url_link" @click="showNestedLink()">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7758 7.52468C15.8678 7.32368 16.1328 7.32368 16.2238 7.52468C16.6188 8.38868 17.4918 8.99268 18.4998 8.99268V8.99268C19.8748 8.99268 20.9998 7.86768 20.9998 6.49268V6.49268V6.49268C20.9998 5.50668 20.4408 3.87568 19.9998 2.99268C19.9998 2.99268 18.9998 0.992676 17.7638 0.992676H4.23576C2.99976 0.992676 1.99976 2.99268 1.99976 2.99268C1.55876 3.87568 0.999756 5.50668 0.999756 6.49268V6.49268C0.999756 7.86768 2.12476 8.99268 3.49976 8.99268V8.99268C4.50776 8.99268 5.38076 8.38868 5.77576 7.52468C5.86776 7.32368 6.13276 7.32368 6.22376 7.52468C6.61876 8.38868 7.49176 8.99268 8.49976 8.99268V8.99268C9.50776 8.99268 10.3808 8.38868 10.7758 7.52468C10.8678 7.32368 11.1328 7.32368 11.2238 7.52468C11.6188 8.38868 12.4918 8.99268 13.4998 8.99268V8.99268C14.5078 8.99268 15.3808 8.38868 15.7758 7.52468Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 8.99316V14.9932C3 17.9932 4 18.9932 7 18.9932H15C18 18.9932 19 17.9932 19 14.9932V8.99316" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 18.9932H8V15.9932C8 14.8882 8.895 13.9932 10 13.9932H12C13.105 13.9932 14 14.8882 14 15.9932V18.9932Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6.99316L7 0.993164" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 6.99316L15 0.993164" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11 6.99316V0.993164" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h5>
                    My Shop
                </h5>
            </button>
            <div v-show="isShowNested" class="shop_list">
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
    /* height: fit-content; */
    height: fit-content;
    min-height: 90dvh;
    max-height: 180dvh;
    padding: 24px 160px;
    gap: 20px;
    background-color: #F5F5F5;
}

.container_menu{
    display: flex;
    /* width: 256px; */
    width: 160px;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}
.container_menu button{
    display: flex;
    width: inherit;
    height: 40px;
    padding: 8px 12px;
    gap: 12px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    align-items: center;
}
.container_menu .shop_list{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    padding: 8px 12px 8px 36px;
    gap: 4px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
}
.container_menu .shop_list button{
    display: flex;
    width: 100%;
    height: 36px;
    align-items: center;
}
.container_menu button svg{
    width: 24px;
    height: 24px;
}
.container_menu button h5{
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
}
.container_menu button:hover{
    background-color: #FFFFFF;
}
.container_menu button:hover h5{
    color: #26AC34;
}
.container_menu button:hover svg path{
    stroke: #26AC34;
} 
.wrapper_content{
    display: flex;
    /* width: 844px; */
    width: 100%;
    /* width: 928px; */
    height: fit-content;
    flex-direction: column;
    gap: 24px;
    border: none;
    
}

.link_selected{
    background-color: #fff !important;
    color: #26AC34;
}
/* .link_selected h5{
    
} */
.link_selected svg path{
    stroke: #26AC34;
}

</style>