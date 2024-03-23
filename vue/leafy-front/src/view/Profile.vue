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
let { params } = useRoute()
const id =ref(validation.decrypt(params.id))
// const productList=[
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
//     {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
// ]
// const recommendProduct = [
//     { itemId: 300040, name: "small zee cactus", itemOwner: "piraphat123@gmail.com", type: "cactus", totalRating: 0, sold: 0, minPrice: "32.00", updatedAt: "1/10/2024, 14:42:15" },
//     { itemId: 300040, name: "small zee cactus", itemOwner: "piraphat123@gmail.com", type: "cactus", totalRating: 0, sold: 0, minPrice: "32.00", updatedAt: "1/10/2024, 14:42:15" },
//     { itemId: 300040, name: "small zee cactus", itemOwner: "piraphat123@gmail.com", type: "cactus", totalRating: 0, sold: 0, minPrice: "32.00", updatedAt: "1/10/2024, 14:42:15" },
//     { itemId: 300040, name: "small zee cactus", itemOwner: "piraphat123@gmail.com", type: "cactus", totalRating: 0, sold: 0, minPrice: "32.00", updatedAt: "1/10/2024, 14:42:15" },
// ]
// owner
const owner = ref({})

// category list
const categoryFilter = ref([])
// price
const minFilter = ref(undefined)
const maxFilter = ref(undefined)
// rating
const ratingFilter = ref(0)
// tag
const tagFilter = ref("")
// this for check if we have params 
const searchItem = ref("")
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

const sortTypeArr = [
    { name: "Popular", value: { name: "popular", type: 'desc' } },
    { name: "New Arrival", value: { name: "new_arrival", type: 'desc' } },
    { name: "Top Sales", value: { name: "sales", type: 'desc' } },
    { name: "Low - High", value: { name: "price", type: 'asc' } },
    { name: "High - Low", value: { name: "price", type: 'desc' } },
]

// const getSearchItem = async (search) => {
//     // currentPage.value=1
//     console.log(search)
//     // searchItem.value = search
//     // await getProduct(currentPage.value)
// }

const getStore =async()=>{
    let {status,data}= await fetch.getStore(id.value)
    console.log(data,"Testing store")
    owner.value = data
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
        limitP: 18,
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
                        <!-- chat & follower -->
                        <div>
                            <button>
                                Chat Now
                            </button>
                            <button>
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- detail and recommend -->
        <div class="wrapper_details">
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
                <div class="recommedation">
                    <!-- recommendation -->
                    <h5>
                        Recommended for You
                    </h5>
                    <BaseProductList :product-list="recommendProduct" :gridColumn="4" />
                </div>
            </div>
        </div>

        <!-- product list and filter -->
        <div class="container_product">
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
    gap: min(1.389dvw, 20px);
    background-color: #F5F5F5;
    justify-content: center;
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
    width: min(8.611dvw, 124px);
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
}

.user_info div button:hover {
    border-color: #26AC34;
    color: #fff;
    background-color: #26AC34;
}

.user_info div button:active {
    background-color: #58d264;
    border-color: #58d264;
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