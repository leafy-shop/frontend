<script setup>
import {ref,onBeforeMount} from 'vue'
import fetch from '../../../JS/api'

// common attribute
const orderList=ref([])

const getOrders=async()=>{
    let inputData={
        sort:'desc'
    }
    let {status,data} = await fetch.getAllOrder(false,inputData)

    if(status){
        console.log(data)
        orderList.value=data.list
    }
}

onBeforeMount(async()=>{
    await getOrders()
})
</script>
<template>
    <div class="wrapper_all">
        <div class="wrapper_purchase">
            <div class="purchase">
                <!-- header -->
                <div class="header">
                    <!-- title list -->
                    <div class="title_list">
                        <ul>
                            <!-- all -->
                            <li>
                                <button>
                                    All
                                </button>
                            </li>
                            <!-- to pay -->
                            <li>
                                <button>
                                    To Pay
                                </button>
                            </li>
                            <!-- to ship -->
                            <li>
                                <button>
                                    To Ship
                                </button>
                            </li>
                            <!-- to recive -->
                            <li>
                                <button>
                                    To Recive
                                </button>
                            </li>
                            <!-- complete -->
                            <li>
                                <button>
                                    Complete
                                </button>
                            </li>
                            <!-- cancelled -->
                            <li>
                                <button>
                                    Cancelled
                                </button>
                            </li>
                            <!-- return refund -->
                            <li>
                                <button>
                                    Return Refun
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- search -->
                <div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_4096_42178" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666016 0.666748H16.8967V16.8976H0.666016V0.666748Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_4096_42178)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.78185 1.91675C4.99602 1.91675 1.91602 4.99591 1.91602 8.78175C1.91602 12.5676 4.99602 15.6476 8.78185 15.6476C12.5668 15.6476 15.6468 12.5676 15.6468 8.78175C15.6468 4.99591 12.5668 1.91675 8.78185 1.91675ZM8.78185 16.8976C4.30685 16.8976 0.666016 13.2567 0.666016 8.78175C0.666016 4.30675 4.30685 0.666748 8.78185 0.666748C13.2568 0.666748 16.8968 4.30675 16.8968 8.78175C16.8968 13.2567 13.2568 16.8976 8.78185 16.8976Z" fill="#757575"/>
                    </g>
                    <mask id="mask1_4096_42178" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="13" y="13" width="5" height="5">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3652 13.7559H17.5519V17.9348H13.3652V13.7559Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask1_4096_42178)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9271 17.9348C16.7679 17.9348 16.6079 17.874 16.4854 17.7523L13.5488 14.824C13.3046 14.5798 13.3038 14.184 13.5479 13.9398C13.7913 13.694 14.1871 13.6957 14.4321 13.9382L17.3688 16.8673C17.6129 17.1115 17.6138 17.5065 17.3696 17.7507C17.2479 17.874 17.0871 17.9348 16.9271 17.9348Z" fill="#757575"/>
                    </g>
                    </svg>
                    <input type="text">

                </div>
                <!-- content -->
                <div class="content_purchase">
                    <!-- product list earch shop-->
                    <div class="shop_list">
                        <!-- shop item -->
                        <div v-for="(shop,index) of orderList" :key="index" class="shop_item">
                            <!-- shop name and status -->
                            <div class="header_shop">
                                <!-- name and button -->
                                <div class="shop_name">
                                    <h5 >
                                        ShopName
                                    </h5>
                                    <!-- chat now -->
                                    <button>
                                        Chat now
                                    </button>
                                    <!-- view shop -->
                                    <button>
                                        View Shop
                                    </button>
                                </div>

                                <!-- status -->
                                <div>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="#9CA3AF"/>
                                    </svg>
                                    <h6>
                                        {{ shop.status }}
                                        <!-- To Ship -->
                                    </h6>

                                </div>
                            </div>   
                            <!-- product list -->
                            <div class="product_list">
                                <!-- product item -->
                                <div v-for="(product,index) of shop.order_details" class="product_item">
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
                                            {{ shop.order_details !== undefined ? shop.order_details.length : 0 }}
                                        </span> items) : 
                                    </p>
                                    <h6>
                                        <!-- ฿77.99 -->
                                        ฿
                                        <span>
                                            {{ shop.total }}
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}
.wrapper_all {
    overflow: hidden;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    /* gap: 24px; */
}
.wrapper_purchase{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
.purchase{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    gap: 24px;
}
</style>