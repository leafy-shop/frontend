<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue'
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import {ref, onBeforeMount, onUpdated } from 'vue'
import fetch from '../JS/api';
import {useRoute} from 'vue-router'
import validation from '../JS/validation'

const myRoute = useRoute()

const category_list = ref([])

const min_price = ref(-Infinity)
const max_price = ref(Infinity)

const rating = ref(0)

const tag = ref("")

const searchItem = ref(myRoute.params.name ? myRoute.params.name : "")

const currentPage = ref(1)
const allItems = ref(0)
const totalPage = ref(1)

const productList = ref([])

const getSearchItem = async (currentPage, search) => {
    console.log(search)
    searchItem.value = search
    await getProduct(currentPage)
}

const getProduct=async(page)=>{
    console.log(category_list.value.join())
    console.log(min_price.value)
    console.log(max_price.value)
    console.log(rating.value)
    console.log(tag.value)
    let {status,data} =await fetch.getAllProduct(page, searchItem.value, category_list.value.join(),
    min_price.value, max_price.value, rating.value, tag.value)
    // console.log(data)
    productList.value=data.list
    allItems.value=data.allItems
    totalPage.value=data.allPage
}

// if change page input must be a number only
const changePage=async (number)=>{
    console.log(typeof(number))
    
    let status = validation.number(number,true)
    currentPage.value = status==true?number:Math.abs(parseInt(number))
    
    // currentPage.value=Math.abs(parseInt(number))
    await getProduct(currentPage.value)
}

// ----------------- filter base ---------------------

const categoryArr = [
    {name:"Plant",value:'plant', selected: false},
    {name:"Flower",value:'flower', selected: false},
    {name:"Cactus",value:'cactus', selected: false},
    {name:"Seed",value:'seed', selected: false},
    {name:"Equirement",value:'equirement', selected: false},
    {name:"Meterial",value:'meterial', selected: false},
]

const tagArr = [
    {name:"Best Product", value:"best product", selected: false},
    {name:"New Arrivals", value:"new arrivals", selected: false},
    {name:"Plants", value:"plants", selected: false},
    {name:"Indoor Plants", value:"indoor plants", selected: false},
    {name:"Lilac", value:"lilac", selected: false},
    {name:"Jar", value:"jar", selected: false},
    {name:"Pot", value:"pot", selected: false},
]

const getFilterItem = async (currentPage, category_list_param=[], min_price_param=-Infinity,max_price_param=Infinity, rating_param=0, tag_param=[]) => {
    console.log(category_list_param)
    // console.log(currentPage)
    category_list.value = category_list_param
    min_price.value = min_price_param
    max_price.value = max_price_param
    rating.value = rating_param
    tag.value = tag_param
    await getProduct(currentPage)
}

const categoryList = (i) => {
    // categoryInput.value = categoryArr.filter(cate => cate.selected)
    
    if (category_list.value.includes(i)) {
        const index = category_list.value.indexOf(i);
        if (index > -1) { // only splice array when item is found
            category_list.value.splice(index, 1); // 2nd parameter means remove one item only
        }
    } else {
        category_list.value.push(i)
    }

    console.log(category_list.value)
}

const clearFilterItem = async () => {
    category_list.value = []
    min_price.value = -Infinity
    max_price.value = Infinity
    rating.value = 0
    tag.value = ""
    await getProduct(currentPage.value)
}

onBeforeMount(()=>{
    getProduct(currentPage.value)
})

// onUpdated(()=> {
//     getFilterItem(currentPage.value, category_list.value, min_price.value, max_price.value, rating.value, tag.value)
// })

</script>
<template>
    <BaseMenu :search="searchItem" @search="getSearchItem"/>
    <div class="shop_title">
        <h3>
            Shop
        </h3>
        <img src="../assets/shop_p/shop_title.jpg" alt="title_img">
    </div>

    <div class="shop_content">
        <div class="wrapper_content">
            <BaseFilterItem :category="category_list" @categoryList="categoryList" @baseFilterItem="getFilterItem"
            :min="min_price" :max="max_price" :rating="rating" :currentPage="currentPage" @clear="clearFilterItem"
            :category-arr="categoryArr" :tag-arr="tagArr"/>

            <BaseProductList :productList="productList" :category="category_list"
            :min-price="min_price" :max-price="max_price" :rating="rating" :tag="tag" :search-item="searchItem"
            :currentPage="currentPage" :totalPage="totalPage"
            @getProduct="getProduct" @changePage="changePage"
            />
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