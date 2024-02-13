<script setup>
import { useRoute } from 'vue-router';
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue';
import Basesortitem from '../components/shop_page/BaseSortItem.vue';
let {params}=useRoute()
const productList=[
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
]
const recommendProduct=[
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
]
// let id=params.id
</script>
<template>
    <!-- this is profile page {{ params.id }} -->
    <BaseMenu/>
    <div class="wrapper_profile">
        <!-- username & description -->
        <div>
            <!-- picture -->
            <div>
                <div class="cover_photo">
                    <img src="../assets/shop_p/shop_title.jpg" alt="title_img">
                </div>
                <img src="../assets/vue.svg" alt="soybean">
            </div>
            <!-- user img & username -->
            <div>
                <div>
                    <img src="../assets/icon/user_icon.png" alt="user_img">
                </div>
                <h5>
                    Username
                </h5>
                <!-- chat & follower -->
                <div>
                    <button>
                        Chat
                    </button>
                    <button>
                        Follower
                    </button>
                </div>
            </div>
            <!-- suplier detail -->
            <div class="suplier_detail">
                <!-- ratings -->
                <div>
                    <h6>
                        ratings
                    </h6>
                    <h6>
                        4
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
                <!-- follower -->
                <div>
                    <h6>
                        Follower
                    </h6>
                    <h6>
                        1
                    </h6>
                </div>
                <!-- products -->
                <div>
                    <h6>
                        products
                    </h6>
                    <h6>
                        5
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
                <!-- joined -->
                <div>
                    <h6>
                        Joined
                    </h6>
                    <h6>
                        2 days ago
                    </h6>
                </div>
            </div>
        </div>
    </div>
    <h5>
        Recommended for You
    </h5>
    <BaseProductList :product-list="recommendProduct"  :gridColumn="4"  />
    <!-- product list and filter -->
    <div class="container_product">
        <BaseFilterItem/>
        <div>
            <Basesortitem/>
            <BaseProductList :product-list="productList"  :gridColumn="3"  />
        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_profile{
    width: auto;
    height: fit-content;
}
.cover_photo {
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
.cover_photo img{
    
    /* opacity: 10%; */
    width: 100%;
    height: auto;
    /* top: -750px; */
    /* z-index: -1; */
}
.suplier_detail{
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: white;
}
.suplier_detail div{
    display: flex;
    justify-content: space-between;
}
.container_product{
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    align-items: start;
}
</style>