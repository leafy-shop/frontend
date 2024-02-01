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
let initial = 0

const getProductDetail = async (id, selectedId) => {
    // console.log(id)
    let responseProduct = await fetch.getProductDetail(id)
    // console.log(data)
    
    // product type page
    productType.value.itemId = params.id
    productType.value.name = responseProduct.data.name
    productType.value.totalRating = responseProduct.data.totalRating
    productType.value.sold = responseProduct.data.sold
    productType.value.price = responseProduct.data.price
    productType.value.styles = responseProduct.data.styles
    productType.value.image = responseProduct.data.image
    selectedStyle.value = productType.value.styles[selectedId]
    // console.log(productType.value)
    // console.log(selectedStyle.value)

    // product owner page
    let responseStore = await fetch.getStore(responseProduct.data.itemOwner)
    // console.log(responseStore.data)
    store.value = responseStore.data

    // product description page
    description.value = responseProduct.data.description

    // product review page
    let responseReview = await fetch.getProductReview(params.id, currentPage.value)
    console.log(responseReview.data)
    reviews.value = responseReview.data.list
    ratingReview.value = responseProduct.data.totalRating
    allStyleReviews.value = responseProduct.data.styles.map(style => style.style)
    // console.log(allStyleReviews)
}

const changeStyle = async (idx) => {
    selectedStyle.value = productType.value.styles[idx]
} 

const sortFilterReview = async (sort, name) => {
    console.log(sort)
    console.log(name)
    sortFilter.value = {sort: sort, name: name}
    // product review page
    let {status, data} = await fetch.getProductReview(params.id, currentPage.value, sortFilter.value.sort, sortFilter.value.name)
    console.log(data)
    reviews.value = data.list
}

onBeforeMount(() => {
    getProductDetail(params.id, initial)
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
        <BaseReview :product-review="reviews" :total-rating="ratingReview"
        :sort-filter="sortFilter" :allStyle="allStyleReviews" @sort-filter-review="sortFilterReview" />
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
}

</style>