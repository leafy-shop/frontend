<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue'
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import BaseSortItem from '../components/shop_page/BaseSortItem.vue'
import {ref, onBeforeMount, onUpdated ,onMounted} from 'vue'
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
// this for check if we have params 
const searchItem = ref(myRoute.params.search ? myRoute.params.search : "")
//for change page product list
const currentPage = ref(1)
const allItems = ref(0)
const totalPage = ref(1)
// this attribute for receive data when get from api
const productList = ref([])

// this share center for open and close filter
const isShowFilter=ref(undefined)

// sorting product
const sortName = ref(undefined)
const sort = ref(undefined)

const sortTypeArr = [
    {name:"Popular",value: {name: "popular", type: 'desc'}},
    {name:"New Arrival",value: {name: "new_arrival", type: 'desc'}},
    {name:"Top Sales",value: {name: "sales", type: 'desc'}},
    {name:"Low - High",value: {name: "price", type: 'asc'}},
    {name:"High - Low",value: {name: "price", type: 'desc'}},
]

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
    minFilter.value, maxFilter.value, ratingFilter.value, tagFilter.value, sortName.value, sort.value)
    console.log(data.list)
    // productList.value=data
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
    let {category,max,min,rating,tag,sortBy}=data
    categoryFilter.value=category
    maxFilter.value=max
    minFilter.value=min
    ratingFilter.value=rating
    tagFilter.value=tag
    sortName.value=sortBy.name
    sort.value=sortBy.type
    console.log(data)
    await getProduct(currentPage.value)
    // console.log("passing data from BaseFilter to shop success!!")
}

const showFilterItem=(data)=>{
    let {show}=data
    // console.log(show)
    return isShowFilter.value=show
}

const getSortItem=async(data)=>{
    sortName.value = data.name 
    sort.value = data.type
    console.log(sort)
    console.log(sortName)
    await getProduct(currentPage.value)
}

const moveLeft = async (current) => {
    console.log(currentPage.value)
    currentPage.value = current > 1 ? current - 1 : 1
    await getProduct(currentPage.value)
}

const moveRight = async (current) => {
    currentPage.value = current < totalPage.value ? current + 1 : totalPage.value
    await getProduct(currentPage.value)
}

onMounted(()=>{
    validation.navigationTo()
})

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
            <BaseFilterItem @filter-item="getFilterItem" :isShowFilter="isShowFilter"
            @closeFilter="showFilterItem" :sort-type-arr="sortTypeArr" />
            <div class="wrapper_productList">
                <BaseSortItem @showFilter="showFilterItem" 
                :is-show-filter="isShowFilter"
                @sortItem="getSortItem"
                @moveLeft="moveLeft" 
                @moveRight="moveRight" 
                :change-page="{currentPage:currentPage,totalPage:totalPage}"
                />
                <BaseProductList :productList="productList" :size="100" :gridColumn="3"/>
                <div class="link_page_container">
                    <ul>
                        <li v-for="(link,index) of totalPage" :key="index">
                            <button @click="changePage(link)">
                                {{ link }}
                            </button>
                        </li>
                    </ul>
                </div>
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
    gap: min(2.222dvw,32px);
    
}
.wrapper_productList{
    display: flex;
    width: min(57.778dvw,832px);
    height: inherit;
    flex-direction: column;
    gap: min(1.389dvw,20px);
}
.menu{
    position: sticky;
    top: 0;
    z-index: 999;
}

.link_page_container{
    display: flex;
    width: 100%;
    height: 36px;
    justify-content: center;
    align-items: center;
}
.link_page_container ul{
    display: flex;
    width: 317px;
    height: inherit;
    flex-direction: row;
    justify-content: space-around;

}
.link_page_container ul li{
    width: 40px;
    height: 36px;
    list-style: none;
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
        padding: min(2.688dvw,20px) min(5.914dvw,44px);
    }
    .wrapper_content{
        gap: min(2.151dvw,16px);
    }
    .wrapper_productList{
        width: min(65.591dvw,488px);
    }
}

@media (width<=376px){
    .wrapper_productList{
        width: 100%;
        padding: min(3.191dvw,12px) min(8.511dvw,16px);
        /* justify-content: center; */
    }
    .shop_content{
        /* display: flex; */
        width: 100%;
        padding: 0px;
        background: #EEE;
    }
    /* .wrapper_content{
        flex-direction: column;
    } */
}
</style>