<script setup>
import {useRoute} from 'vue-router'
import {ref,onMounted, onBeforeMount} from 'vue'
import BaseProductType from '../components/productDetail/BaseProductType.vue'
import BaseStore from '../components/productDetail/BaseStore.vue'
import BaseMenu from '../components/BaseMenu.vue'
import BaseFooter from '../components/BaseFooter.vue'
import BaseDescription from '../components/productDetail/BaseDescription.vue'
import BaseReview from '../components/productDetail/BaseReview.vue'
import BaseRecommedation from '../components/productDetail/BaseRecommendation.vue'
import validation from '../JS/validation'
import BaseSelectPage from '../components/BaseSelectPage.vue'
import fetch from '../JS/api';
const {params} =useRoute()

// initial value for prop in component
let productType = ref({})
let store = ref({})
let description = ref("")

let reviews = ref([])
let ratingReview = ref(0)
let sortFilter = ref({sort:'newest',name: ""})
let currentPage = ref(1)
let allStyleReviews = ref([])

// selected styles
let selectedStyle = ref({})
// let initial = 0

const getProductReview=async(page)=>{
    let {status,data} = await fetch.getProductReview(params.id, page)
    console.log("this is ",data)
    totalPageReview.value=data.allPage
    reviews.value = data.list
    return data.list
}

const getStore =async(id)=>{
    let {status,data} = await fetch.getStore(id)
    store.value = data
    return data
}

const getProductDetail = async (id, selectedId=0) => {
    // console.log(id)
    let {status,data} = await fetch.getProductDetail(id)
    
    // product type page
    productType.value.itemId = params.id
    productType.value.name =  data.name
    productType.value.rating = data.totalRating
    productType.value.sold = data.sold
    productType.value.price_min = data.minPrice //price
    productType.value.price_max = data.maxPrice //price
    description.value = data.description //description
    productType.value.styles = data.styles //style
    productType.value.image = data.image //image
    selectedStyle.value = productType.value.styles[selectedId]
    
    //store
    await getStore(data.itemOwner)
    //product review
    await getProductReview(currentPageReview.value)
    allStyleReviews.value = data.styles.map(style => style.style)
    ratingReview.value = data.totalRating
    
    // product owner page
    // let responseStore = await fetch.getStore(responseProduct.data.itemOwner)
    // console.log(responseStore.data)
    // store.value = responseStore.data

    // product description page
    

    // product review page
    // let responseReview = await fetch.getProductReview(params.id, currentPage.value)
    // console.log(responseReview.data)
    // reviews.value = responseReview.data.list
    // ratingReview.value = responseProduct.data.totalRating
    // // ratingReviewF.value =Math.floor(responseProduct.data.totalRating)
    // allStyleReviews.value = responseProduct.data.styles.map(style => style.style)
    // // console.log(allStyleReviews)
}

const changeStyle = async (idx) => {
    selectedStyle.value = productType.value.styles[idx]
} 

const sortFilterReview = async (sort, name) => {
    console.log(sort)
    console.log(name)
    sortFilter.value = {sort: sort, name: name}
    // product review page
    
    // let {status, data} = await fetch.getProductReview(params.id, currentPage.value, sortFilter.value.sort, sortFilter.value.name)
    // console.log(data)
    reviews.value = await getProductReview(currentPageReview.value)
}


// review
const currentPageReview=ref(1)
const totalPageReview=ref(1)
const moveLeftR=async(current)=>{
    console.log(current)
    currentPageReview.value = current
    await getProductReview(currentPageReview.value)
}
const moveRightR=async(current)=>{
    console.log(current)
    currentPageReview.value = current
    await getProductReview(currentPageReview.value)
}
const changePageR=async (number)=>{
    currentPageReview.value = number
    await getProductReview(currentPageReview.value)
}

onBeforeMount(() => {
    getProductDetail(params.id)

})

onMounted(()=>{
    validation.navigationTo()
})
</script>
<template>
<!-- this is pro detail {{ params.id }} -->
    <BaseMenu class="menu" />
    <div class="wrapper_content">
        <BaseProductType :product-style="productType" :selected-style="selectedStyle" @selected-style="changeStyle"/>
        <BaseStore :owner="store"/>
        <BaseDescription :description="description"/>
        <div class="container_review">
            <BaseReview :product-review="reviews" :total-rating="ratingReview" 
            :sort-filter="sortFilter" :allStyle="allStyleReviews" @sort-filter-review="sortFilterReview" />
            <BaseSelectPage :current-page="currentPageReview" :total-page="totalPageReview"
             @move-left="moveLeftR" @move-right="moveRightR" @change-page="changePageR"/>
        </div>

        <BaseRecommedation/>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_content{
    display: flex;
    width: auto;
    height: fit-content;
    flex-direction: column;
    padding: 20px 160px;
    gap: 20px;
    background-color: #F5F5F5;
}
.container_review{
    display: flex;
    flex-direction: column;
    width: inherit;
    height: fit-content;
    gap: 12px;
    background-color: #fff;
    border-radius: min(0.556dvw, 8px);
    padding: min(1.389dvw, 20px);
}
</style>