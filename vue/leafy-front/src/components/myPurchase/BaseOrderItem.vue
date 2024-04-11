<script setup>
import {ref} from 'vue'
const props=defineProps({
    shopName:{
        type:String,
        required:true,
        default:'ShopName'
    },
    orderStatus:{
        type:String,
        required:true,
        default:""
    },
    orderDetail:{
        type:Array,
        required:true,
        default:[]
    },
    orderTotal:{
        type:Number,
        required:true,
        default:0
    }
})
</script>
<template>
     <div  class="shop_item">
        <!-- shop name and status -->
        <div class="header_shop">
            <!-- name and button -->
            <div class="shop_name">
                <h5 >
                    {{props.shopName}}
                </h5>
                <div>
                    <!-- chat now -->
                    <button class="chat_now">
                        Chat now
                    </button>
                    <!-- view shop -->
                    <button class="view_shop">
                        View Shop
                    </button>
                </div>
            </div>

            <!-- status -->
            <div class="status">
                <div>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#212121"/>
                    </svg>
                </div>
                <h6>
                    {{ props.orderStatus }}
                    <!-- To Ship -->
                </h6>

            </div>
        </div>   
        <!-- product list -->
        <div class="product_list">
            <!-- product item -->
            <div v-if="props.orderDetail.length!=0" v-for="(product,index) of props.orderDetail" class="product_item">
                <!-- img -->
                <div>
                    <img src="../../assets/vue.svg" alt="product_img">
                </div>
                <!-- info -->
                <div>
                    {{ product.itemname }}
                    <!-- name and more wait for design -->
                </div>
            </div>
        </div>
        <!-- order detail -->
        <div class="order_detail">
            <!-- info -->
            <div class="order_info">
                <p>
                    Order Total(
                    <span>
                        {{ props.orderDetail !== undefined ? props.orderDetail.length : 0 }}
                    </span> items) : 
                </p>
                <h6>
                    <!-- ฿77.99 -->
                    ฿
                    <span>
                        {{ props.orderTotal }}
                    </span>
                </h6>
            </div>
            <div class="container_btn">
                <!-- buy again -->
                <button>
                    Buy Again
                </button>
                <!-- view mt rating -->
                <button>
                    View My Rating
                </button>

            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing:border-box;
}
.shop_item{
    display:flex;
    width:100%;
    height:fit-content;
    flex-direction:column;
    overflow:hidden;
    background-color:#fff;
    border:none;
    border-radius:8px;
    padding-top:20px;
}
/* header */
.header_shop{
    display:flex;
    width:100%;
    height:36px;
    padding:0px 20px 12px 20px;
    justify-content:space-between;
    align-items:center;
}
.header_shop .shop_name{
    display:flex;
    width:fit-content;
    height:100%;
    gap:8px;
    align-items:center;
}
.shop_name h5{
    width:fit-content;
    max-width:300px;
    height:fit-content;
    font-size:16px;
    font-weight:700;
    color:#212121;
    text-overflow:ellipsis;
    overflow:hidden;
}
.shop_name >div{
    display:flex;
    width:fit-content;
    height:fit-content;
    gap:8px;
}
.shop_name >div> button{
    display:flex;
    width:81px;
    height:24px;
    border:none;
    border-radius:4px;
    /* border-color:#26AC34; */
    padding:4px 12px;
    justify-content:center;
    align-items:center;
    white-space:nowrap;
    cursor:pointer;
    background-color:#fff;
    font-size:12px;
    font-weight:500;
    box-shadow: 0px 1px 2px 0px #0000000D;

}
.shop_name >div> .chat_now{
    border:1px solid;
    border-color:#26AC34;
    color:#26AC34;
}
.shop_name >div> .view_shop{
    border:1px solid;
    border-color:#E0E0E0;
    color:#212121;
}

.header_shop .status{
    display:flex;
    width:fit-content;
    height:100%;
    gap:8px;
    padding:2px 10px 2px 8px;
    justify-content:center;
    align-items:center;
    border:none;
    border-radius:10px;
    background-color:#E0E0E0;
}
.header_shop .status >div{
    display:flex;
    width:8px;
    height:8px;
    justify-content:center;
    align-items:center;
    
}
.header_shop .status >div svg{
    width:6px;
    height:6px;
}
.header_shop .status h6{
    width:fit-content;
    height:fit-content;
    font-size:12px;
    font-weight:500;
}
</style>
