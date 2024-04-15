<script setup>
import BaseMovePage from '../../../components/accountSetting/BaseMovePage.vue'
import BaseGallerySort from '../../../components/gallery/BaseGallerySort.vue';
import { useRouter } from 'vue-router';
import {onBeforeMount, ref,onMounted} from 'vue'
import fetch from '../../../JS/api';
import validation from '../../../JS/validation'
// link
let origin = `${import.meta.env.VITE_BASE_URL}`;
const myRouter=useRouter()
const goMyGalleryCreate=()=>myRouter.push({name:'MyGallery_AS_add',params:{method:'add-gallery'}})
const goMyGalleryUpdate=(galleryId)=>{
    console.log(galleryId)
    myRouter.push({name:'MyGallery_AS_add',params:{method:'edit-gallery',id:validation.encrypt("000"+galleryId)}})

}
// common attribute
const myGalleryList=ref([])

// filter
const itemFilter=ref(undefined)
// move page
const currentPage=ref(1)
const allPage=ref(0)
const allItem=ref(0)

// get gallery
const getMyGallery=async()=>{
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
    if(status){
        console.log(data)
        myGalleryList.value=data.list
        allItem.value=data.allItems
        allPage.value=data.allPage
    }
}

// delete gallery
const deleteGallery=async(galleryId)=>{
    let{status,msg}=await fetch.deleteGallery(galleryId)
    if(status){
        console.log('delete successful')
        await getMyGallery()
    }
}

// filter
const galleryFilter=async(filter)=>{
    itemFilter.value=filter
    console.log(filter)
    await getMyGallery()
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

onBeforeMount(async()=>{
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
            <div class="wrapper_content">
                <!-- header -->
                <div class="header_gallery">
                    <!-- img -->
                    <div class="gallery_img">
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
                        <div class="gallery_img">
                            <img v-if="gallery.image!=undefined" :src="`${origin}/api/image/gallery/${gallery.contentId}`" alt="gallery_img">
                            <img v-else src="../../../assets/home_p/home_design_content_tropical.png" alt="gallery_img">
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
                        <div class="gallery_operation">
                            <!-- edit -->
                            <button @click="goMyGalleryUpdate(gallery.contentId)">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.16732 3.16664H3.00065C2.55862 3.16664 2.1347 3.34223 1.82214 3.65479C1.50958 3.96736 1.33398 4.39128 1.33398 4.83331V14C1.33398 14.442 1.50958 14.8659 1.82214 15.1785C2.1347 15.491 2.55862 15.6666 3.00065 15.6666H12.1673C12.6093 15.6666 13.0333 15.491 13.3458 15.1785C13.6584 14.8659 13.834 14.442 13.834 14V9.83331M12.6557 1.98831C12.8094 1.82912 12.9933 1.70215 13.1966 1.6148C13.4 1.52746 13.6187 1.48148 13.84 1.47956C14.0613 1.47763 14.2807 1.5198 14.4856 1.6036C14.6904 1.6874 14.8765 1.81116 15.033 1.96765C15.1895 2.12414 15.3132 2.31022 15.397 2.51505C15.4808 2.71988 15.523 2.93934 15.5211 3.16064C15.5191 3.38194 15.4732 3.60064 15.3858 3.80398C15.2985 4.00732 15.1715 4.19123 15.0123 4.34497L7.85732 11.5H5.50065V9.14331L12.6557 1.98831Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <!-- delete -->
                            <button @click="deleteGallery(gallery.contentId)">
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.33398 8.16667V13.1667M9.66732 8.16667V13.1667M1.33398 4.83333H14.6673M13.834 4.83333L13.1115 14.9517C13.0816 15.3722 12.8934 15.7657 12.5849 16.053C12.2764 16.3403 11.8705 16.5 11.449 16.5H4.55232C4.13077 16.5 3.72487 16.3403 3.41639 16.053C3.1079 15.7657 2.91975 15.3722 2.88982 14.9517L2.16732 4.83333H13.834ZM10.5007 4.83333V2.33333C10.5007 2.11232 10.4129 1.90036 10.2566 1.74408C10.1003 1.5878 9.88833 1.5 9.66732 1.5H6.33398C6.11297 1.5 5.90101 1.5878 5.74473 1.74408C5.58845 1.90036 5.50065 2.11232 5.50065 2.33333V4.83333H10.5007Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BaseMovePage name="my_gallery" :current-page="currentPage" :total-amount-item="allItem" @next-page="nextPage" @previous-page="previousPage" />
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
    min-height: 70dvh;
    max-width: 100%;
    background-color: #fff;
    border: none;
    border-radius:8px ;
    box-shadow: 0px 1px 2px 0px #0000000F;
    gap: 24px;
    padding: 20px ;
    flex-direction: column;
}
.my_gallery{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
/* header */
.my_gallery .header_my_gallery{
    display: flex;
    width: 100%;
    height: 36px;
    justify-content: space-between;
    align-items: center;
}
.header_my_gallery h6{
    /* display: flex; */
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
}
.header_my_gallery >button{
    display: flex;
    width: fit-content;
    height: 100%;
    padding: 8px 12px 8px 8px;
    gap: 4px;
    background-color: #26AC34;
    border: none;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}
.header_my_gallery >button div{
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
}
.header_my_gallery >button div svg{
    width: 10px;
    height: auto;
}
.header_my_gallery >button h5{
    display: flex;
    width: 100%;
    height: fit-content;
    color: #fff;
    font-size: 14px;
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
    height: 28px;
    grid-template-columns: 4fr 6fr 3fr 3fr 2fr;
    border-bottom: 1px solid #E0E0E0;
}
.header_gallery >div{
    display: flex;
    width: 100%;
    height: 100%;
    
}
.header_gallery >div h5{
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 500;
    color: #757575;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* content */
.gallery_list{
    display: flex;
    width: 100%;
    height: 45dvh;
    overflow: auto;
    flex-direction: column;
}
.gallery_item{
    display: grid;
    grid-template-columns: 4fr 6fr 3fr 3fr 2fr;
    width: 100%;
    height: fit-content;
    padding: 12px 0px;
    border-bottom:1px solid #EEEEEE;    
}
.gallery_item >div{
    display: flex;
    width: 100%;
    height: 124px;
    justify-content: center;
    align-items: center;

}
/* img */
.wrapper_content .gallery_img{
    /* display: flex;
    width: 100%; */
    /* width: fit-content;
    min-width: 160px;
    max-width: 11.111dvw; */
    /* display: flex; */
    /* width: 160px; */
    /* max-width: 100%; */
    /* height: 100%; */
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 2px;
    /* background-color: black; */
}
.wrapper_content .gallery_img img{
    width: 100%;
    height: auto;
    border-radius: 4px;

}
/* name */
.wrapper_content .gallery_name{
    /* display: flex; */
    /* width: 100%;
    padding: 12px; */
    width: 100%;
    min-width: 420px;
    max-width: 29.167dvw;
    /* width: 100%; */
    gap: 4px;
    flex-direction: column;
}
/* .gallery_item .gallery_name{

} */
.gallery_item .gallery_name >div{
    width: 100%;
    height: 100px;
    max-width: 100%;
    padding: 6px 12px;

}
.wrapper_content .gallery_name h6{
    width: 100%;
    /* max-width: 100%; */
    height: fit-content;
    font-size: 14px;
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
    font-size:  12px;
    font-weight: 400;
    overflow: hidden;
    color: #616161;
}
/* style */
.wrapper_content .gallery_style{
    width: 100%;
    min-width: 116px;
    max-width: 8.056dvw;
}
.gallery_item .gallery_style h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    background: #EEEEEE;
    font-size: 14px;
    font-weight: 400;
    color:#212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* date */
.wrapper_content .gallery_date{
    min-width: 108px;
    max-width: 7.5dvw;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.gallery_item .gallery_date h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#6B7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
/* operation */
.wrapper_content .gallery_operation{
    width: 100%;
    min-width: 84px;
    max-width: 5.833dvw;
    gap: 8px;
}
.gallery_item .gallery_operation button{
    display: flex;
    width: 20px;
    height: 20px;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
}
</style>