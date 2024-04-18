<script setup>
import {useRoute} from 'vue-router'
import {ref,onMounted, onBeforeMount} from 'vue'
import { useCartStore } from '../store/store';
import { storeToRefs } from 'pinia'
import BaseProductType from '../components/productDetail/BaseProductType.vue'
import BaseStore from '../components/productDetail/BaseStore.vue'
import BaseMenu from '../components/BaseMenu.vue'
import BaseFooter from '../components/BaseFooter.vue'
import BaseDescription from '../components/productDetail/BaseDescription.vue'
import BaseReview from '../components/productDetail/BaseReview.vue'
import BaseRecommedation from '../components/productDetail/BaseRecommendation.vue'
import validation from '../JS/validation'
import BaseSelectPage from '../components/BaseSelectPage.vue'
import BaseAlert from '../components/BaseAlert.vue';
import fetch from '../JS/api';
import {useRouter} from 'vue-router'
const {params} =useRoute()
const productId = validation.decrypt(params.id)
const myRouter = useRouter()
const goShop =()=>myRouter.push({name:"Shop"})
const goHome =()=>myRouter.push({name:"Home"})

// attribute alert
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// initial value for prop in component
let productType = ref({})
let store = ref({})
let description = ref(``)

let reviews = ref([])
let ratingReview = ref(0)
let sortFilter = ref({sort:'newest',name: ""})
let currentPage = ref(1)
let allStyleReviews = ref([])

const itemOwner=ref('')

// selected styles
let selectedStyle = ref({})
// let initial = 0

const getProductReview=async(page, sortFilter)=>{
    let {status,data} = await fetch.getProductReview(productId, page, sortFilter.sort, sortFilter.name)
    // console.log("this is ",data)
    totalPageReview.value=data.allPage
    reviews.value = data.list
    return data.list
}

const getStore =async()=>{
    let {status,data} = await fetch.getStore(itemOwner.value)
    store.value = data
    return data
}

const getProductDetail = async (id, selectedId=0) => {
    // console.log(id)
    let {status,data} = await fetch.getProductDetail(id)
    // console.log(data.name)
    if(status){
        // product type page
        productType.value.itemId = productId
        productType.value.name = data.name
        productType.value.rating = data.totalRating
        productType.value.sold = data.sold
        productType.value.price_min = data.minPrice //price
        productType.value.price_max = data.maxPrice //price
        description.value = data.description //description
        productType.value.styles = data.styles //style
        productType.value.image = data.image //image
        itemOwner.value=data.itemOwner// item owner
        selectedStyle.value = productType.value.styles[selectedId]
        
        //store
        await getStore()
        // console.log(data.itemOwner,'item owner')
        //product review
        await getProductReview(currentPageReview.value, sortFilter)
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
    }else{
        // error
    }
}

let myCartCounter = useCartStore()
let { cartCount } = storeToRefs(myCartCounter)
// console.log(cartCount)

const addToCart = async (itemId, style, size, qty) => {
    let cart = {
      itemId: itemId,
      style: style,
      size: size,
      qty: qty,
    };
    // console.log(cart)
    myCartCounter.addCartCount(qty)
    // console.log(cartCount.value)
    // console.log("cart", cart);
    // console.log(cart);
    let { status, msg } = await fetch.addToCart(cart);
    if(await !status){
        // stock 0
      alertType.value=2
      alertDetail.value="Oops! It seems like the item is currently out of stock."
      isShowAlert.value=true
      alertTime.value=3
    }
}

const changeStyle = async (idx) => {
    // console.log("wow",idx)
    selectedStyle.value = productType.value.styles[idx]
} 

const sortFilterReview = async (sort, name) => {
    // console.log(sort)
    // console.log(name)
    sortFilter.value = {sort: sort, name: name}
    // product review page
    
    // let {status, data} = await fetch.getProductReview(params.id, currentPageReview.value, sortFilter.value.sort, sortFilter.value.name)
    // console.log(data)
    await getProductReview(currentPageReview.value, sortFilter.value)
}

const likeReview = async (reviewId) => {
    // console.log(productId, reviewId)
    let {status, data} = await fetch.updateReviewLike(productId, reviewId)
    // console.log(status)
    await getProductReview(currentPageReview.value, sortFilter.value)
}

// review
const currentPageReview=ref(1)
const totalPageReview=ref(1)
const moveLeftR=async(current)=>{
    // console.log(current)
    currentPageReview.value = current
    await getProductReview(currentPageReview.value, sortFilter.value)
}
const moveRightR=async(current)=>{
    // console.log(current)
    currentPageReview.value = current
    await getProductReview(currentPageReview.value, sortFilter.value)
}
const changePageR=async (number)=>{
    currentPageReview.value = number
    await getProductReview(currentPageReview.value, sortFilter.value)
}


// alert
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(async() => {
   await getProductDetail(productId)
    // console.log(productId,'product id')
})

onMounted(()=>{
    validation.navigationTo()
})
</script>
<template>
<!-- this is pro detail {{ params.id }} -->
    <BaseMenu class="menu" :count="cartCount"/>
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
        <h5 @click="goShop" class="link">
            Product
        </h5>
        <!-- right arrow -->
        <svg class="right_arrow" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.292999 0L22.293 22L0.292999 44H1.707L23.707 22L1.707 0H0.292999Z" fill="#EEEEEE"/>
        </svg>
        <!-- product -->
        <h5 class="link">
            Product Detail
        </h5>
    </div>
    <div class="wrapper_content">
        <BaseProductType :product-style="productType" :selected-style="selectedStyle" :change-style="changeStyle" @add-to-cart="addToCart" :itemOwner="itemOwner"/>
        <BaseStore :owner="store"/>
        <BaseDescription :description="description"/>
        <div class="container_review">
            <BaseReview :product-review="reviews" :total-rating="ratingReview" 
            :sort-filter="sortFilter" :allStyle="allStyleReviews" @sort-filter-review="sortFilterReview" @like-review="likeReview" />
            <div v-show="reviews.length">
                <BaseSelectPage  :current-page="currentPageReview" :total-page="totalPageReview"
                @move-left="moveLeftR" @move-right="moveRightR" @change-page="changePageR"/>
            </div>
        </div>
        <BaseRecommedation  />
        <BaseAlert name="product_detail_main_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"  />

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
.wrapper_content{
    display: flex;
    width: auto;
    height: fit-content;
    flex-direction: column;
    padding: min(1.389dvw, 20px) min(11.111dvw, 160px);
    gap: min(1.389dvw, 20px);
    background-color: #F5F5F5;
}

.container_review{
    display: flex;
    flex-direction: column;
    width: inherit;
    height: fit-content;
    gap: min(0.833dvw, 12px);
    background-color: #fff;
    border-radius: min(0.556dvw, 8px);
    padding: min(1.389dvw, 20px);
}
@media (width <=744px) {
    .container_access{
        height: min(5.376dvw,40px);
        background-color: #FFFFFF;
        border-bottom: min(0.134dvw,1px) solid;
        border-color: #EEEEEE;
        padding: 0px min(5.914dvw, 44px);
        align-items: center;
        gap: min(1.613dvw, 12px);
    }
    .container_access svg:nth-child(1){
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
        cursor: pointer;
    }
    .container_access svg:nth-child(1):hover path{
        fill:#26AC34;
    }
    .right_arrow{
        display: flex;
        width: min(2.688dvw, 20px);
        height: min(5.376dvw, 40px);
    }
    .link{
        font-size: min(1.613dvw, 12px);
        letter-spacing: min(0.027dvw, 0.2px);
        font-weight: 500;
        color:#757575;
        cursor: pointer;
    }
    .link:hover{
        color: #26AC34;
    }
    .wrapper_content{
        padding: min(1.613dvw, 12px) min(5.914dvw, 44px);
        gap: min(1.613dvw, 12px);
    }

    .container_review{
        gap: min(1.613dvw, 12px);
        border-radius: min(1.075dvw, 8px);
        padding: min(2.151dvw, 16px);
    }
}
</style>