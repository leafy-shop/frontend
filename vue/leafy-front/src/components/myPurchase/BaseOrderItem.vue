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
                <div class="product_img">
                    <img src="../../assets/vue.svg" alt="product_img">
                </div>
                <!-- info -->
                <div class="product_info">
                    <!-- detail -->
                    <div class="detail">
                        <h6>
                            {{ product.itemname }}
                        </h6>
                        <p>
                            <span>
                                Variation :
                            </span>
                            <span>
                                {{product.itemStyle}}
                            </span>
                        </p>
                    </div>
                    <div class="container_price_qty">
                        <!-- price each -->
                        <div class="price_each">
                            <h6 class="money_bath">
                                {{product.priceEach}}
                            </h6>
                        </div>
                        <!-- qty -->
                        <div class="qty">
                            <h6>
                                {{product.qtyOrder}}
                            </h6>
                        </div>
                        <!-- total price -->
                        <div class="price_total">
                            <h6 class="money_bath">
                                {{product.qtyOrder*product.priceEach}}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- order detail -->
        <div class="order_detail">
            <!-- info -->
            <div class="order_info">
                <p>
                    Order Total (
                    <span>
                        {{ props.orderDetail !== undefined ? props.orderDetail.length : 0 }}
                    </span> items) : 
                </p>
                <h6 class="money_bath">
                    <!-- ฿77.99 -->
                    
                    <span>
                        {{ props.orderTotal }}
                    </span>
                </h6>
            </div>
            <div class="container_btn">
                <!-- buy again -->
                <button class="buy_again">
                    Buy Again
                </button>
                <!-- view mt rating -->
                <button class="view_my_rating">
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
.money_bath::before{
    content:"฿"
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
    border-bottom: 1px solid;
    border-color: #EEEEEE;
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
/* product list */
.product_list{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 12px 20px 0px 20px;
    flex-direction: column;

}
.product_list .product_item{
    display: flex;
    width:100%;
    height: 64px;
    padding-bottom:12px ;
    align-items: center;
    border-bottom: 1px solid;
    border-color: #EEEEEE;
}
/* image */
.product_item .product_img{
    display: flex;
    width: 52px;
    height: 52px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: none;
    border-radius: 4px;
    background-color: #212121;
}
.product_item .product_img img{
    width: 100%;
    height: auto;
}
/* informatoin */
.product_item .product_info{
    display: flex;
    width: 100%;
    height: fit-content;
}
.product_info .detail{
    display: flex;
    width: 100%;
    min-width: 536px;
    /* max-width: 100%; */
    height: fit-content;
    min-height: 32px;
    padding: 6px 12px;
    flex-direction: column;
    gap: 4px;
}
/* detail item */
.detail h6{
    width: fit-content;
    max-width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.detail p{
    width: fit-content;
    max-width: 100%;
    height: 16px;
    font-size: 12px;
    font-weight: 400;
    color: #616161;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product_info .container_price_qty{
    display: flex;
    width:300px;
    height: fit-content;
    justify-content: center;
    align-items: center
}
/* price each*/
.product_info .price_each{
    display: flex;
    width: 100px;
    /* min-width: ; */
    height: 52px;
    padding: 16px 12px;
    justify-content: center;
    align-items: center;
}
.price_each h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#616161;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* qty */
.product_info .qty{
    display: flex;
    width: 100px;
    height: 52px;
    padding: 16px 12px;
    justify-content: center;
    align-items: center;
}
.qty h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#616161;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* total price */
.product_info .price_total{
    display: flex;
    width: 100px;
    height: 52px;
    padding: 16px 12px;
    justify-content: end;
    align-items: center;
}
.price_total h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#616161;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #212121;
    text-align: end;
}
/* order detail */
.order_detail{
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: end;
    align-items: center;
    gap: 20px;
    padding: 12px 20px
}
.order_detail .order_info{
    display: flex;
    width: fit-content;
    height: 20px;
    gap: 8px;
    align-items: center
}
.order_info p{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.order_info h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 700;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* button */
.order_detail .container_btn{
    display: flex;
    width:fit-content;
    height: 100%;
    gap: 8px;
}
.container_btn button{
    display: flex;
    width: fit-content;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
    /* border: none; */
    border-radius: 4px;
    padding: 8px 12px;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
}
.container_btn .buy_again{
    background-color: #26AC34;
    border: none;
    color: #fff;
}
.container_btn .view_my_rating{
    border: 1px solid;
    border-color: #E0E0E0;
    background-color: transparent;
}
</style>
