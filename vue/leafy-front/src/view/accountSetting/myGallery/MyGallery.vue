<script setup>
import BaseMovePage from '../../../components/accountSetting/BaseMovePage.vue'
import BaseGallerySort from '../../../components/gallery/BaseGallerySort.vue';
import { useRouter } from 'vue-router';
import {onBeforeMount, ref,onMounted} from 'vue'
import fetch from '../../../JS/api';
import validation from '../../../JS/validation'
import BaseAlert from '../../../components/BaseAlert.vue';
import BaseEmptyList from '../../../components/BaseEmptyList.vue';
import BaseConfirm from '../../../components/BaseConfirm.vue';
// link
let origin = `${import.meta.env.VITE_BASE_URL}`;
const myRouter=useRouter()
const goMyGalleryCreate=()=>myRouter.push({name:'MyGallery_AS_add',params:{method:'add-gallery'}})
const goMyGalleryUpdate=(galleryId)=>{
    console.log(galleryId)
    myRouter.push({name:'MyGallery_AS_add',params:{method:'edit-gallery',id:validation.encrypt(`000${galleryId}`)}})

}
// common attribute
const myGalleryList=ref([])
const myGalleryId=ref('')
// filter
const itemFilter=ref(undefined)
// move page
const currentPage=ref(1)
const allPage=ref(0)
const allItem=ref(0)
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
const getMyGallery=async()=>{
    getDataStatus.value=undefined
    let inputData={
        page:currentPage.value,
        limit:10
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
    let {status,data} =await fetch.getGalleryByOwner(inputData)

    if(await status){
        console.log(await data)
        myGalleryList.value=await data.list
        allItem.value=await data.allItems
        allPage.value=await data.allPage
        if(await data.list.length==0){
            getDataStatus.value=false
        }else{
            getDataStatus.value=true
        }
    }else{
        console.log(await status,'status from get gallery')

        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
        getDataStatus.value=false
    }
}

// delete gallery
const deleteGallery=async(galleryId)=>{
    let{status,msg}=await fetch.deleteGallery(galleryId)
    if(await status){
        console.log('delete successful')
        await getMyGallery()
        isDelete.value=false
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
        isDelete.value=false
    }
}

// filter
const galleryFilter=async(filter)=>{
    itemFilter.value=filter
    console.log(filter)
    // if(filter.sort_name!= 'all'){
        await getMyGallery()
    // }

}


// move page
const nextPage=()=>{
    // check if to next page and not out of all page
    currentPage.value=(currentPage.value+1)>allPage.value?currentPage.value:currentPage.value+1
    // document.getElementById("header_order").scrollIntoView({ behavior: "smooth" }) //go to top first
    getMyGallery()
}
const previousPage=()=>{
    currentPage.value=(currentPage.value-1)<=0?currentPage.value:currentPage.value-1
    // document.getElementById("header_order").scrollIntoView({ behavior: "smooth" }) //go to top first
    getMyGallery()
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
    myGalleryId.value = id
}
const confirmBank = async (input = false) => {
    if (!input) isDelete.value = false;
    else {

        // delete api
        // console.log("delete function")
        if (myGalleryId.value.length != 0) {
            await deleteGallery(myGalleryId.value);
            // console.log(addressId.value)
        }
        else {
            isDelete.value = false
            console.log("close overlay")

        }
    }
}

onBeforeMount(async()=>{
    validation.navigationTo()
    await getMyGallery()
})
</script>
<template>
    <div class="wrapper_my_gallery">
        <div class="my_gallery">
            <!-- header -->
            <div class="header_my_gallery">
                <h6>
                    My Gallery
                </h6>
                <button @click="goMyGalleryCreate">
                    <div>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="white"/>
                        </svg>
                    </div>
                    <h5>
                        New Project
                    </h5>
                </button>
            </div>
            <!-- sort -->
            <BaseGallerySort name="my_gallery_sort" :is-setting="true" @get-style-filter="galleryFilter" />
            <!-- <div class="sort_list">
                <button class="sort_item">
                    <h6>
                        All Project
                    </h6>
                </button>
                <button class="sort_item">
                    <h6>
                        Popular
                    </h6>
                </button>
                <button class="sort_item">
                    <h6>
                        Latest
                    </h6>
                </button>
                <button class="sort_item">
                    <h6>
                        Style
                    </h6>
                    <div>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292433 0.304675C0.479735 0.117581 0.733736 0.0124767 0.998581 0.0124767C1.26342 0.0124767 1.51743 0.117581 1.70473 0.304675L4.99376 3.59106L8.28278 0.304675C8.37492 0.209357 8.48513 0.133328 8.60699 0.0810238C8.72885 0.0287201 8.85991 0.00118918 8.99253 3.76812e-05C9.12515 -0.00111382 9.25667 0.0241369 9.37941 0.0743168C9.50216 0.124497 9.61368 0.198601 9.70746 0.292305C9.80124 0.386009 9.8754 0.497437 9.92562 0.620086C9.97584 0.742736 10.0011 0.874151 9.99996 1.00666C9.99881 1.13918 9.97126 1.27013 9.91891 1.39189C9.86656 1.51365 9.79047 1.62377 9.69508 1.71583L5.6999 5.7078C5.5126 5.8949 5.2586 6 4.99376 6C4.72891 6 4.47491 5.8949 4.28761 5.7078L0.292433 1.71583C0.105189 1.52868 0 1.27489 0 1.01026C0 0.745624 0.105189 0.491826 0.292433 0.304675Z" fill="#212121"/>
                        </svg>
                    </div>
                </button>
            </div> -->
            <!-- content table -->
            <BaseEmptyList name="my_gallery_list" title="You don’t have content yet." :showEmpty="getDataStatus" />
            <div v-if="getDataStatus==true" class="wrapper_content">
                <!-- header -->
                <div class="header_gallery">
                    <!-- img -->
                    <div class="gallery_img img_detail">
                        <h5>
                            #
                        </h5>
                    </div>
                    <!-- name -->
                    <div class="gallery_name">
                        <h5>
                            Name
                        </h5>
                    </div>
                    <!-- style -->
                    <div class="gallery_style">
                        <h5>
                            Style
                        </h5>
                    </div>
                    <!-- date -->
                    <div class="gallery_date">
                        <h5>
                            Date
                        </h5>
                    </div>
                    <!-- operation -->
                    <div class="gallery_operation">
                        <h5>
                            Operation
                        </h5>
                    </div>
                </div>
                <div class="gallery_list">
                    <!-- gallery item -->
                    <div v-for="(gallery,index) of myGalleryList" :key="index" class="gallery_item">
                        <!-- img -->
                        <div class="gallery_img img_detail">
                            <img v-if="gallery.image!=undefined" :src="`${origin}/api/image/gallery/${gallery.contentId}`" alt="gallery_img" draggable="false" loading="lazy">
                            <img v-else src="../../../assets/default_image.png" alt="gallery_img" draggable="false" >
                        </div>
                        <!-- name -->
                        <div class="gallery_name">
                            <div>
                                <h6>
                                    {{ gallery.name }}
                                </h6>
                                <p>
                                    {{ gallery.description }}
                                </p>
                            </div>
                        </div>
                        <!-- style -->
                        <div class="gallery_style">
                            <h6>
                                {{gallery.style}}
                            </h6>
                        </div>
                        <!-- date -->
                        <div class="gallery_date">
                            <h6>
                                {{gallery.updatedAt}}
                            </h6>
                        </div>
                        <!-- date -->
                        <div class="gallery_operation operation_detail">
                            <!-- edit -->
                            <button @click="goMyGalleryUpdate(gallery.contentId)">
                                <!-- <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.16732 3.16664H3.00065C2.55862 3.16664 2.1347 3.34223 1.82214 3.65479C1.50958 3.96736 1.33398 4.39128 1.33398 4.83331V14C1.33398 14.442 1.50958 14.8659 1.82214 15.1785C2.1347 15.491 2.55862 15.6666 3.00065 15.6666H12.1673C12.6093 15.6666 13.0333 15.491 13.3458 15.1785C13.6584 14.8659 13.834 14.442 13.834 14V9.83331M12.6557 1.98831C12.8094 1.82912 12.9933 1.70215 13.1966 1.6148C13.4 1.52746 13.6187 1.48148 13.84 1.47956C14.0613 1.47763 14.2807 1.5198 14.4856 1.6036C14.6904 1.6874 14.8765 1.81116 15.033 1.96765C15.1895 2.12414 15.3132 2.31022 15.397 2.51505C15.4808 2.71988 15.523 2.93934 15.5211 3.16064C15.5191 3.38194 15.4732 3.60064 15.3858 3.80398C15.2985 4.00732 15.1715 4.19123 15.0123 4.34497L7.85732 11.5H5.50065V9.14331L12.6557 1.98831Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg> -->
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.16634 4.16664H4.99967C4.55765 4.16664 4.13372 4.34223 3.82116 4.65479C3.5086 4.96736 3.33301 5.39128 3.33301 5.83331V15C3.33301 15.442 3.5086 15.8659 3.82116 16.1785C4.13372 16.491 4.55765 16.6666 4.99967 16.6666H14.1663C14.6084 16.6666 15.0323 16.491 15.3449 16.1785C15.6574 15.8659 15.833 15.442 15.833 15V10.8333M14.6547 2.98831C14.8084 2.82912 14.9923 2.70215 15.1957 2.6148C15.399 2.52746 15.6177 2.48148 15.839 2.47956C16.0603 2.47763 16.2798 2.5198 16.4846 2.6036C16.6894 2.6874 16.8755 2.81116 17.032 2.96765C17.1885 3.12414 17.3122 3.31022 17.396 3.51505C17.4798 3.71988 17.522 3.93934 17.5201 4.16064C17.5182 4.38194 17.4722 4.60064 17.3848 4.80398C17.2975 5.00732 17.1705 5.19123 17.0113 5.34497L9.85634 12.5H7.49967V10.1433L14.6547 2.98831Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <!-- delete -->
                            <button @click="showConfirm(gallery.contentId)">
                                <!-- <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.33398 8.16667V13.1667M9.66732 8.16667V13.1667M1.33398 4.83333H14.6673M13.834 4.83333L13.1115 14.9517C13.0816 15.3722 12.8934 15.7657 12.5849 16.053C12.2764 16.3403 11.8705 16.5 11.449 16.5H4.55232C4.13077 16.5 3.72487 16.3403 3.41639 16.053C3.1079 15.7657 2.91975 15.3722 2.88982 14.9517L2.16732 4.83333H13.834ZM10.5007 4.83333V2.33333C10.5007 2.11232 10.4129 1.90036 10.2566 1.74408C10.1003 1.5878 9.88833 1.5 9.66732 1.5H6.33398C6.11297 1.5 5.90101 1.5878 5.74473 1.74408C5.58845 1.90036 5.50065 2.11232 5.50065 2.33333V4.83333H10.5007Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg> -->
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.33301 9.16667V14.1667M11.6663 9.16667V14.1667M3.33301 5.83333H16.6663M15.833 5.83333L15.1105 15.9517C15.0806 16.3722 14.8924 16.7657 14.5839 17.053C14.2755 17.3403 13.8696 17.5 13.448 17.5H6.55134C6.12979 17.5 5.7239 17.3403 5.41541 17.053C5.10693 16.7657 4.91877 16.3722 4.88884 15.9517L4.16634 5.83333H15.833ZM12.4997 5.83333V3.33333C12.4997 3.11232 12.4119 2.90036 12.2556 2.74408C12.0993 2.5878 11.8874 2.5 11.6663 2.5H8.33301C8.11199 2.5 7.90003 2.5878 7.74375 2.74408C7.58747 2.90036 7.49967 3.11232 7.49967 3.33333V5.83333H12.4997Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BaseConfirm name="my_gallery_list" header-confirm="Do you want to delete the current content?" submit-title="Delete" :show-confirm="isDelete"  @cancel="confirmBank()" @submit="confirmBank(true)"  />
        <BaseMovePage v-if="getDataStatus==true" name="my_gallery" :current-page="currentPage" :total-amount-item="allItem" @next-page="nextPage" @previous-page="previousPage" />
        <BaseAlert name="my_gallery_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>

    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_my_gallery{
    display: flex;
    width: 100%;
    height: fit-content;
    /* min-height: 70dvh; */
    max-width: 100%;
    background-color: #fff;
    border: none;
    border-radius:min(0.556dvw,8px) ;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000F;
    gap: min(1.667dvw,24px);
    padding: min(1.389dvw,20px) ;
    flex-direction: column;
}
.my_gallery{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}
/* header */
.my_gallery .header_my_gallery{
    display: flex;
    width: 100%;
    height: min(2.5dvw,36px);
    justify-content: space-between;
    align-items: center;
}
.header_my_gallery h6{
    /* display: flex; */
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
}
.header_my_gallery >button{
    display: flex;
    width: fit-content;
    height: 100%;
    padding: min(0.556dvw,8px) min(0.833dvw,12px) min(0.556dvw,8px) min(0.556dvw,8px);
    gap: min(0.278dvw,4px);
    background-color: #26AC34;
    border: none;
    border-radius: min(0.278dvw,4px);
    justify-content: center;
    align-items: center;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
}
.header_my_gallery >button div{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    justify-content: center;
    align-items: center;
}
.header_my_gallery >button div svg{
    width: min(0.694dvw,10px);
    height: auto;
}
.header_my_gallery >button h5{
    display: flex;
    width: 100%;
    height: fit-content;
    color: #fff;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
}
/* content */
.wrapper_content{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    
}
/* header */
.wrapper_content .header_gallery{
    display: grid;
    width: 100%;
    height: min(1.944dvw,28px);
    grid-template-columns: 3fr 8fr 2fr 3fr 1fr;
    border-bottom: min(0.069dvw,1px) solid #E0E0E0;
}
.header_gallery >div{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0px min(0.833dvw,12px) min(0.833dvw,12px) min(0.833dvw,12px);
}
.header_gallery >div h5{
    width: 100%;
    height: 100%;
    font-size: min(0.833dvw,12px);
    font-weight: 500;
    color: #757575;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* content */
.gallery_list{
    display: flex;
    width: 100%;
    /* height: 45dvh; */
    height: fit-content;
    overflow: auto;
    flex-direction: column;
    animation: show_element ease-in 0.7s;
}
.gallery_item{
    display: grid;
    grid-template-columns: 3fr 8fr 2fr 3fr 1fr;
    width: 100%;
    height: fit-content;
    padding: min(0.833dvw,12px) 0px;
    border-bottom:min(0.069dvw,1px) solid #EEEEEE;    
}
.gallery_item >div{
    display: flex;
    width: 100%;
    /* max-width: min(13.889dvw,200px); */
    /* height: min(8.611dvw,124px); */
    height: 8.611dvw;
    justify-content: left;
    align-items: center;
    padding: min(0.833dvw,12px);
}
/* img */
.wrapper_content .gallery_img{
    width: 100%;
    height: min(6.944dvw,100px);
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.wrapper_content .gallery_img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: min(0.278dvw,4px);
}
.wrapper_content .img_detail {
    padding: 0px !important;
}
/* name */
.wrapper_content .gallery_name{
    /* display: flex; */
    /* width: 100%;
    padding: 12px; */
    width: 100%;
    /* min-width: min(29.167dvw,420px);
    max-width: 29.167dvw; */
    /* width: 100%; */
    height: min(6.944dvw,100px);
    gap: min(0.278dvw,4px);
    flex-direction: column;
}
/* .wrapper_content .gallery_name h5 {
    height: fit-content;
} */
/* .gallery_item .gallery_name{

} */
.gallery_item .gallery_name >div{
    width: 100%;
    /* height: min(6.944dvw,100px); */
    /* max-width: 100%; */
    height: 100%;
    /* padding: min(0.417dvw,6px) min(0.833dvw,12px); */

}
.wrapper_content .gallery_name h6{
    width: 100%;
    /* max-width: 100%; */
    height: fit-content;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
    color:#212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.wrapper_content .gallery_name p{
    display: -webkit-box;
    width: 100%;
    /* max-width: 100%; */
    height: fit-content;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size:  min(0.833dvw,12px);
    font-weight: 400;
    overflow: hidden;
    color: #616161;
}
/* style */
.wrapper_content .gallery_style{
    width: 100%;
    min-width: min(8.056dvw,116px);
    max-width: 8.056dvw;
    height: min(6.944dvw,100px);
}
.gallery_item .gallery_style h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    padding: min(0.278dvw,4px) min(0.556dvw,8px);
    border: none;
    border-radius: min(0.278dvw,4px);
    background: #EEEEEE;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color:#212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* date */
.wrapper_content .gallery_date{
    /* min-width: min(7.5dvw,108px);
    max-width: 7.5dvw; */
    width: fit-content;
    height: min(6.944dvw,100px);
    justify-content: start;
    align-items: center;
}
.gallery_item .gallery_date h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color:#6B7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
/* operation */
.wrapper_content .gallery_operation{
    /* width: 100%;
    min-width: 84px;
    max-width: 5.833dvw; */
    width: fit-content;
    height: min(6.944dvw,100px);
    gap: min(0.556dvw,8px);
}
.gallery_item .gallery_operation button{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    border: none;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
}
</style>