<script setup>
import {useRoute} from 'vue-router'
import {ref,onMounted} from 'vue'
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



onMounted(()=>{
    validation.navigationTo()
})
</script>
<template>
<!-- this is pro detail {{ params.id }} -->
    <BaseMenu class="menu" />
    <div class="wrapper_content">
        <BaseProductType/>
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
    background-color: #F5F5F5;
}

</style>