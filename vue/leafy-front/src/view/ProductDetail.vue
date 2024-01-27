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

// selected styles
let selectedStyle = ref({})
let initial = 0

const getProductDetail = async (id, selectedId) => {
    // console.log(id)
    let {status, data} = await fetch.getProductDetail(id)
    // console.log(data)
    productType.value.name = data.name
    productType.value.totalRating = data.totalRating
    productType.value.sold = data.sold
    productType.value.price = data.price
    productType.value.styles = data.styles
    selectedStyle.value = productType.value.styles[selectedId]
}

const changeStyle = async (idx) => {
    selectedStyle.value = productType.value.styles[idx]
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
        <BaseStore/>
        <BaseDescription/>
        <BaseReview/>
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