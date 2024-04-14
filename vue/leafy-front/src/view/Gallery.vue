<script setup>
import {ref,onBeforeMount} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseGalleryCard from '../components/gallery/BaseGalleryCard.vue'
import BaseGallerySort from '../components/gallery/BaseGallerySort.vue'
import fetch from '../JS/api';
// link
const myRouter=useRouter()
const goGalleryDetail=(galleryId)=>myRouter.push({name:'GalleryDetail',params:{id:galleryId}})
// common attribute
const {params} = useRoute()
const galleryList=ref([])

// get gallery content
const getGallery=async()=>{
    let{status,data}= await fetch.getGallery()
    if(status){
        console.log(data)
        galleryList.value=data.list
    }
}
onBeforeMount(async()=>{
    await getGallery()
})
</script>
<template>
    <!-- this gallery {{params.search}} -->
    <BaseMenu />
    <!-- header title -->
    <div class="shop_title">
        <h3>
            Gallery
        </h3>
        <img src="../assets/shop_p/shop_title.jpg" alt="title_img" loading="lazy">
    </div>

    <!-- content -->
    <div class="wrapper_gallery">
        <div class="gallery">
            <BaseGallerySort name="gallery_list_sort" />
            <!-- gallery list -->
            <div class="gallery_list">
                <div v-if="galleryList!=undefined" v-for="(gallery,index) of galleryList" :key="index" class="wrapper_gallery_item">
                    <BaseGalleryCard @click="goGalleryDetail(gallery.contentId)" name="gallery_list" :projectImg="undefined" :projectName="gallery.name"
                    :createrImg="undefined" :createrName="gallery.contentOwner" :likeCount="gallery.like" :commentCount="0" :createAt="gallery.createdAt" />
                </div>
            </div>
        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.shop_title {
    display: flex;
    position: relative;
    width: auto;
    height: min(16.111dvw, 232px);
    /* height: fit-content; */
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* z-index: 1; */

}

.shop_title h3 {
    position: absolute;
    width: 100%;
    height: inherit;
    padding: min(5.556dvw, 80px) min(11.111dvw, 160px);
    font-size: min(3.333dvw, 48px);
    color: white;
    text-align: center;
    /* z-index: 3; */
}

.shop_title img {

    /* opacity: 10%; */
    width: 100%;
    height: auto;
    /* top: -750px; */
    /* z-index: -1; */
}
.wrapper_gallery{
    display: flex;
    width: 100%;
    height: fit-content;
    /* gap: 32px; */
    padding: 20px 160px;
    background-color: #F5F5F5;
    flex-direction: column;
}
.gallery{
    display: flex;
    width: 100%;
    height: fit-content;
    padding-bottom:20px ;
    gap: 40px;
    flex-direction: column;
}
/* gallery list */
.gallery_list{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    justify-content: center;
    gap: 32px;
}
.wrapper_gallery_item{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
</style>