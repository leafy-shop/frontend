<script setup>
import {useRoute,useRouter} from 'vue-router'
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {ref,onBeforeMount} from 'vue'
import fetch from '../JS/api';
// link
let origin = `${import.meta.env.VITE_BASE_URL}`;
const {params} = useRoute()
const myRouter =useRouter()
const goGalleryList=()=>myRouter.push({name:"Gallery"})
const goGalleryProfile=()=>myRouter.push({name:"GalleryProfile",params:{id:galleryDetail.value.userId}})
// common attribute
const galleryDetail=ref({})
const galleryContentId=ref('')
// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// get all data
const getGalleryDetail=async()=>{
    let{status,data}=await fetch.getGalleryById(galleryContentId.value)
    if(await status){
        console.log(data)
        galleryDetail.value = await data
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(async()=>{
    galleryContentId.value = params.id
   await getGalleryDetail()
})
</script>
<template>
    <!-- this is gallery detail : {{params.id}} -->
    <BaseMenu class="menu"/>
    <div class="container_access">
        <!-- home icon -->
        <svg @click="goHome" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.707 2.293C10.5195 2.10553 10.2652 2.00021 10 2.00021C9.73485 2.00021 9.48054 2.10553 9.29301 2.293L2.29301 9.293C2.11085 9.4816 2.01006 9.7342 2.01234 9.9964C2.01461 10.2586 2.11978 10.5094 2.30519 10.6948C2.4906 10.8802 2.74141 10.9854 3.00361 10.9877C3.26581 10.99 3.51841 10.8892 3.70701 10.707L4.00001 10.414V17C4.00001 17.2652 4.10537 17.5196 4.2929 17.7071C4.48044 17.8946 4.73479 18 5.00001 18H7.00001C7.26523 18 7.51958 17.8946 7.70712 17.7071C7.89465 17.5196 8.00001 17.2652 8.00001 17V15C8.00001 14.7348 8.10537 14.4804 8.2929 14.2929C8.48044 14.1054 8.73479 14 9.00001 14H11C11.2652 14 11.5196 14.1054 11.7071 14.2929C11.8947 14.4804 12 14.7348 12 15V17C12 17.2652 12.1054 17.5196 12.2929 17.7071C12.4804 17.8946 12.7348 18 13 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8947 17.5196 16 17.2652 16 17V10.414L16.293 10.707C16.4816 10.8892 16.7342 10.99 16.9964 10.9877C17.2586 10.9854 17.5094 10.8802 17.6948 10.6948C17.8802 10.5094 17.9854 10.2586 17.9877 9.9964C17.99 9.7342 17.8892 9.4816 17.707 9.293L10.707 2.293Z" fill="#757575"/>
        </svg>
        <!-- right arrow -->
        <svg class="right_arrow" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.292999 0L22.293 22L0.292999 44H1.707L23.707 22L1.707 0H0.292999Z" fill="#EEEEEE"/>
        </svg>
        <!-- product -->
        <h5 @click="goGalleryList" class="link">
            Gallery
        </h5>
        <!-- right arrow -->
        <svg class="right_arrow" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.292999 0L22.293 22L0.292999 44H1.707L23.707 22L1.707 0H0.292999Z" fill="#EEEEEE"/>
        </svg>
        <!-- product -->
        <h5 class="link">
            Gallery Detail
        </h5>
    </div>
    <!-- content -->
    <div class="wrapper_gallery_detail">
        <div class="gallery_detail">
            <!-- header -->
            <div class="header_gallery_detail">
                <h4>
                    {{galleryDetail.name}}
                </h4>
                <hr/>
                <h6>
                    {{galleryDetail.createdAt}}
                </h6>
            </div>
            
            <!-- detail -->
            <div class="project_detail">
                <!-- creater -->
                <div @click="goGalleryProfile" class="container_creater">
                    <!-- img -->
                    <div class="creater_img">
                        <img v-if="galleryDetail.icon!=undefined" :src="`${origin}/api/image/users/${galleryDetail.userId}`" alt="creater_img" draggable="false">
                        <img v-else src="../assets/icon/unknow_user_icon.png" alt="creater_img" draggable="false" >
                    </div>
                    <!-- name -->
                    <div class="creater_name">
                        <h6 >
                            {{galleryDetail.contentOwner}}
                        </h6>
                    </div>
                </div>
                <!-- project -->
                <div class="container_project">
                    <!-- img -->
                    <div class="project_img">
                        <img v-if="galleryDetail.image!=undefined" :src="`${origin}/api/image/gallery/${galleryDetail.contentId}`" alt="gallery_detail_img" draggable="false">
                    </div>
                    <!-- project detail -->
                    <div class="project_description">
                        <p>
                            {{ galleryDetail.description }}
                        </p>
                    </div>
                </div>
                <!-- project detail -->
                <!-- <div class="container_project_detail">
                    img
                    <div class="project_img">
                        <img v-if="galleryDetail.image!=undefined" :src="`${origin}/api/image/gallery/${galleryDetail.contentId}`" alt="gallery_detail_img">
                    </div>
                    description
                    <p class="project_description">
                        {{ galleryDetail.description }}
                    </p>
                </div> -->
            </div>
        </div>
        <BaseAlert name="gallery_detail_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.container_access{
    display: flex;
    width: auto;
    height: min(3.056dvw,44px);
    background-color: #FFFFFF;
    border-bottom: min(0.069dvw,1px) solid;
    border-color: #EEEEEE;
    padding: 0px min(11.111dvw, 160px);
    align-items: center;
    gap: min(1.111dvw, 16px);
}
.container_access svg:nth-child(1){
    width: min(1.667dvw, 24px);
    height: min(1.667dvw, 24px);
    cursor: pointer;
}
.container_access svg:nth-child(1):hover path{
    fill:#26AC34;
}

.right_arrow{
    display: flex;
    width: min(1.667dvw, 24px);
    height: min(3.056dvw, 44px);
}
.link{
    font-size: min(0.972dvw,14px);
    font-weight: 500;
    color:#757575;
    cursor: pointer;
}
.link:hover{
    color: #26AC34;
}
.wrapper_gallery_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    min-height: 90dvh;
    /* gap: 20px; */
    background-color: #fff;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    padding:60px 0px; 
}
.wrapper_gallery_detail .gallery_detail{
    display: flex;
    width: 800px;
    height: fit-content;
    flex-direction: column;
    border: none;
    gap: 40px;
}
/* header */
.gallery_detail .header_gallery_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #E0E0E0;
    gap: 12px;
    padding-bottom: 40px;

}
.header_gallery_detail h4{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 32px;
    font-weight: 500;
    color: #212121;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}
.header_gallery_detail hr{
    width: 48px;
    height: 1px;
    background-color: #757575;
}
.header_gallery_detail h6{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #9E9E9E;
}
/* content */
.project_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 12px;
}
/* creater */
.project_detail .container_creater{
    display: flex;
    width: 100%;
    height: 48px;
    gap: 20px;
    cursor: pointer;
}
/* img */
.container_creater .creater_img{
    display: flex;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.container_creater .creater_img img{
    width: 100%;
    height: auto;
}
/* creater name */
.container_creater .creater_name{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: 100%;
    align-items: center;
}
.container_creater .creater_name h6{
    width:100%;
    height: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #212121;
    text-transform: capitalize
}
/* project detail */
.container_project{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 20px;
    justify-content: start;
    align-items: center;
}
/* img */
.container_project .project_img{
    display: flex;
    width: 100%;
    height: fit-content;
    max-height: 100%;
    overflow: hidden;
    border: none;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
}
.container_project .project_img img{
    width: 100%;
    height: auto;
}
/* detail */
.project_description{
    display: flex;
    width:100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
}
.project_description p{
    display: flex;
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#212121;
}
</style>