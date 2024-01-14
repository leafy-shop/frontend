<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue'
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import BaseSortItem from '../components/shop_page/BaseSortItem.vue'
import {ref, onBeforeMount, onUpdated } from 'vue'
import fetch from '../JS/api';
import {useRoute} from 'vue-router'
import validation from '../JS/validation'

const myRoute = useRoute()
//category list
const categoryFilter = ref([])
//price
const minFilter = ref(undefined)
const maxFilter = ref(undefined)
// rating
const ratingFilter = ref(0)
// tag
const tagFilter = ref("")

const searchItem = ref(myRoute.params.search ? myRoute.params.search : "")

const currentPage = ref(1)
const allItems = ref(0)
const totalPage = ref(1)

const productList = ref([])

const isShowFilter=ref(undefined)

// const getSearchItem = async (search) => {
//     // currentPage.value=1
//     console.log(search)
//     // searchItem.value = search
//     // await getProduct(currentPage.value)
// }

const getProduct=async(page)=>{
    console.log(categoryFilter.value.join())
    console.log(minFilter.value)
    console.log(maxFilter.value)
    console.log(ratingFilter.value)
    console.log(tagFilter.value)
    
    let {status,data} =await fetch.getAllProduct(page, searchItem.value, categoryFilter.value.join(),
    minFilter.value, maxFilter.value, ratingFilter.value, tagFilter.value)
    console.log(data)
    productList.value=data.list
    allItems.value=data.allItems
    totalPage.value=data.allPage
}

// if change page input must be a number only
const changePage=async (number)=>{
    // console.log(typeof(number))
    
    let status = validation.number(number,true)
    currentPage.value = status==true?number:Math.abs(parseInt(number))
    
    // currentPage.value=Math.abs(parseInt(number))
    await getProduct(currentPage.value)
}

onBeforeMount(()=>{
    getProduct(currentPage.value)
})

const getFilterItem=async(data)=>{
    // filterData.value=data
    let {category,max,min,rating,tag}=data
    categoryFilter.value=category
    maxFilter.value=max
    minFilter.value=min
    ratingFilter.value=rating
    tagFilter.value=tag
    console.log(data)
    await getProduct(currentPage.value)
    // console.log("passing data from BaseFilter to shop success!!")
}
const getSortItem=(data)=>{
    let {show}=data
   return isShowFilter.value=show
}



</script>
<template>
    <BaseMenu class="menu" :search="searchItem" />
    <div class="shop_title">
        <h3>
            Shop
        </h3>
        <img src="../assets/shop_p/shop_title.jpg" alt="title_img">
    </div>

    <div class="shop_content">
        <div class="wrapper_content">
            <BaseFilterItem @filter-item="getFilterItem" :isShowFilter="isShowFilter" @closeFilter="getSortItem" />
            <div>
                <BaseSortItem @sort-item="getSortItem" :is-show-filter="isShowFilter" />
                <!-- <BaseProductList :productList="productList"/>
                <div class="link_page_container">
                    <ul>
                        <li v-for="(link,index) of totalPage" :key="index">
                            <button @click="changePage(link)">
                                {{ link }}
                            </button>
                        </li>
                    </ul>
                </div> -->
            </div>
            
        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
    /* position: relative; */
}
.shop_title{
    display: flex;
    position: relative;
    width: auto;
    height: min(16.111dvw,232px);
    /* height: fit-content; */
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* z-index: 1; */
    
}
.shop_title h3{
    position: absolute;
    width: 100%;
    height: inherit;
    padding: min(5.556dvw,80px) min(11.111dvw,160px);
    font-size: min(3.333dvw,48px);
    color: white;
    text-align: center;
    /* z-index: 3; */
}
.shop_title img{
    
    /* opacity: 10%; */
    width: 100%;
    height: auto;
    /* top: -750px; */
    /* z-index: -1; */
}

.shop_content{
    display: flex;
    /* height: 1672px; */
    height: fit-content;
    width: auto;
    padding:min(1.389dvw,20px) 0px ;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
}
.wrapper_content{
    display: flex;
    flex-direction: row;
    width: inherit;
    /* height: 1632px; */
    height: inherit;
    
}
.menu{
    position: sticky;
    top: 0;
    z-index: 999;
}

@media (width<=744px){
    .shop_title{
        height: min(23.656dvw,176px);
    }
    .shop_title h3{
        padding: min(8.065dvw,60px) min(5.914dvw,44px);
        font-size: min(5.376dvw,40px);
    }
    .shop_content{
        padding: min(2.688dvw,20px) 0px;
    }
}
/* @media (width<=376px){
    .wrapper_content{
        flex-direction: column;
    }
} */
</style>