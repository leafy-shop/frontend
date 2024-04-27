<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseGalleryCard from '../components/gallery/BaseGalleryCard.vue';
import BaseGallerySort from '../components/gallery/BaseGallerySort.vue';
import fetch from '../JS/api';
import cookie from '../JS/cookie';
import {ref,onBeforeMount,onBeforeUpdate} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import validation from '../JS/validation'
import BaseAlert from '../components/BaseAlert.vue';
import BaseSelectPage from '../components/BaseSelectPage.vue';
import BaseConfirm from '../components/BaseConfirm.vue';
import BaseEmptyList from '../components/BaseEmptyList.vue';

// link
let origin = `${import.meta.env.VITE_BASE_URL}`;
const myRouter=useRouter()
const goShopProfile=()=>myRouter.push({name:'Profile',params:{id:owner.value.userId}})
const goMyGalleryUpdate=(galleryId)=>myRouter.push({name:'MyGallery_AS_add',params:{method:'edit-gallery',id:validation.encrypt(`000${galleryId}`)}})
const goGalleryDetail=(galleryId)=>myRouter.push({name:'GalleryDetail',params:{id:galleryId}})

// common attribute
let {params} =useRoute()
const galleryList=ref([])
const isMe=ref(false)
const galleryId=ref("")
// const userName=ref('')
const userId=ref('')
const owner=ref({})
const id=ref('')

// move page
const currentPage=ref(1)
const allPage=ref(0)
// filter
const itemFilter=ref(undefined)

// img
const imageS=ref(false)
const coverphotoS=ref(false)

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)
// for display confirm delete
const isDelete = ref(false)
// get status
const getDataStatus=ref(undefined)

// get gallery
const getGallery=async()=>{
    getDataStatus.value=undefined
    let inputData={
        page:currentPage.value,
        limit:10
    }
    if(owner.value.username!=undefined){
        inputData["contentOwner"]=owner.value.username
    }
    if(itemFilter.value!=undefined){
        let [keyObj]=Object.keys(itemFilter.value)
        console.log(keyObj)
        if(keyObj=='style'){
            inputData["style"]=itemFilter.value.style
        }else{
            if(itemFilter.value.sort_name!="all"){
                inputData["sort_name"]=itemFilter.value.sort_name
            }
        }
    }
    let {status,data}= await fetch.getGallery(inputData)
    if(await status){
        console.log(data)
        // dataList =
        // if(data.list!=undefined){
            galleryList.value =await data.list
            allPage.value=await data.allPage
        // }
        if(galleryList.value.length!=0){
            getDataStatus.value=true
        }else{
            getDataStatus.value=false
        }
    }else{
        getDataStatus.value=false
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}

// // change mode
const changeMode=()=>{
    if(id.value!=undefined||userId.value!=undefined){ //if login
        isMe.value=Number(id.value)==Number(userId.value)?true:false
    }else{ //if not login
        isMe.value=false
    }
}


// get store
const getStore =async()=>{
    let {status,data}= await fetch.getStore(id.value)
    // console.log(data,"Testing store")
    if(await status){
        console.log(data)
        owner.value = await data
        getGallery()
        // changeMode()
    }else{
        // error
    }
    
}

// delete gallery
const deleteGallery=async(galleryId)=>{
    let{status,msg}=await fetch.deleteGallery(galleryId)
    if(await status){
        console.log('delete successful')
        await getGallery()
        isDelete.value=false
    }else{
        isDelete.value=false
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}

// filter
const galleryFilter=async(filter)=>{
    itemFilter.value=filter
    console.log(filter)
    await getGallery()
}


// move page
const changePage=async(input)=>{
    currentPage.value=input
    await getGallery()
}

// check img
const checkImg = async (type) => {
    if (owner.value!=undefined) {
        let { status, msg } = await fetch.getImage("users", owner.value.userId,type)
        if (status) {
            // console.log('have image')
            return status
        }
    }
}

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

// confirm delete
const showConfirm = (id) => {
    isDelete.value = true
    galleryId.value = id
}
const confirmBank = async (input = false) => {
    if (!input) isDelete.value = false;
    else {

        // delete api
        // console.log("delete function")
        if (galleryId.value.length != 0) {
            await deleteGallery(galleryId.value);
            // console.log(addressId.value)
        }
        else {
            isDelete.value = false
            console.log("close overlay")

        }
    }
}

onBeforeMount(async()=>{
    // param
    id.value=params.id
    // id.value=validation.decrypt(params.id)
    //get cookie
    if(cookie.checkKeyPass()){
        userId.value=cookie.decrypt().id    
    }
    changeMode()
    
    // console.log(id.value)
    // console.log(userId.value)

    await getStore()
    imageS.value=await checkImg() //check img icon
    coverphotoS.value=await checkImg('coverphoto')
    await getGallery()
})
</script>
<template>
    <BaseMenu class="menu"/>
    <!-- gallery -->
    <div class="wrapper_gallery_profile">
        <div class="gallery_profile">
            <!-- user info -->
            <div class="container_user_info">
                <div class="big_image">
                    <img v-if="coverphotoS!=undefined" :src="`${origin}/api/image/users/${owner.userId}/coverphoto`" alt="user_img">
                            <img  v-else src="../assets/shop_p/shop_title.jpg" alt="user_img">
                    <!-- <img v-else :src="`${origin}/api/image/users/${owner.userId}/coverphoto`" alt="big_img"> -->
                </div>
                <!-- <img src="../assets/vue.svg" alt="soybean"> -->
                <!-- wrapper 1 -->
                <div class="wrapper_user">
                    <!-- user img & username -->
                    <div class="user">
                        <div class="user_img">
                            <img v-if="!imageS" src="../assets/shop_p/avatar_userProfile.png" alt="user_img">
                            <img v-else :src="`${origin}/api/image/users/${owner.userId}`" alt="">
                        </div>
                        <div class="user_info">
                            <h5>
                                {{ owner.username }}
                            </h5>
                            <!-- chat & follower & new product -->
                            <div>
                                <!-- <button v-if="!isMe&&profileMode==pMode[0].mode" class="chat_btn">
                                    Chat Now
                                </button>
                                <button v-if="!isMe&&profileMode==pMode[0].mode" class="follow_btn">
                                    Follow
                                </button> -->
                                
                                <!-- myself -->
                                <!-- people see -->
                                <button @click="goShopProfile" v-if="owner.role=='supplier'" class="new_product_btn">
                                    <!-- <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C6.31826 0 6.62348 0.126428 6.84853 0.351472C7.07357 0.576516 7.2 0.88174 7.2 1.2V4.8H10.8C11.1183 4.8 11.4235 4.92643 11.6485 5.15147C11.8736 5.37652 12 5.68174 12 6C12 6.31826 11.8736 6.62348 11.6485 6.84853C11.4235 7.07357 11.1183 7.2 10.8 7.2H7.2V10.8C7.2 11.1183 7.07357 11.4235 6.84853 11.6485C6.62348 11.8736 6.31826 12 6 12C5.68174 12 5.37652 11.8736 5.15147 11.6485C4.92643 11.4235 4.8 11.1183 4.8 10.8V7.2H1.2C0.88174 7.2 0.576516 7.07357 0.351472 6.84853C0.126428 6.62348 0 6.31826 0 6C0 5.68174 0.126428 5.37652 0.351472 5.15147C0.576516 4.92643 0.88174 4.8 1.2 4.8H4.8V1.2C4.8 0.88174 4.92643 0.576516 5.15147 0.351472C5.37652 0.126428 5.68174 0 6 0Z" fill="white"/>
                                    </svg> -->
                                    <span v-if="!isMe">
                                        View Shop
                                    </span>
                                    <span v-else>
                                        My Shop
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- container mobile btn -->
                    <div class="container_btn_mobile">
                        <!-- people see -->
                        <button @click="goShopProfile" v-if="owner.role=='supplier'" class="new_product_btn">
                            <!-- <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C6.31826 0 6.62348 0.126428 6.84853 0.351472C7.07357 0.576516 7.2 0.88174 7.2 1.2V4.8H10.8C11.1183 4.8 11.4235 4.92643 11.6485 5.15147C11.8736 5.37652 12 5.68174 12 6C12 6.31826 11.8736 6.62348 11.6485 6.84853C11.4235 7.07357 11.1183 7.2 10.8 7.2H7.2V10.8C7.2 11.1183 7.07357 11.4235 6.84853 11.6485C6.62348 11.8736 6.31826 12 6 12C5.68174 12 5.37652 11.8736 5.15147 11.6485C4.92643 11.4235 4.8 11.1183 4.8 10.8V7.2H1.2C0.88174 7.2 0.576516 7.07357 0.351472 6.84853C0.126428 6.62348 0 6.31826 0 6C0 5.68174 0.126428 5.37652 0.351472 5.15147C0.576516 4.92643 0.88174 4.8 1.2 4.8H4.8V1.2C4.8 0.88174 4.92643 0.576516 5.15147 0.351472C5.37652 0.126428 5.68174 0 6 0Z" fill="white"/>
                            </svg> -->
                            <span v-if="!isMe">
                                View Shop
                            </span>
                            <span v-else>
                                My Shop
                            </span>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div class="wrapper_content">
                <!-- gallery list another people see -->
                <div v-if="!isMe" class="container_gallery">
                    <!-- sort -->
                    <!-- <div class="gallery_sort"> -->
                        <BaseGallerySort  name="gallery_profile_sort" :current-page="currentPage" :all-page="allPage" @getStyleFilter="galleryFilter" @nextPage="changePage" @previousPage="changePage"  />
                    <!-- </div> -->
                        <!-- its not me -->
                    <!-- gallery list -->
                    <div v-if="getDataStatus" class="gallery_list">
                        <div v-for="(gallery,index) of galleryList" :key="index" class="wrapper_gallery_item">
                            <BaseGalleryCard @click="goGalleryDetail(gallery.contentId)" name="gallery_profile_item" :project-id="String(gallery.contentId)" :project-name="gallery.name" :project-img="gallery.image"
                            :creater-name="gallery.contentOwner" :creater-id="String(gallery.userId)" :creater-img="gallery.icon" :like-count="gallery.like" :comment-count="gallery.comment" :create-at="gallery.createdAt" />
                        </div>
                    </div>
                    <BaseEmptyList name="profile_gallery_list" title="Hey there! Looks like we're currently out of gallery content. Sorry about that! 😊" :showEmpty="getDataStatus" />
                </div>

                <!-- gallery list is me -->
                <div v-else class="container_gallery_me">
                    <!-- sort -->
                    <!-- <div class="gallery_sort"> -->
                        <BaseGallerySort  name="gallery_profile_sort"  :current-page="currentPage" :all-page="allPage" @getStyleFilter="galleryFilter" @nextPage="changePage" @previousPage="changePage"  />
                    <!-- </div> -->
                    <!-- gallery list -->
                    <div v-if="getDataStatus" class="gallery_list_me">
                        <div v-for="(gallery,index) of galleryList" :key="index" class="gallery_item">
                            <!-- img -->
                            <div class="gallery_img_me">
                                <img v-if="gallery.image!=undefined" :src="`${origin}/api/image/gallery/${gallery.contentId}`" alt="gallery_img">
                                <img v-else src="../assets/default_image.png" alt="gallery_img">
                            </div>
                            <!-- info -->
                            <div class="wrapper_gallery_detail_me">
                                <!-- detail & operator -->
                                <div class="container_detail_me">
                                    <!-- project name -->
                                    <div class="header_detail_me">
                                        <h6>
                                            {{ gallery.name }}
                                        </h6>
                                        <div >
                                            <!-- edit -->
                                            <button @click="goMyGalleryUpdate(gallery.contentId)">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.16732 3.16664H3.00065C2.55862 3.16664 2.1347 3.34223 1.82214 3.65479C1.50958 3.96736 1.33398 4.39128 1.33398 4.83331V14C1.33398 14.442 1.50958 14.8659 1.82214 15.1785C2.1347 15.491 2.55862 15.6666 3.00065 15.6666H12.1673C12.6093 15.6666 13.0333 15.491 13.3458 15.1785C13.6584 14.8659 13.834 14.442 13.834 14V9.83331M12.6557 1.98831C12.8094 1.82912 12.9933 1.70215 13.1966 1.6148C13.4 1.52746 13.6187 1.48148 13.84 1.47956C14.0613 1.47763 14.2807 1.5198 14.4856 1.6036C14.6904 1.6874 14.8765 1.81116 15.033 1.96765C15.1895 2.12414 15.3132 2.31022 15.397 2.51505C15.4808 2.71988 15.523 2.93934 15.5211 3.16064C15.5191 3.38194 15.4732 3.60064 15.3858 3.80398C15.2985 4.00732 15.1715 4.19123 15.0123 4.34497L7.85732 11.5H5.50065V9.14331L12.6557 1.98831Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                            <!-- delete -->
                                            <button @click="showConfirm(gallery.contentId)">
                                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.33398 8.16667V13.1667M9.66732 8.16667V13.1667M1.33398 4.83333H14.6673M13.834 4.83333L13.1115 14.9517C13.0816 15.3722 12.8934 15.7657 12.5849 16.053C12.2764 16.3403 11.8705 16.5 11.449 16.5H4.55232C4.13077 16.5 3.72487 16.3403 3.41639 16.053C3.1079 15.7657 2.91975 15.3722 2.88982 14.9517L2.16732 4.83333H13.834ZM10.5007 4.83333V2.33333C10.5007 2.11232 10.4129 1.90036 10.2566 1.74408C10.1003 1.5878 9.88833 1.5 9.66732 1.5H6.33398C6.11297 1.5 5.90101 1.5878 5.74473 1.74408C5.58845 1.90036 5.50065 2.11232 5.50065 2.33333V4.83333H10.5007Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <!-- description -->
                                    <p class="project_description_me">
                                        {{ gallery.description }}
                                    </p>
                                </div>
                                <!-- create at-->
                                <div class="container_project_like">
                                    <!-- like -->
                                    <!-- <div>
                                        <div>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.92501 0.250568C7.24051 0.250568 7.55551 0.295068 7.85501 0.395568C9.70051 0.995568 10.3655 3.02057 9.81001 4.79057C9.49501 5.69507 8.98001 6.52057 8.30551 7.19507C7.34001 8.13007 6.28051 8.96007 5.14001 9.67507L5.01501 9.75057L4.88501 9.67007C3.74051 8.96007 2.67501 8.13007 1.70051 7.19007C1.03051 6.51557 0.515008 5.69507 0.195008 4.79057C-0.369992 3.02057 0.295008 0.995568 2.16051 0.385068C2.30551 0.335068 2.45501 0.300068 2.60501 0.280568H2.66501C2.80551 0.260068 2.94501 0.250568 3.08501 0.250568H3.14001C3.45501 0.260068 3.76001 0.315068 4.05551 0.415568H4.08501C4.10501 0.425068 4.12001 0.435568 4.13001 0.445068C4.24051 0.480568 4.34501 0.520568 4.44501 0.575568L4.63501 0.660568C4.68092 0.685054 4.73245 0.722468 4.77699 0.754803C4.80521 0.77529 4.83062 0.793739 4.85001 0.805568C4.85817 0.810382 4.86646 0.815222 4.87482 0.820102C4.91769 0.845129 4.96235 0.871198 5.00001 0.900068C5.55551 0.475568 6.23001 0.245568 6.92501 0.250568ZM8.25501 3.85057C8.46001 3.84507 8.63501 3.68057 8.65001 3.47007V3.41057C8.66501 2.71007 8.24051 2.07557 7.59501 1.83057C7.39001 1.76007 7.16501 1.87057 7.09001 2.08057C7.02001 2.29057 7.13001 2.52057 7.34001 2.59507C7.66051 2.71507 7.87501 3.03057 7.87501 3.38007V3.39557C7.86551 3.51007 7.90001 3.62057 7.97001 3.70557C8.04001 3.79057 8.14501 3.84007 8.25501 3.85057Z" fill="#BDBDBD"/>
                                            </svg>
                                        </div>
                                        <h6>
                                            {{gallery.like}}
                                        </h6>
                                    </div> -->
                                    <!-- comment -->
                                    <!-- <div>
                                        <div>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.00751C0 2.37356 2.105 0 5.01 0C7.85 0 10 2.32849 10 4.99249C10 8.08212 7.48 10 5 10C4.18 10 3.27 9.77967 2.54 9.34902C2.285 9.19379 2.07 9.07862 1.795 9.16875L0.785 9.4692C0.53 9.54932 0.3 9.34902 0.375 9.07862L0.71 7.95694C0.765 7.8017 0.755 7.63645 0.675 7.50626C0.245 6.71507 0 5.84877 0 5.00751ZM4.35 5.00751C4.35 5.36304 4.635 5.64847 4.99 5.65348C5.345 5.65348 5.63 5.36304 5.63 5.01252C5.63 4.65699 5.345 4.37156 4.99 4.37156C4.64 4.36655 4.35 4.65699 4.35 5.00751ZM6.655 5.01252C6.655 5.36304 6.94 5.65348 7.295 5.65348C7.65 5.65348 7.935 5.36304 7.935 5.01252C7.935 4.65699 7.65 4.37156 7.295 4.37156C6.94 4.37156 6.655 4.65699 6.655 5.01252ZM2.685 5.65348C2.335 5.65348 2.045 5.36304 2.045 5.01252C2.045 4.65699 2.33 4.37156 2.685 4.37156C3.04 4.37156 3.325 4.65699 3.325 5.01252C3.325 5.36304 3.04 5.64847 2.685 5.65348Z" fill="#BDBDBD"/>
                                            </svg>
                                        </div>
                                        <h6>
                                            {{gallery.comment}}
                                        </h6>
                                    </div> -->
                                    <!-- create at -->
                                    <div>   
                                        <div>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C2.24 10 0 7.765 0 5C0 2.24 2.24 0 5 0C7.765 0 10 2.24 10 5C10 7.765 7.765 10 5 10ZM6.595 6.855C6.655 6.89 6.72 6.91 6.79 6.91C6.915 6.91 7.04 6.845 7.11 6.725C7.215 6.55 7.16 6.32 6.98 6.21L5.2 5.15V2.84C5.2 2.63 5.03 2.465 4.825 2.465C4.62 2.465 4.45 2.63 4.45 2.84V5.365C4.45 5.495 4.52 5.615 4.635 5.685L6.595 6.855Z" fill="#BDBDBD"/>
                                            </svg>
                                        </div>
                                        <h6>
                                            {{gallery.createdAt}}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BaseEmptyList name="profile_gallery_me_list" title="Hey there! Looks like we're currently out of gallery content. Sorry about that! 😊" :showEmpty="getDataStatus" />

                </div>
            </div>
        </div>
        <BaseConfirm name="gallery_list" header-confirm="Do you want to delete the current content?" submit-title="Delete" :show-confirm="isDelete"  @cancel="confirmBank()" @submit="confirmBank(true)"  />
        <BaseSelectPage name="gallery_profile_move" :total-page="allPage" :current-page="currentPage" @changePage="changePage" @moveLeft="changePage" @moveRight="changePage" />
        <BaseAlert name="gallery_profile_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_gallery_profile {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    min-height: 90dvh;
    max-height: 100%;
    gap: min(1.389dvw, 20px);
    background-color: #F5F5F5;
    justify-content: start;
    /* align-items: center; */
    padding-bottom: 20px;
}
.gallery_profile{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}
.container_user_info {
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: min(17.778dvw, 256px);
}

.big_image {
    display: flex;
    width: 100%;
    height: min(13.333dvw, 192px);
    overflow: hidden;
    justify-content: center;
    align-items: center;
    z-index: 0;
}

.big_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.wrapper_user {
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: min(8.889dvw,128px);
    justify-content: center;
    align-items: center;
    bottom: 0;

    padding: 0px min(11.111dvw,160px);
}

.user {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: end;
    gap: min(1.389dvw, 20px);
}

.user .user_img {
    display: flex;
    width: min(8.889dvw,128px);
    height: min(8.889dvw,128px);
    flex-grow: 1;
    border-radius: 50%;
    /* border: min(0.278dvw, 4px) solid #FFF; */
    /* margin: 4px; */
    overflow: hidden;
    background-color: #FAFAFA;
    border-collapse: collapse;
    justify-content: center;
    align-items: center;
}

.user_img img {
    
    width: 100%;
    height: 100%;
    object-fit:cover;
}

.user_info {
    display: flex;
    flex-shrink: 6;
    /* width: 67.5dvw; */
    /* min-width: min(67.5dvw, 972px); */
    width: 100%;
    /* max-width: 100%; */
    height: fit-content;
    justify-content: space-between;
    align-items: end;
    gap: min(0.833dvw, 12px);
}

.user_info h5 {
    width: fit-content;
    height: min(2.5dvw, 36px);
    font-size: min(1.667dvw, 24px);
    font-weight: 700;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.user_info div {
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: min(0.833dvw, 12px);
}
.wrapper_user .container_btn_mobile{
    display: none;
}
.user_info div button {
    display: flex;
    /* width: min(8.611dvw, 124px); */
    width: fit-content;
    min-width: min(8.611dvw, 124px);
    height: min(2.778dvw, 40px);
    font-size: min(1.111dvw, 16px);
    border: min(0.069dvw, 1px) solid;
    border-color: #26AC34;
    color: #26AC34;
    background-color: #FFF;
    border-radius: min(0.278dvw, 4px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
}
/* myself */
.user_info .new_product_btn{
    white-space: nowrap;
    gap: min(0.278dvw,4px);
    color: #fff;
    background-color: #26AC34 ;
}
.user_info .new_product_btn svg{
    width: min(0.833dvw,12px);
    height: auto;
}
.user_info .new_product_btn span{
    font-size: min(1.111dvw,16px);
    font-weight: 500;
}
.follow_btn:hover,
.chat_btn:hover {
    border-color: #26AC34;
    color: #fff;
    background-color: #26AC34;
}

.follow_btn:active,
.chat_btn:active {
    background-color: #58d264;
    border-color: #58d264;
}

.wrapper_content{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    justify-content: start;
}
/* people see */
.container_gallery{
    display: flex;
    width: min(77.778dvw,1120px);
    height: fit-content;
    flex-direction: column;
    gap: min(1.389dvw,20px);

    padding: min(1.389dvw,20px) 0px;

}
/* sort */
.container_gallery .gallery_sort{
    display: flex;
    width: 100%;
    height: fit-content;;
}
/* gallery list */
.container_gallery .gallery_list{
    display: grid;
    width: 100%;
    height: fit-content;
    grid-template-columns: repeat(4,1fr);
    gap: min(2.222dvw,32px);
}
.gallery_list .wrapper_gallery_item{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}




/* is me */
.container_gallery_me{
    display: flex;
    /* width: min(77.778dvw,1120px); */
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.389dvw,20px);
    padding: min(1.389dvw,20px) min(11.111dvw,160px);
}
.gallery_list_me{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(0.833dvw,12px);

}
.container_gallery_me .gallery_item{
    display: flex;
    width: 100%;
    height: min(9.167dvw,132px);
    border: none;
    border-radius: min(0.556dvw,8px);
    overflow: hidden;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000F;
    background-color: #fff;
}
/* img */
.gallery_img_me{
    display: flex;
    width: min(15.833dvw,228px);
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.gallery_img_me img{
    width: 100%;
    height: 100%;
    object-fit:cover;
}
/* detail */
.gallery_item .wrapper_gallery_detail_me{
    display: flex;
    /* width: min(61.944dvw,892px); */
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: min(0.833dvw,12px);
    gap: min(0.833dvw,12px);
}
.wrapper_gallery_detail_me .container_detail_me{
    display: flex;
    width: 100%;
    height: fit-content;
    min-height: min(5.556dvw,80px);
    max-height: 100%;
    flex-direction: column;
    gap: min(0.556dvw,8px);
}
.container_detail_me .header_detail_me{
    display: flex;
    width: 100%;
    height: min(1.667dvw,24px);
    justify-content: space-between;
    align-items: center
}
.header_detail_me h6{
    width: fit-content;
    max-width: min(54.167dvw,780px);
    height: 100%;
    font-size: min(1.389dvw,20px);
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.header_detail_me >div{
    display: flex;
    width: fit-content;
    height: 100%;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}
.header_detail_me >div button{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.header_detail_me >div button svg{
    width: min(0.972dvw,14px);
    height: auto;
}
/* description */
.project_description_me{
    display: -webkit-box;
    width: min(54.167dvw,780px);
    height: fit-content;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: min(0.833dvw,12px);
    line-height: 136%;
    font-weight: 400;
    color:#757575;
    overflow: hidden;
}


/* like container */
.container_project_like{
    display: flex;
    width: 100%;
    height: min(1.111dvw,16px);
    /* border-top:1px solid #EEEEEE; */
    /* padding: 12px; */
    gap: min(0.556dvw,8px);
}
.container_project_like >div{
    display: flex;
    width: fit-content;
    min-width: min(5.833dvw,84px);
    max-width: min(6.944dvw,100px);
    height: 100%;
    align-items: center;
    justify-content: start;
    gap: min(0.278dvw,4px);
}
/* .container_project_like >div >div, */
.container_project_like >div div{
    display: flex;
    width: min(0.833dvw,12px);
    height: min(0.833dvw,12px);
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    /* cursor: pointer; */
    
}
.container_project_like >div h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: min(0.833dvw,12px);
    line-height: 136%;
    font-weight: 400;
    color: #757575;
    white-space: nowrap;
}

/* mobile */
@media (width<=432px){

    .wrapper_gallery_profile {
        gap:  12px;
        padding-bottom: 20px;
    }
    .container_user_info {
        height: 225px;
        
    }
    .big_image {
        height: 128px;
    }
    .wrapper_user {
        height: fit-content;
        padding: 0px 20px;
        position: absolute;
        flex-direction: column;
        gap: 20px;
    }
    .user {
        gap:  20px;
    }
    .user .user_img {
        width: 96px;
        height: 96px;
    }
    /* info */
    .user_info{
        gap: 0px;
    }
    .user_info >h5{
        height: 36px;
        font-size: 24px;
    }
    .user_info > div{
        display: none;
    }
    .wrapper_user .container_btn_mobile{
        display: flex;
        width: 100%;
        height: fit-content;
        overflow: auto;
        gap: 12px;
    }
    .container_btn_mobile button{
        display: flex;
        /* width: min(8.611dvw, 124px); */
        width: 100%;
        min-width: fit-content;
        height: 36px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid;
        border-color: #26AC34;
        color: #26AC34;
        background-color: #FFF;
        border-radius: 4px;
        padding: 8px 12px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        white-space: nowrap;
    }
    .container_btn_mobile .new_product_btn{
        white-space: nowrap;
        gap: 4px;
        color: #fff;
        background-color: #26AC34 ;
    }
    .container_btn_mobile .new_product_btn svg{
        width: 12px;
        height: auto;
    }
    .container_btn_mobile .new_product_btn span{
        font-size: 16px;
        font-weight: 500;
    }
    .follow_btn:hover{
        border-color: #26AC34;
        color: #fff;
        background-color: #26AC34;
    }

    .follow_btn:active{
        background-color: #58d264;
        border-color: #58d264;
    }
    /* people see */
    .container_gallery{
        width: 100%;
        gap: 12px;
        padding: 0px;

    }
    /* gallery list */
    .container_gallery .gallery_list{
        display: grid;
        width: 100%;
        height: fit-content;
        grid-template-columns: repeat(2,1fr);
        gap: 8px;
        padding: 0px 20px;
    }
    /* .gallery_list .wrapper_gallery_item{
    } */

    /* is me */
    .container_gallery_me{
        gap: 12px;
        padding: 20px ;
    }
    .gallery_list_me{
        gap: 12px;
    }
    .container_gallery_me .gallery_item{
        height:92px;
        border-radius: 8px;
        box-shadow: 0px 1px 2px 0px #0000000F;
    }
    /* img */
    .gallery_img_me{
        display: flex;
        width: 100px;
        height: 100%;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    /* detail */
    .gallery_item .wrapper_gallery_detail_me{
        width: 292px;
        padding: 8px;
        gap: 0px;
        /* align-items: ; */
        justify-content: space-between;
    }
    .wrapper_gallery_detail_me .container_detail_me{
        height: 100%;
        height: 100%;
        min-height: fit-content;
        gap: 4px;
    }
    .container_detail_me .header_detail_me{
        height:24px;
    }
    .header_detail_me h6{
        max-width: 200px;
        font-size: 14px;
    }
    .header_detail_me >div{
        gap: 4px;
    }
    .header_detail_me >div button{
        width: 16px;
        height: 16px;
    }
    .header_detail_me >div button svg{
        width: 11px;
        height: auto;
    }
    /* description */
    .project_description_me{
        display: -webkit-box;
        width: fit-content;
        max-width: 200px;
        height: fit-content;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 10px;
        overflow: hidden
    }
    .container_project_like{
        height: 12px;
        gap: 0px;
    }
    .container_project_like >div{
        min-width: 84px;
        max-width: 100%;
        gap: 4px;
    }
    .container_project_like >div div{
        display: none;
        /* width: 12px;
        height: 12px; */
    }
    .container_project_like >div h6{
        font-size: 8px;
    }

}
</style>