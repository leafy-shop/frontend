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
let { params } = useRoute()
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

const eachSide = 3
const pageHidden = (currentP, total) => {

    for (let i = 1; i <= eachSide; i++) {
        // previous number
        // for taggle to show hidden number before
        if (currentP - (eachSide + (i - 1) * (-1)) <= 0) {
            document.getElementById(`preNumber_${i}`).setAttribute('style', 'display:none;')
        } else {
            document.getElementById(`preNumber_${i}`).setAttribute('style', 'display:flex;')
        }
        // console.log('current : '+currentP)
        // console.log('this is a '+(currentP+i))
        // next number
        if ((currentP + i) > total) {
            // console.log('cu 1')

            document.getElementById(`nextNumber_${i}`).setAttribute('style', 'display:none;')
        } else {
            // console.log('cu 2')

            document.getElementById(`nextNumber_${i}`).setAttribute('style', 'display:flex;')
        }
    }
}



const getProduct = async (page) => {
    // console.log(categoryFilter.value.join())
    // console.log(minFilter.value)
    // console.log(maxFilter.value)
    // console.log(ratingFilter.value)
    // console.log(tagFilter.value)
    // console.log(owner.value.email)

    // ownerid
    let ownerRes = await fetch.getStore(params.id)
    // console.log(data)
    owner.value = ownerRes.data

    let { status, data } = await fetch.getAllProduct(page, 18, searchItem.value, categoryFilter.value.join(),
        minFilter.value, maxFilter.value, ratingFilter.value, tagFilter.value, sortName.value, sort.value, owner.value.email)
    // console.log(data.list)
    // productList.value=data
    productList.value = data.list
    outStockList.value = data.outStock
    allItems.value = data.allItems
    totalPage.value = data.allPage

    let recommendRes = await fetch.getAllRecommendProduct(1, 18)
    recommendProduct.value = recommendRes.data.list
    console.log(recommendProduct.value)
    // totalPage.value=10
    validation.navigationTo()
}

// if change page input must be a number only
const changePage = async (number, n) => {
    // console.log(typeof(number))

    let status = validation.number(number, true)
    currentPage.value = status == true ? number : Math.abs(parseInt(number))

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
    currentPage.value = current > 1 ? current - 1 : 1
    await getProduct(currentPage.value)
    // validation.navigationTo(top)
}

const moveRight = async (current) => {
    currentPage.value = current < totalPage.value ? current + 1 : totalPage.value
    await getProduct(currentPage.value)
    // validation.navigationTo(top)
}

onBeforeMount(() => {
    getProduct(currentPage.value)
})
onMounted(() => {
    validation.navigationTo()
    pageHidden(currentPage.value, totalPage.value)
})
onUpdated(() => {
    pageHidden(currentPage.value, totalPage.value)
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

                <div class="link_page_container">
                    <ul>
                        <li @click="moveLeft(currentPage)" class="move_page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M13.207 5.29303C13.3945 5.48056 13.4998 5.73487 13.4998 6.00003C13.4998 6.26519 13.3945 6.5195 13.207 6.70703L9.91403 10L13.207 13.293C13.3892 13.4816 13.49 13.7342 13.4877 13.9964C13.4854 14.2586 13.3803 14.5094 13.1948 14.6948C13.0094 14.8803 12.7586 14.9854 12.4964 14.9877C12.2342 14.99 11.9816 14.8892 11.793 14.707L7.79303 10.707C7.60556 10.5195 7.50024 10.2652 7.50024 10C7.50024 9.73487 7.60556 9.48056 7.79303 9.29303L11.793 5.29303C11.9806 5.10556 12.2349 5.00024 12.5 5.00024C12.7652 5.00024 13.0195 5.10556 13.207 5.29303Z"
                                    fill="#424242" />
                            </svg>
                        </li>
                        <!-- prevoius -->
                        <li v-for="(link, index) of eachSide" :key="index" :id="`preNumber_${link}`">
                            <button @click="changePage(currentPage - (eachSide + (link - 1) * (-1)))">
                                {{ currentPage - (eachSide + (link - 1) * (-1)) }}
                            </button>
                        </li>
                        <!-- current -->
                        <li class="current_page">
                            <button>
                                {{ currentPage }}
                            </button>
                        </li>
                        <!-- next -->
                        <li v-for="(link, index) of eachSide" :key="index" :id="`nextNumber_${link}`">
                            <button @click="changePage(currentPage + link)">
                                {{ currentPage + link }}
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
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.79303 14.707C7.60556 14.5195 7.50024 14.2652 7.50024 14C7.50024 13.7349 7.60556 13.4806 7.79303 13.293L11.086 10L7.79303 6.70704C7.61087 6.51844 7.51008 6.26584 7.51236 6.00364C7.51463 5.74144 7.6198 5.49063 7.80521 5.30522C7.99062 5.11981 8.24143 5.01465 8.50363 5.01237C8.76583 5.01009 9.01843 5.11088 9.20703 5.29304L13.207 9.29304C13.3945 9.48057 13.4998 9.73488 13.4998 10C13.4998 10.2652 13.3945 10.5195 13.207 10.707L9.20703 14.707C9.0195 14.8945 8.76519 14.9998 8.50003 14.9998C8.23487 14.9998 7.98056 14.8945 7.79303 14.707Z"
                                    fill="#424242" />
                            </svg>
                        </li>
                    </ul>
                </div>

                <div class="product_sold_out">
                    <h5>
                        Sold Out
                    </h5>
                    <BaseProductList :product-list="outStockList" :gridColumn="3" :sold-out="true" />
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