<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue'
import BaseProductList from '../components/shop_page/BaseProductList.vue';
</script>
<template>
    <BaseMenu/>
    <div class="shop_title">
        <h3>
            Shop
        </h3>
        <img src="../assets/shop_p/shop_title.jpg" alt="title_img">
    </div>

    <div class="shop_content">
        <div class="wrapper_content">
            <BaseFilterItem/>
            <BaseProductList/>
        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
.shop_title{
    display: flex;
    position: relative;
    width: auto;
    height: 232px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.shop_title h3{
    font-size: 48px;
    color: white;
    z-index: 3;
}
.shop_title img{
    position: absolute;
    /* opacity: 10%; */
    width: 100%;
    top: -750px;
    z-index: 1;
}

.shop_content{
    display: flex;
    /* height: 1672px; */
    height: fit-content;
    width: auto;
    align-items: center;
    justify-content: center;
}
.wrapper_content{
    display: flex;
    flex-direction: row;
    width: fit-content;
    /* height: 1632px; */
    height: 2024px;

}
</style>