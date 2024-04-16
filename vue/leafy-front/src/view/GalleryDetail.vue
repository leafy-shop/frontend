<script setup>
import {useRoute,useRouter} from 'vue-router'
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
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

// get all data
const getGalleryDetail=async()=>{
    let{status,data}=await fetch.getGalleryById(galleryContentId.value)
    if(await status){
        console.log(data)
        galleryDetail.value = await data
    }
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
            </div>
            <!-- detail -->
            <div class="container_gallery_project">
                <!-- creater detail -->
                <div class="container_creater_detail">
                    <!-- creater name -->
                    <div @click="goGalleryProfile" class="creater_name">
                        <!-- img -->
                        <div >
                            <img v-if="galleryDetail.icon!=undefined" :src="`${origin}/api/image/users/${galleryDetail.userId}`" alt="creater_img">
                            <img v-else src="../assets/vue.svg" alt="creater_img">
                        </div>
                        <!-- creater name -->
                        <h6>
                            {{galleryDetail.contentOwner}}
                        </h6>
                        
                    </div>
                    <!-- like project -->
                    <div class="container_project_like">
                        <!-- like -->
                        <div>
                            <button>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.92501 0.250568C7.24051 0.250568 7.55551 0.295068 7.85501 0.395568C9.70051 0.995568 10.3655 3.02057 9.81001 4.79057C9.49501 5.69507 8.98001 6.52057 8.30551 7.19507C7.34001 8.13007 6.28051 8.96007 5.14001 9.67507L5.01501 9.75057L4.88501 9.67007C3.74051 8.96007 2.67501 8.13007 1.70051 7.19007C1.03051 6.51557 0.515008 5.69507 0.195008 4.79057C-0.369992 3.02057 0.295008 0.995568 2.16051 0.385068C2.30551 0.335068 2.45501 0.300068 2.60501 0.280568H2.66501C2.80551 0.260068 2.94501 0.250568 3.08501 0.250568H3.14001C3.45501 0.260068 3.76001 0.315068 4.05551 0.415568H4.08501C4.10501 0.425068 4.12001 0.435568 4.13001 0.445068C4.24051 0.480568 4.34501 0.520568 4.44501 0.575568L4.63501 0.660568C4.68092 0.685054 4.73245 0.722468 4.77699 0.754803C4.80521 0.77529 4.83062 0.793739 4.85001 0.805568C4.85817 0.810382 4.86646 0.815222 4.87482 0.820102C4.91769 0.845129 4.96235 0.871198 5.00001 0.900068C5.55551 0.475568 6.23001 0.245568 6.92501 0.250568ZM8.25501 3.85057C8.46001 3.84507 8.63501 3.68057 8.65001 3.47007V3.41057C8.66501 2.71007 8.24051 2.07557 7.59501 1.83057C7.39001 1.76007 7.16501 1.87057 7.09001 2.08057C7.02001 2.29057 7.13001 2.52057 7.34001 2.59507C7.66051 2.71507 7.87501 3.03057 7.87501 3.38007V3.39557C7.86551 3.51007 7.90001 3.62057 7.97001 3.70557C8.04001 3.79057 8.14501 3.84007 8.25501 3.85057Z" fill="#BDBDBD"/>
                                </svg>
                            </button>
                            <h6>
                                {{galleryDetail.like}}
                            </h6>
                        </div>
                        <!-- comment -->
                        <div>
                            <button>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.00751C0 2.37356 2.105 0 5.01 0C7.85 0 10 2.32849 10 4.99249C10 8.08212 7.48 10 5 10C4.18 10 3.27 9.77967 2.54 9.34902C2.285 9.19379 2.07 9.07862 1.795 9.16875L0.785 9.4692C0.53 9.54932 0.3 9.34902 0.375 9.07862L0.71 7.95694C0.765 7.8017 0.755 7.63645 0.675 7.50626C0.245 6.71507 0 5.84877 0 5.00751ZM4.35 5.00751C4.35 5.36304 4.635 5.64847 4.99 5.65348C5.345 5.65348 5.63 5.36304 5.63 5.01252C5.63 4.65699 5.345 4.37156 4.99 4.37156C4.64 4.36655 4.35 4.65699 4.35 5.00751ZM6.655 5.01252C6.655 5.36304 6.94 5.65348 7.295 5.65348C7.65 5.65348 7.935 5.36304 7.935 5.01252C7.935 4.65699 7.65 4.37156 7.295 4.37156C6.94 4.37156 6.655 4.65699 6.655 5.01252ZM2.685 5.65348C2.335 5.65348 2.045 5.36304 2.045 5.01252C2.045 4.65699 2.33 4.37156 2.685 4.37156C3.04 4.37156 3.325 4.65699 3.325 5.01252C3.325 5.36304 3.04 5.64847 2.685 5.65348Z" fill="#BDBDBD"/>
                                </svg>
                            </button>
                            <h6>
                                {{galleryDetail.components}}
                            </h6>
                        </div>
                        <!-- create at -->
                        <div>   
                            <div>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C2.24 10 0 7.765 0 5C0 2.24 2.24 0 5 0C7.765 0 10 2.24 10 5C10 7.765 7.765 10 5 10ZM6.595 6.855C6.655 6.89 6.72 6.91 6.79 6.91C6.915 6.91 7.04 6.845 7.11 6.725C7.215 6.55 7.16 6.32 6.98 6.21L5.2 5.15V2.84C5.2 2.63 5.03 2.465 4.825 2.465C4.62 2.465 4.45 2.63 4.45 2.84V5.365C4.45 5.495 4.52 5.615 4.635 5.685L6.595 6.855Z" fill="#BDBDBD"/>
                                </svg>
                            </div>
                            <h6>
                                {{galleryDetail.createdAt}}
                            </h6>
                        </div>
                    </div>
                </div>
                <!-- project detail -->
                <div class="container_project_detail">
                    <!-- img -->
                    <div class="project_img">
                        <img v-if="galleryDetail.image!=undefined" :src="`${origin}/api/image/gallery/${galleryDetail.contentId}`" alt="gallery_detail_img">
                    </div>
                    <!-- description -->
                    <p class="project_description">
                        {{ galleryDetail.description }}
                    </p>
                </div>
            </div>
            <!-- img list -->
            <!-- <div class="gallery_img_list">
                img
                <div class="gallery_img_item">
                    <img src="../assets/home_p/home_design_content_japanese.png" alt="gallery_img_item">
                </div>
            </div> -->
            <!-- comment -->
            <div class="gallery_comment">
                <h6>
                    Comments
                </h6>
                <input type="text">
            </div>
        </div>
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
    padding: 20px 160px;
    gap: 20px;
    background-color: #F5F5F5;
}
.wrapper_gallery_detail .gallery_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    border: none;
    border-radius: 8px;
    padding: 20px;
    gap: 20px;
    background-color: #fff;
}
/* header */
.gallery_detail .header_gallery_detail{
    display: flex;
    width: 100%;
    height: 48px;
    justify-content: center;
    align-items: center;
}
.header_gallery_detail h4{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 32px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* content */
.container_gallery_project{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}
/* creater detail and project */
.container_creater_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 12px;
    flex-direction: column;
}
.container_creater_detail .creater_name{
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}
.creater_name >div{
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
}
.creater_name >div img{
    width: 100%;
    height: auto;
}
.creater_name h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color:#757575;
}
.container_creater_detail .container_project_like{
    display: flex;
    width: 100%;
    height:40px;
    border-top:1px solid #EEEEEE;
    padding: 12px;
    gap: 8px;
}
.container_project_like >div{
    display: flex;
    width: fit-content;
    height: 100%;
    align-items: center;
    justify-content: start;
    gap: 4px;
}
.container_project_like >div button,
.container_project_like >div div
{
    display: flex;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    
}
.container_project_like >div h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 400;
    color: #757575;
}

/* project detail */
.container_project_detail{
    /* display: flex; */
    width: 100%;
    height: fit-content;
    /* flex-direction: column; */
}
/* img */
.container_project_detail .project_img{
    display: flex;
    width: 560px;
    height: fit-content;
    justify-content: center;
    align-items: center;
    padding: 12px;
    float: left;
    overflow: hidden;
    border: none;
    
}
.project_img img{
    width: 100%;
    height: auto;
    border-radius: 4px;
}
/* description */
.container_project_detail .project_description{
    /* display: flex; */
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}
/* img list */
.gallery_img_list{
    display: grid;
    width: 100%;
    height: fit-content;
    grid-template-columns: repeat(5,1fr);
    gap: 8px;
}
.gallery_img_list .gallery_img_item{
    display: flex;
    width: 100%;
    height: 140px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 4px;
}
.gallery_img_item img{
    width:100%;
    height: auto;
    
    
}
/* comment */
.gallery_comment{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}
.gallery_comment h6{
    display: flex;
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
}
.gallery_comment input{
    display: flex;
    width: 100%;
    height: 36px;
    padding: 8px 12px;
    border: 1px solid #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000D;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}
</style>