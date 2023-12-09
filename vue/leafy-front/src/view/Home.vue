<script setup>
import BaseMenu from '../components/BaseMenu.vue' 
import BaseInfomation from '../components/home_page/BaseInformation.vue'
import BaseSolution from '../components/home_page/BaseSolution.vue'
import BaseRandDesigner from '../components/home_page/BaseRandDesigner.vue'
import BaseHistory from '../components/home_page/BaseHistory.vue'
import BaseLandScapeDesign from '../components/home_page/baselandscapedesign.vue'
import BasePlantInspo from '../components/home_page/BasePlantInspo.vue'
import BaseFooter from '../components/basefooter.vue'
import BaseReview from '../components/home_page/BaseReview.vue'
</script>

<template>
    <BaseMenu/>
    <BaseInfomation/>
    <BaseSolution/>
    <BaseRandDesigner/>
    <BaseHistory/>
    <BaseLandScapeDesign/>
    <BasePlantInspo/>
    <BaseReview/>
    <BaseFooter/>
    <button class="chat">
        <img src="../assets/icon/chat_icon.svg" alt="chat_icon">
        <span>chat</span>
    </button>
</template>

<style scoped>

.chat{
    display: flex;
    position: fixed;
    right: 5px;
    bottom: 15px;
    width: 95px;
    height: 40px;
    margin: auto 10px auto 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: #26AC34;
    box-shadow: 0px 0px 10px 0px rgba(4, 6, 15, 0.20);
    border: none;
    z-index: 99;
}
.chat img{
    width: 20px;
    height: 20px;
}
.chat span{
    margin: auto 5px auto 5px;
    color: white;
    font-size: 16px;
    text-transform: capitalize;
    font-weight: 500;
}
</style>
