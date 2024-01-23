<script setup>
import {useRoute} from 'vue-router'
import BaseProductType from '../components/productDetail/BaseProductType.vue'
import BaseStore from '../components/productDetail/BaseStore.vue'
import BaseMenu from '../components/BaseMenu.vue'
import BaseFooter from '../components/BaseFooter.vue'
import BaseDescription from '../components/productDetail/BaseDescription.vue'
import BaseReview from '../components/productDetail/BaseReview.vue'
import BaseRecommedation from '../components/productDetail/BaseRecommendation.vue'
const {params} =useRoute()

</script>
<template>
<!-- this is pro detail {{ params.id }} -->
    <BaseMenu/>
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
}

</style>