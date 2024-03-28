<script setup>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount, onUpdated, onMounted, computed } from 'vue'
import fetch from '../JS/api';
import validation from '../JS/validation'
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue';
import Basesortitem from '../components/shop_page/BaseSortItem.vue';
import BaseSelectPage from '../components/BaseSelectPage.vue';
import cookie from '../JS/cookie';
import pMode from '../JS/enum/profileMode'
import sortTypeArr from '../JS/enum/product'
import BaseStar from '../components/productDetail/BaseStar.vue'

let { params } = useRoute()
const id =ref('')
let origin = `${import.meta.env.VITE_BASE_URL}`;
// change mode by role
const profileMode=ref('user') //for change mode
const isMe=ref(false) //check for my self
//common attribute
const owner = ref({}) // owner
const categoryFilter = ref([]) // category list
const minFilter = ref(undefined) // price min
const maxFilter = ref(undefined) // price max
const ratingFilter = ref(0) // rating
const tagFilter = ref("") // tag
const cookieRole=ref('')
const cookieId=ref('')
// search item
const searchItem = ref("") // this for check if we have params 
//for change page product list
const currentPage = ref(1)
const allItems = ref(0)
const totalPage = ref(1)
// this attribute for receive data when get from api
const productList = ref([])
const outStockList = ref([])
const recommendProduct = ref([])
// this share center for open and close filter
const isShowFilter = ref(undefined)

// sorting product
const sortName = ref(undefined)
const sort = ref(undefined)

// const sortTypeArr = [
//     { name: "Popular", value: { name: "popular", type: 'desc' } },
//     { name: "New Arrival", value: { name: "new_arrival", type: 'desc' } },
//     { name: "Top Sales", value: { name: "sales", type: 'desc' } },
//     { name: "Low - High", value: { name: "price", type: 'asc' } },
//     { name: "High - Low", value: { name: "price", type: 'desc' } },
// ]

const changeMode=()=>{
    let includeMode=pMode.map(x=>x.mode==owner.value.role?true:false) //check role for select mode

    // change mode
    if(owner.value.userId==cookieId.value){ //check is that me
    // if(owner.value.userId!=cookieId.value){ //check is that me
        isMe.value=true

        if(includeMode.includes(true)){ //check role, is exist?
            console.log('store role',owner.value)
            profileMode.value=owner.value.role
        }else{
            // error
            console.log('role does not exist!!')

        }   

    }else{ 
        isMe.value=false //this not me
        
        if(includeMode.includes(true)){ //check role, is exist?
            console.log('store role',owner.value)
            profileMode.value=owner.value.role
        }else{
            // error
            console.log('role does not exist!!')

        }        
    }

}

// const getSearchItem = async (search) => {
//     // currentPage.value=1
//     console.log(search)
//     // searchItem.value = search
//     // await getProduct(currentPage.value)
// }

const getStore =async()=>{
    let {status,data}= await fetch.getStore(id.value)
    // console.log(data,"Testing store")
    if(status){
        owner.value = data
        changeMode()
    }else{
        // error
    }
    
}
const getProductRecommend=async()=>{
    let {status,data} = await fetch.getAllRecommendProduct(1, 4)
    recommendProduct.value = data.list
    // console.log(data)
    console.log(recommendProduct.value,'TESTIng')
    // totalPage.value=10
}

const getProduct = async (page) => {
    // console.log(categoryFilter.value.join())
    // console.log(minFilter.value)
    // console.log(maxFilter.value)
    // console.log(ratingFilter.value)
    // console.log(tagFilter.value)
    // console.log(owner.value.email)

    // ownerid
    // console.log(owner.value,"Testing store")
    let productInput = {
        page: page,
        limitP: isMe.value?10:18,
        searchItem: searchItem.value,
        type: categoryFilter.value.join(),
        min: minFilter.value,
        max: maxFilter.value,
        rating: ratingFilter.value,
        tag: tagFilter.value,
        sort_name: sortName.value,
        sort: sort.value,
        owner: owner.value.username
    }

    let { status, data } = await fetch.getAllProduct(productInput)
    // console.log(data.list)
    // productList.value=data
    console.log(data,"sdjflasdlfjasdfjlasfd")
    productList.value = data.list
    outStockList.value = data.outStock
    allItems.value = data.allItems
    totalPage.value = data.allPage

    
    validation.navigationTo()
}

// if change page input must be a number only
const changePage = async (number) => {
    // console.log(typeof(number))

    // let status = validation.number(number, true)
    currentPage.value = number

    // currentPage.value=Math.abs(parseInt(number))
    await getProduct(currentPage.value)
    // pageHidden(currentPage.value)
}

const getFilterItem = async (data) => {
    // filterData.value=data
    let { category, max, min, rating, tag, sortBy } = data
    categoryFilter.value = category
    maxFilter.value = max
    minFilter.value = min
    ratingFilter.value = rating
    tagFilter.value = tag
    sortName.value = sortBy ? sortBy.name : undefined
    sort.value = sortBy ? sortBy.type : undefined
    // console.log(data)
    await getProduct(currentPage.value)
    // console.log("passing data from BaseFilter to shop success!!")
    pageHidden(currentPage.value, totalPage.value)
}

const showFilterItem = (data) => {
    // console.log(data)
    let { show } = data
    // console.log(typeof show)
    return typeof show === "object" ? false : isShowFilter.value = show
}

const getSortItem = async (data) => {
    sortName.value = data.name
    sort.value = data.type
    // console.log(sort)
    // console.log(sortName)
    await getProduct(currentPage.value)
}

const moveLeft = async (current) => {
    // console.log(currentPage.value)
    currentPage.value = current 
    await getProduct(currentPage.value)
    // validation.navigationTo(top)
}

const moveRight = async (current) => {
    currentPage.value = current 
    await getProduct(currentPage.value)
    // validation.navigationTo(top)
}

onBeforeMount(async() => {
    // param
    id.value=validation.decrypt(params.id)
    // cookie
    let cookieData=cookie.decrypt()
    cookieId.value=cookieData.id
    cookieRole.value=cookieData.role
    
    await getStore() 
    await getProduct(currentPage.value)
    await getProductRecommend()

    
})
onMounted(() => {
    
    validation.navigationTo()
    console.log('alsdjflasdf',id.value)
    
    // pageHidden(currentPage.value, totalPage.value)
})
onUpdated(() => {
    // pageHidden(currentPage.value, totalPage.value)
    console.log('curr' + currentPage.value)
})
// let id=params.id
</script>
<template>
    <!-- this is profile page {{ params.id }} -->
    <BaseMenu />
    <div class="wrapper_profile">
        <!-- username & description -->
        <!-- picture -->
        <div class="container_user_info">
            <div class="big_image">
                <img src="../assets/shop_p/shop_title.jpg" alt="big_img">
                <!-- <img src="../assets/shop_p/shop_title.jpg" alt="big_img"> -->
            </div>
            <!-- <img src="../assets/vue.svg" alt="soybean"> -->
            <!-- wrapper 1 -->
            <div class="wrapper_user">
                <!-- user img & username -->
                <div class="user">
                    <div class="user_img">
                        <img src="../assets/shop_p/avatar_userProfile.png" alt="user_img">
                    </div>
                    <div class="user_info">
                        <h5>
                            {{ owner.username }}
                        </h5>
                        <!-- chat & follower & new product -->
                        <div>
                            <button v-if="!isMe&&profileMode==pMode[0].mode" class="chat_btn">
                                Chat Now
                            </button>
                            <button v-if="!isMe&&profileMode==pMode[0].mode" class="follow_btn">
                                Follow
                            </button>

                            <!-- myself -->
                            <button v-if="isMe&&profileMode==pMode[0].mode" class="new_product_btn">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C6.31826 0 6.62348 0.126428 6.84853 0.351472C7.07357 0.576516 7.2 0.88174 7.2 1.2V4.8H10.8C11.1183 4.8 11.4235 4.92643 11.6485 5.15147C11.8736 5.37652 12 5.68174 12 6C12 6.31826 11.8736 6.62348 11.6485 6.84853C11.4235 7.07357 11.1183 7.2 10.8 7.2H7.2V10.8C7.2 11.1183 7.07357 11.4235 6.84853 11.6485C6.62348 11.8736 6.31826 12 6 12C5.68174 12 5.37652 11.8736 5.15147 11.6485C4.92643 11.4235 4.8 11.1183 4.8 10.8V7.2H1.2C0.88174 7.2 0.576516 7.07357 0.351472 6.84853C0.126428 6.62348 0 6.31826 0 6C0 5.68174 0.126428 5.37652 0.351472 5.15147C0.576516 4.92643 0.88174 4.8 1.2 4.8H4.8V1.2C4.8 0.88174 4.92643 0.576516 5.15147 0.351472C5.37652 0.126428 5.68174 0 6 0Z" fill="white"/>
                                </svg>
                                <span>
                                    New Product
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- detail and recommend -->
        <div v-if="profileMode==pMode[0].mode" class="wrapper_details">
            <div class="container_details">
                <!-- suplier detail -->
                <div class="suplier_details">
                    <!-- rating & products -->
                    <div>
                        <!-- ratings -->
                        <div>
                            <h6>
                                Ratings
                            </h6>
                            <h6>
                                {{ owner.rating }}
                            </h6>
                        </div>
                        <!-- products -->
                        <div>
                            <h6>
                                Products
                            </h6>
                            <h6>
                                {{ owner.products }}
                            </h6>
                        </div>
                        <!-- response rate -->
                        <div>
                            <h6>
                                Response Rate
                            </h6>
                            <h6>
                                100%
                            </h6>
                        </div>
                    </div>

                    <!-- response rate & response time -->
                    <div>
                        <!-- response rate -->
                        <div>
                            <h6>
                                Response Rate
                            </h6>
                            <h6>
                                100%
                            </h6>
                        </div>
                        <!-- response time -->
                        <div>
                            <h6>
                                Response Time
                            </h6>
                            <h6>
                                within hours
                            </h6>
                        </div>

                    </div>

                    <!-- follower & joind -->
                    <div>
                        <!-- follower -->
                        <div>
                            <h6>
                                Follower
                            </h6>
                            <h6>
                                1
                            </h6>
                        </div>

                        <!-- joined -->
                        <div>
                            <h6>
                                Joined
                            </h6>
                            <h6>
                                {{ owner.time }}
                            </h6>
                        </div>
                    </div>

                </div>
                <div v-if="!isMe" class="recommedation">
                    <!-- recommendation -->
                    <h5>
                        Recommended for You
                    </h5>
                    <BaseProductList :product-list="recommendProduct" :gridColumn="4" />
                </div>
            </div>
        </div>
        <!-- supplier and not me -->
        <!-- product list and filter -->
        <div v-if="!isMe&&profileMode==pMode[0].mode" class="container_product">
                <BaseFilterItem @filter-item="getFilterItem" :isShowFilter="isShowFilter" @closeFilter="showFilterItem"
                    :sort-type-arr="sortTypeArr" />
                <div class="wrapper_product">
                    <div class="product_list">
                        <Basesortitem @showFilter="showFilterItem" :is-show-filter="isShowFilter" @sortItem="getSortItem"
                            @moveLeft="moveLeft" @moveRight="moveRight"
                            :change-page="{ currentPage: currentPage, totalPage: totalPage }" />
                        <BaseProductList :product-list="productList" :gridColumn="3" />
                    </div>

                    <BaseSelectPage :total-page="totalPage" :current-page="currentPage"
                    @changePage="changePage" @move-left="moveLeft" @move-right="moveRight"/>

                    <div class="product_sold_out">
                        <h5>
                            Sold Out
                        </h5>
                        <BaseProductList :product-list="outStockList"  :gridColumn="3" :sold-out="true" />
                        <!-- <BaseSelectPage/> -->
                    </div>
                </div>

        </div>
        <!-- myself -->
        <div v-else-if="isMe&&profileMode==pMode[0].mode" class="container_product_me">
            <Basesortitem @showFilter="showFilterItem" :is-show-filter="isShowFilter" @sortItem="getSortItem"
                @moveLeft="moveLeft" @moveRight="moveRight"
                :change-page="{ currentPage: currentPage, totalPage: totalPage }" />
            <div class="product_list_me">
                <div v-for="(product,index) of productList" :key="index" class="product_item_me">
                    <!-- img -->
                    <div class="img_me">
                        <!-- <img  src="../assets/home_p/home_design_content_tropical.png" alt="product_img"> -->
                        <img v-if="product.image" :src="`${origin}/api/image/products/${product.itemId}`" :alt="`product_img_${product.name}`">
                        <img v-else src="../assets/vue.svg" alt="product_img">
                        
                    </div>
                    <!-- info -->
                    <div class="detail_me">
                        <div class="info_me">
                            <div class="name_me">
                                <!-- name & star -->
                                <div>
                                    <!-- name -->
                                    <h5>
                                        <!-- Polyscias  -->
                                        {{ product.name }}
                                    </h5>
                                    <!-- star -->
                                    <BaseStar :rating="product.totalRating" :size="100" name="product_me"/>
                                </div>
                                <!-- operation -->
                                <div>
                                    <!-- edit -->
                                    <button>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.16659 3.16664H2.99992C2.55789 3.16664 2.13397 3.34223 1.82141 3.65479C1.50885 3.96736 1.33325 4.39128 1.33325 4.83331V14C1.33325 14.442 1.50885 14.8659 1.82141 15.1785C2.13397 15.491 2.55789 15.6666 2.99992 15.6666H12.1666C12.6086 15.6666 13.0325 15.491 13.3451 15.1785C13.6577 14.8659 13.8333 14.442 13.8333 14V9.83331M12.6549 1.98831C12.8087 1.82912 12.9926 1.70215 13.1959 1.6148C13.3993 1.52746 13.618 1.48148 13.8393 1.47956C14.0605 1.47763 14.28 1.5198 14.4848 1.6036C14.6897 1.6874 14.8758 1.81116 15.0322 1.96765C15.1887 2.12414 15.3125 2.31022 15.3963 2.51505C15.4801 2.71988 15.5223 2.93934 15.5203 3.16064C15.5184 3.38194 15.4724 3.60064 15.3851 3.80398C15.2977 4.00732 15.1708 4.19123 15.0116 4.34497L7.85659 11.5H5.49992V9.14331L12.6549 1.98831Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <!-- delete -->
                                    <button>
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.33325 8.16667V13.1667M9.66659 8.16667V13.1667M1.33325 4.83333H14.6666M13.8333 4.83333L13.1108 14.9517C13.0808 15.3722 12.8927 15.7657 12.5842 16.053C12.2757 16.3403 11.8698 16.5 11.4483 16.5H4.55159C4.13004 16.5 3.72414 16.3403 3.41566 16.053C3.10717 15.7657 2.91902 15.3722 2.88909 14.9517L2.16659 4.83333H13.8333ZM10.4999 4.83333V2.33333C10.4999 2.11232 10.4121 1.90036 10.2558 1.74408C10.0996 1.5878 9.8876 1.5 9.66659 1.5H6.33325C6.11224 1.5 5.90028 1.5878 5.744 1.74408C5.58772 1.90036 5.49992 2.11232 5.49992 2.33333V4.83333H10.4999Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <!-- price -->
                            <h5 class="price_me">
                                <!-- $80 -->
                                {{ product.minPrice }} 
                                <span v-show="product.maxPrice==0?false:true">&nbsp;-&nbsp;</span>
                                {{ product.maxPrice }}
                            </h5>
                            
                            <!-- discription -->
                            <p class="discription_me">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odio fugiat aspernatur voluptate enim, autem tempora delectus sit fuga facere! Facere beatae sit iusto rem eius exercitationem placeat deserunt, corrupti, praesentium dolore similique ea dignissimos consequuntur saepe eum quasi error? Asperiores sunt numquam illo consectetur quia nobis excepturi officiis est. Sed enim doloremque molestiae. Iste adipisci labore animi corrupti optio sequi eum tempora est at ipsa modi natus nobis repudiandae minima iusto sunt cum assumenda quibusdam ducimus, quam sapiente. Laudantium similique perferendis dicta necessitatibus impedit delectus, mollitia debitis facere veritatis recusandae minima ea hic. Necessitatibus quasi ipsum magnam deleniti explicabo voluptatem cum quidem culpa ullam consectetur omnis eaque illo, nostrum non qui iure. Doloremque modi laboriosam, nam nostrum debitis eos rem quod. Dignissimos hic earum error obcaecati minus voluptates suscipit soluta unde, ducimus quae sequi placeat eligendi veritatis maxime nihil molestiae deleniti, a sunt laborum delectus mollitia vero debitis culpa?
                            </p>
                        </div>
                        <!-- stock -->
                        <div class="stock_me">
                            <div>
                                <h5>
                                    Stocks
                                </h5>
                                <h6>
                                    13
                                    pieces available
                                </h6>
                            </div>
                            <h6>
                                {{product.sold}}
                                sold
                            </h6>
                            
                        </div>
                    </div>
                </div>
            </div>
            <!-- select page -->
            <BaseSelectPage :total-page="totalPage" :current-page="currentPage"
                    @changePage="changePage" @move-left="moveLeft" @move-right="moveRight"/>

        </div>
        <!-- <div class="container_product">
            <BaseFilterItem/>
            <div class="wrapper_product">
                <Basesortitem/>
                <BaseProductList :product-list="productList"  :gridColumn="3"  />
            </div>
        </div> -->
    </div>
    <BaseFooter />
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_profile {
    display: flex;
    flex-direction: column;
    width: auto;
    height: fit-content;
    min-height: 90dvh;
    max-height: 100%;
    gap: min(1.389dvw, 20px);
    background-color: #F5F5F5;
    justify-content: start;
    align-items: center;

}

.container_user_info {
    display: flex;
    position: relative;
    flex-direction: column;
    width: inherit;
    height: min(17.778dvw, 256px);
}

.big_image {
    display: flex;
    width: auto;
    height: min(13.333dvw, 192px);
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.big_image img {
    width: 100%;
    height: auto;
    z-index: 0;
}

.wrapper_user {
    display: flex;
    position: absolute;
    flex-direction: column;
    width: auto;
    height: fit-content;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 50%;
    right: 50%;
    z-index: 1;
}

.user {
    display: flex;
    position: relative;
    width: fit-content;
    height: min(8.889dvw, 128px);
    /* position: absolute; 
    bottom: -50px;*/
    justify-content: center;
    align-items: center;
    gap: min(1.389dvw, 20px);
    bottom: 0;
}

.user_img {
    width: min(8.889dvw, 128px);
    height: min(8.889dvw, 128px);
    border-radius: 50%;
    border: min(0.278dvw, 4px) solid #FFF;
    overflow: hidden;
    background-color: #FAFAFA;
}

.user_img img {
    width: 100%;
    height: auto;
}

.user_info {
    display: flex;
    width: min(67.5dvw, 972px);
    height: 100%;
    justify-content: space-between;
    align-items: end;
    gap: min(0.833dvw, 12px);
}

.user_info h5 {
    width: fit-content;
    height: min(2.5dvw, 36px);
    font-size: min(1.667dvw, 24px);
    font-weight: 700;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.user_info div {
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: min(0.833dvw, 12px);
}

.user_info div button {
    display: flex;
    /* width: min(8.611dvw, 124px); */
    width: fit-content;
    min-width: min(8.611dvw, 124px);
    height: min(2.778dvw, 40px);
    font-size: min(1.111dvw, 16px);
    border: min(0.069dvw, 1px) solid;
    border-color: #26AC34;
    color: #26AC34;
    background-color: #FFF;
    border-radius: min(0.278dvw, 4px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
}
/* myself */
.user_info .new_product_btn{
    white-space: nowrap;
    gap: 4px;
    color: #fff;
    background-color: #26AC34 ;
}
.user_info .new_product_btn svg{
    width: 12px;
    height: auto;
}
.user_info .new_product_btn span{
    font-size: 16px;
    font-weight: 500;
}
.follow_btn:hover,
.chat_btn:hover {
    border-color: #26AC34;
    color: #fff;
    background-color: #26AC34;
}

.follow_btn:active,
.chat_btn:active {
    background-color: #58d264;
    border-color: #58d264;
}
.user_info .new_product_btn:hover{
    border-color: #fff;
    color: #26AC34 ;
    background-color: #fff ;
}
.user_info .new_product_btn:hover svg path{
    fill: #26AC34;
}
.wrapper_details {
    display: flex;
    width: auto;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    align-items: center;
}

.container_details {
    display: flex;
    flex-direction: column;
    width: min(77.778dvw, 1120px);
    height: fit-content;
    gap: min(1.389dvw, 20px);
    justify-content: center;
    align-items: center;
}

.recommedation {
    display: flex;
    flex-direction: column;
    width: inherit;
    height: fit-content;

}

.recommedation h5 {
    display: flex;
    width: inherit;
    height: min(2.5dvw, 36px);
    font-weight: 700;
    font-size: min(1.667dvw, 24px);
    color: #252525;
    align-items: center;
}

.suplier_details {
    display: flex;
    width: inherit;
    height: fit-content;
    background-color: white;
    padding: min(1.389dvw, 20px);
    gap: min(4.167dvw, 60px);
    border-radius: min(0.556dvw, 8px);
}

.suplier_details div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: min(0.833dvw, 12px);

}

.suplier_details div div {
    display: flex;
    width: min(22.222dvw, 320px);
    height: min(1.389dvw, 20px);
    flex-direction: row;
    gap: min(0.833dvw, 12px);
    text-align: center;
    align-items: center;
}

.suplier_details div>div:nth-child(3) {
    display: none;
}

.suplier_details div div h6 {
    font-size: min(0.972dvw, 14px);
    font-weight: 400;
    color: #9E9E9E;
}

.suplier_details div div h6:nth-child(2) {
    color: #26AC34;
}

.container_product {
    display: flex;
    width: min(77.778dvw, 1120px);
    height: fit-content;
    justify-content: center;
    padding-bottom: min(1.389dvw, 20px);
    gap: min(2.222dvw, 32px);
}

.wrapper_product {
    display: flex;
    width: min(57.778dvw, 832px);
    flex-direction: column;
    gap: min(2.778dvw, 40px);
}

.product_list {
    display: flex;
    flex-direction: column;
    gap: min(2.222dvw, 32px);
}


.link_page_container {
    display: flex;
    width: 100%;
    height: min(2.5dvw, 36px);
    justify-content: center;
    align-items: center;
}

.link_page_container ul {
    display: flex;
    /* width: 317px; */
    width: fit-content;
    height: fit-content;
    flex-direction: row;
    justify-content: space-around;
    gap: min(1.389dvw, 20px);
    flex-direction: row;
}

.link_page_container ul li {
    display: flex;
    width: min(2.778dvw, 40px);
    height: min(2.5dvw, 36px);
    list-style: none;
    justify-content: center;
    align-items: center;
}

.link_page_container ul li button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: min(0.278dvw, 4px);
    padding: min(0.556dvw, 8px) min(1.111dvw, 16px);
    cursor: pointer;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
    font-size: min(0.972dvw, 14px);
    letter-spacing: min(0.014dvw, 0.2px);
}

.link_page_container ul li button:hover {
    background-color: #fff;
    color: #26AC34;
}

.product_sold_out {
    display: flex;
    flex-direction: column;
    gap: min(2.222dvw, 32px);
}

.product_sold_out h5 {
    font-size: min(1.667dvw, 24px);
    font-weight: 700;
    color: #252525;
}

/* me not other user*/
.container_product_me{
    display: flex;
    width: min(77.778dvw, 1120px);
    height: fit-content;
    justify-content: center;
    padding-bottom: min(1.389dvw, 20px);
    gap: min(2.222dvw, 32px);
    flex-direction: column;
}
.product_list_me{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
}
.product_item_me{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
}
/* img */
.product_item_me .img_me{
    display: flex;
    width: 192px;
    height: 192px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #212121;
}
.product_item_me .img_me img{
    width: 120%;
    height: auto;
}
.product_item_me .detail_me{
    display: flex;
    width: 928px;
    max-width: 100%;
    height: 192px;
    /* max-height: 100%; */
    /* min-height: ; */
    justify-content: space-between;
    flex-direction: column;
    padding: 12px;
    
    box-shadow: 0px 1px 2px 0px #0000000F;

    /* box-shadow: 0px 1px 3px 0px #0000001A; */


}
/* info */
.info_me{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 12px;
}
.info_me .name_me {
    display: flex;
    width: 100%;
    max-width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
}
/* name and star */
.info_me .name_me>div:nth-child(1){
    display: flex;
    width: 780px;
    height: 32px;
    gap: 8px;
    justify-content: start;
    align-items: center;
    white-space: nowrap;
}
.info_me .name_me>div:nth-child(1) h5{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 20px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* operation */
.info_me .name_me>div:nth-child(2){
    display: flex;
    width: fit-content;
    height: 100%;
    gap: 8px;
}
.info_me .name_me>div:nth-child(2) button{
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.info_me .name_me>div:nth-child(2) button svg{
    width: 16px;
    height: auto;
}
.info_me .price_me{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: 24px;
    font-size: 16px;
    font-weight: 500;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info_me .discription_me{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 780px;
    max-width: 100%;
    height: fit-content;
    max-height: 40px;
    overflow: hidden;
    /* word-wrap: keep-all; */
}
/* stock */
.stock_me{
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-between;
    align-items: center;
}
.stock_me div{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: inherit;
    align-items: center;
    justify-self: start;
    gap: 12px;
}
.stock_me div h5{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color: #26AC34;
}
.stock_me div h6{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}
.stock_me h6{
    width: fit-content;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color: #212121;
}


@media (width<=744px) {
    .wrapper_profile {
        gap: min(2.688dvw, 20px);
    }

    .container_user_info {
        height: min(34.409dvw, 256px);
    }

    .big_image {
        height: min(25.806dvw, 192px);
    }

    .user {
        height: min(17.204dvw, 128px);
        gap: min(2.688dvw, 20px);
    }

    .user_img {
        width: min(17.204dvw, 128px);
        height: min(17.204dvw, 128px);
    }

    .user_info {
        width: min(68.28dvw, 508px);
    }

    .user_info h5 {
        height: min(4.839dvw, 36px);
        font-size: min(3.226dvw, 24px);
    }

    .user_info div {
        gap: min(1.613dvw, 12px);
    }

    .user_info div button {
        width: min(16.667dvw, 124px);
        height: min(5.376dvw, 40px);
        font-size: min(2.151dvw, 16px);
        border: min(0.134dvw, 1px) solid;
        border-radius: min(0.538dvw, 4px);
        padding: min(1.075dvw, 8px) min(1.613dvw, 12px);
    }

    .container_details {
        width: min(88.172dvw, 656px);
        gap: min(2.688dvw, 20px);
    }

    .container_details h5 {
        height: min(4.301dvw, 32px);
        font-size: min(2.688dvw, 20px);
    }

    .suplier_details {
        padding: min(2.151dvw, 16px);
        gap: min(1.613dvw, 12px);
        border-radius: min(0.538dvw, 4px);
    }

    .suplier_details div {
        gap: min(1.613dvw, 12px);
    }

    .suplier_details div div {
        width: min(26.882dvw, 200px);
        height: min(2.151dvw, 16px);
        gap: min(1.613dvw, 12px);
    }

    .suplier_details div div h6 {
        font-size: min(1.613dvw, 12px);
    }

    .container_product {
        width: min(88.172dvw, 656px);
        padding-bottom: min(2.688dvw, 20px);
        gap: min(2.151dvw, 16px);
    }

    .wrapper_product {
        width: min(65.591dvw, 488px);
        gap: min(2.688dvw, 20px);
    }

    .product_list {
        gap: min(2.688dvw, 20px);
    }

    .product_sold_out {
        gap: min(2.688dvw, 20px);

    }

    .product_sold_out h5 {
        font-size: min(2.688dvw, 20px);
    }

}

@media (width<=376px) {
    .wrapper_profile {
        gap: min(3.191dvw, 12px);
    }

    .container_user_info {
        height: min(61.702dvw, 232px);
    }

    .big_image {
        height: min(34.043dvw, 128px);
    }

    .user {
        width: min(100dvw, 376px);
        height: min(40.426dvw, 152px);
        gap: min(5.319dvw, 20px);
    }

    .user_img {
        position: absolute;
        width: min(25.532dvw, 96px);
        height: min(25.532dvw, 96px);
        left: min(4.255dvw, 16px);
        top: 0;
    }

    .user_info {
        flex-direction: column;
        justify-content: end;
        align-items: center;
        width: 100%;
        gap: min(3.191dvw, 12px);
    }

    .user_info h5 {
        width: 65%;
        height: min(9.574dvw, 36px);
        margin-left: 35%;
        font-size: min(6.383dvw, 24px);

    }

    .user_info div {
        gap: min(3.191dvw, 12px);
    }

    .user_info div button {
        width: min(44.149dvw, 166px);
        /* width: 100%; */
        height: min(9.574dvw, 36px);
        font-size: min(3.723dvw, 14px);
        border: min(0.266dvw, 1px) solid;
        border-radius: min(1.064dvw, 4px);
        padding: min(2.128dvw, 8px) min(3.191dvw, 12px);
    }

    .container_details {
        width: min(100dvw, 376px);
        gap: min(3.191dvw, 12px);
    }

    .recommedation {
        width: min(91.489dvw, 344px);
    }

    .recommedation h5 {
        width: min(91.489dvw, 344px);
        height: min(7.447dvw, 28px);
        font-size: min(4.787dvw, 18px);
    }

    .suplier_details {
        padding: min(4.255dvw, 16px);
        gap: min(3.191dvw, 12px);
        border-radius: 0px;
        justify-content: space-between;
    }

    .suplier_details div:nth-child(1) {
        width: 100%;
        flex-direction: row;
        gap: min(3.191dvw, 12px);
        justify-content: space-between;
    }

    .suplier_details div:nth-child(1) div {
        flex-direction: row;
        width: fit-content;
        height: min(4.255dvw, 16px);
        justify-content: center;
        gap: min(2.128dvw, 8px);
    }

    .suplier_details div:nth-child(1)>div:nth-child(3) {
        display: flex;
    }

    .suplier_details>div:nth-child(2),
    .suplier_details>div:nth-child(3) {
        display: none;
    }

    .suplier_details div div h6 {
        font-size: min(3.191dvw, 12px);
    }

    .container_product {
        width: min(100dvw, 376px);
        gap: min(3.191dvw, 12px);
        padding: 0px min(4.255dvw, 16px);
    }

    .wrapper_product {
        width: min(100dvw, 376px);
        gap: min(3.191dvw, 12px);
    }

    .product_list {
        gap: min(3.191dvw, 12px);
    }

    .product_sold_out {
        padding-bottom: min(4.255dvw, 16px);
        gap: min(3.191dvw, 12px);
    }

    .product_sold_out h5 {
        font-size: min(4.787dvw, 18px);
        text-align: center;
    }

}
</style>