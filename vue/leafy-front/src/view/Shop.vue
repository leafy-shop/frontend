<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue'
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import BaseSortItem from '../components/shop_page/BaseSortItem.vue'
import {ref, onBeforeMount, onUpdated ,onMounted,computed} from 'vue'
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
const eachSide=3
const pageHidden=(currentP,total)=>{
    
    for(let i=1;i<=eachSide;i++){
        // previous number
        // for taggle to show hidden number before
        if(currentP-(eachSide+(i-1)*(-1))<=0){
            document.getElementById(`preNumber_${i}`).setAttribute('style','display:none;')
        }else{
            document.getElementById(`preNumber_${i}`).setAttribute('style','display:flex;')
        }
        // console.log('current : '+currentP)
        // console.log('this is a '+(currentP+i))
        // next number
        if((currentP+i)>total){
            // console.log('cu 1')

            document.getElementById(`nextNumber_${i}`).setAttribute('style','display:none;')
        }else{
            // console.log('cu 2')

            document.getElementById(`nextNumber_${i}`).setAttribute('style','display:flex;')
        }
    }
    
//     // document.getElementById()
    
//     
//     // v-show="currentPage+link>totalPage?true:false"
    
}

const getProduct=async(page)=>{
    console.log(categoryFilter.value.join())
    console.log(minFilter.value)
    console.log(maxFilter.value)
    console.log(ratingFilter.value)
    console.log(tagFilter.value)
    
    let {status,data} =await fetch.getAllProduct(page, 18, searchItem.value, categoryFilter.value.join(),
    minFilter.value, maxFilter.value, ratingFilter.value, tagFilter.value, sortName.value, sort.value)
    console.log(data.list)
    // productList.value=data
    productList.value=data.list
    allItems.value=data.allItems
    totalPage.value=data.allPage
    // totalPage.value=10
}

// if change page input must be a number only
const changePage=async (number,n)=>{
    // console.log(typeof(number))
    
    let status = validation.number(number,true)
    currentPage.value = status==true?number:Math.abs(parseInt(number))
    
    // currentPage.value=Math.abs(parseInt(number))
    await getProduct(currentPage.value)
    // pageHidden(currentPage.value)
}



const getFilterItem=async(data)=>{
    // filterData.value=data
    let {category,max,min,rating,tag,sortBy}=data
    categoryFilter.value=category
    maxFilter.value=max
    minFilter.value=min
    ratingFilter.value=rating
    tagFilter.value=tag
    sortName.value=sortBy ? sortBy.name : undefined
    sort.value= sortBy ? sortBy.type : undefined
    console.log(data)
    await getProduct(currentPage.value)
    // console.log("passing data from BaseFilter to shop success!!")
    pageHidden(currentPage.value,totalPage.value)

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
    // validation.navigationTo(top)
}

const moveRight = async (current) => {
    currentPage.value = current < totalPage.value ? current + 1 : totalPage.value
    await getProduct(currentPage.value)
    // validation.navigationTo(top)
}


onBeforeMount(()=>{
    getProduct(currentPage.value)
    

})
onMounted(()=>{
    validation.navigationTo()
    pageHidden(currentPage.value,totalPage.value)
    // console.log(pageComputed.value)
})
onUpdated(()=>{
    pageHidden(currentPage.value,totalPage.value)
    console.log('curr'+currentPage.value)
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
                        <li @click="moveLeft(currentPage) " class="move_page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.207 5.29303C13.3945 5.48056 13.4998 5.73487 13.4998 6.00003C13.4998 6.26519 13.3945 6.5195 13.207 6.70703L9.91403 10L13.207 13.293C13.3892 13.4816 13.49 13.7342 13.4877 13.9964C13.4854 14.2586 13.3803 14.5094 13.1948 14.6948C13.0094 14.8803 12.7586 14.9854 12.4964 14.9877C12.2342 14.99 11.9816 14.8892 11.793 14.707L7.79303 10.707C7.60556 10.5195 7.50024 10.2652 7.50024 10C7.50024 9.73487 7.60556 9.48056 7.79303 9.29303L11.793 5.29303C11.9806 5.10556 12.2349 5.00024 12.5 5.00024C12.7652 5.00024 13.0195 5.10556 13.207 5.29303Z" fill="#424242"/>
                            </svg>
                        </li>
                        <!-- prevoius -->
                        <li   v-for="(link,index) of eachSide"  :key="index" :id="`preNumber_${link}`">
                            <button  @click="changePage(currentPage-(eachSide+(link-1)*(-1)))">
                                 {{ currentPage-(eachSide+(link-1)*(-1)) }}
                                    -
                            </button>
                        </li>
                        <!-- current -->
                        <li  class="current_page">
                            <button >
                                {{ currentPage }} i
                            </button>
                        </li>
                        <!-- next -->
                        <li   v-for="(link,index) of eachSide" :key="index" :id="`nextNumber_${link}`">
                            <button @click="changePage(currentPage+link)">
                                {{ currentPage+link }} 
                                +
                            </button>
                        </li>
                        
                        <!-- มีค่ามากกว่า 3 -->
                        <!-- <li v-if="totalPage >3" v-for="(link,index) of totalPage>10?3:totalPage" :key="index">
                            <button @click="changePage(link)">
                                {{ link }} 
                            </button>
                        </li> -->
                        <!-- มีค่ามากกว่า 5 -->
                        <!-- <li v-if="totalPage >5" v-for="(link,index) of totalPage>6?3:totalPage" :key="index">
                            <button @click="changePage(link)">
                                {{ link }} 
                            </button>
                        </li>

                        <li v-if="totalPage >5">
                            ...
                        </li> -->
                        <!-- <li v-if="totalPage >3"  v-for="(link,index) of (totalPage>10?3:totalPage)" :key="index">
                            <button @click="changePage(totalPage-link)">
                                {{ totalPage-link }} 
                            </button>
                        </li> -->
                        <li @click="moveRight(currentPage)" class="move_page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.79303 14.707C7.60556 14.5195 7.50024 14.2652 7.50024 14C7.50024 13.7349 7.60556 13.4806 7.79303 13.293L11.086 10L7.79303 6.70704C7.61087 6.51844 7.51008 6.26584 7.51236 6.00364C7.51463 5.74144 7.6198 5.49063 7.80521 5.30522C7.99062 5.11981 8.24143 5.01465 8.50363 5.01237C8.76583 5.01009 9.01843 5.11088 9.20703 5.29304L13.207 9.29304C13.3945 9.48057 13.4998 9.73488 13.4998 10C13.4998 10.2652 13.3945 10.5195 13.207 10.707L9.20703 14.707C9.0195 14.8945 8.76519 14.9998 8.50003 14.9998C8.23487 14.9998 7.98056 14.8945 7.79303 14.707Z" fill="#424242"/>
                            </svg>
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
    padding: min(1.389dvw,20px) 0px;
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
    display: flex;
    width: 40px;
    height: 36px;
    list-style: none;
    justify-content: center;
    align-items: center;
}
.link_page_container ul li button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
}

.current_page button{
    background-color: #26AC34;
    color: #fff;
}

.move_page{
    width: 44px;
    height: 36px;
    padding: 8px 12px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
}
.move_page svg{
    padding: 0px;
    width: 20px;
    height: 20px;
}
/* .link_page_container ul li button:focus{
    background-color: #26AC34;

} */

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