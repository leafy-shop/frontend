<script setup>
import {ref,onBeforeMount,onMounted} from 'vue'
import fetch from '../../../JS/api'
import BaseOrderItem from '../../../components/myPurchase/BaseOrderItem.vue'
import ORDERSTATUS from '../../../JS/enum/order'
import BaseSelectPage from '../../../components/BaseSelectPage.vue'
import {useRouter} from 'vue-router'
import validation from '../../../JS/validation'
import BaseAlert from '../../../components/BaseAlert.vue'
import BaseEmptyList from '../../../components/BaseEmptyList.vue'
import BaseOrderGroup from '../../../components/myPurchase/BaseOrderGroup.vue'
// link
const myRouter=useRouter()
const goPurchaseDetail=(orderId)=>myRouter.push({name:'MyPurchaseDetail',params:{id:orderId}})
const goProfile =(shopName)=>myRouter.push({name:'Profile',params:{id:shopName}})

// common attribute
const orderList=ref([])
const searchText=ref("")
// move page attribute
const currentPage=ref(1)
const allPage=ref()
// filter attribute
const filterStatus=ref(undefined)

// alert
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(3)

// get status
const getDataStatus=ref(undefined)

const getOrders=async()=>{
    getDataStatus.value=undefined
    let inputData={
        // sort:'desc',
        page:currentPage.value,
        // status:
        // ownerItemOrProduct:'Somying',
    }
    if(filterStatus.value!="ALL"){
        inputData["status"]=filterStatus.value
    }
    if(searchText.value.length!=0){
        inputData["search"]=searchText.value
    }
    let {status,data} = await fetch.getAllOrder(false,inputData)
    // isShowAlert.value=await status
    if(await status){
        console.log(data)
        orderList.value=await data.list
        allPage.value=await data.allPage
        if(await data.list.length==0){
            getDataStatus.value=false
        }else{
            getDataStatus.value=true
        }
        
    }else{
        // error
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertType.value=1
        isShowAlert.value=true
        alertTime.validation=10
        getDataStatus.value=false
    }
}

//filter
const filterOrder=(name,orderStatus="ALL")=>{
    currentPage.value=1
    let element=document.getElementById(name)
    let allElement=document.getElementsByClassName('sort_item')
    // clear first
    for(let element of allElement){
         element.classList.remove("sort_item_active")
    }
    if(orderStatus=="ALL"){
        filterStatus.value=orderStatus
        element.classList.add("sort_item_active")
    }else
    if(orderStatus==ORDERSTATUS.REQUIRED){ // to ship
        filterStatus.value=orderStatus
        element.classList.add("sort_item_active")

    }else
    if(orderStatus==ORDERSTATUS.PENDING){ // to ship
        filterStatus.value=orderStatus
        element.classList.add("sort_item_active")

    }else
    if(orderStatus==ORDERSTATUS.INPROGRESS){ //to ship
        filterStatus.value=orderStatus
        element.classList.add("sort_item_active")

    }else
    if(orderStatus==ORDERSTATUS.COMPLETED){
        filterStatus.value=orderStatus
        element.classList.add("sort_item_active")

    }else
    if(orderStatus==ORDERSTATUS.CANCELED){
        filterStatus.value=orderStatus
        element.classList.add("sort_item_active")

    }
    getOrders()
}




// search
const clearSearch =async()=>{
    searchText.value=""
    await getOrders()

}

// move page
const moveLeft=async(input)=>{
    currentPage.value=input
    console.log(input)
    await getOrders()
}
const moveRight=async(input)=>{
    currentPage.value=input
    console.log(input)
    await getOrders()
}
const getCurrentPage=async(input)=>{
    currentPage.value=input
    await getOrders()
}

// 
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    // setTimeout(()=>isShowAlert.value=false,second*1000)
}


onBeforeMount(async()=>{
    // await getOrders()
})
onMounted(async()=>{
    await filterOrder('filter_all')
})
</script>
<template>
    <!-- <div class="wrapper_all"> -->
        <div class="wrapper_purchase">
            <div class="purchase">
                <!-- header -->
                <div class="header_purchase">
                    <!-- title list -->
                    <!-- <div class="title_list"> -->
                        <ul>
                            <!-- all -->
                            <li> <!-- isShowAlert=true-->
                                <button @click="filterOrder('filter_all')" id="filter_all" class="sort_item sort_item_active">
                                    All
                                </button>
                            </li>
                            <!-- to pay -->
                            <li>
                                <button @click="filterOrder('filter_required',ORDERSTATUS.REQUIRED)" id="filter_required" class="sort_item">
                                    To Pay
                                </button>
                            </li>
                            <!-- to ship -->
                            <li>
                                <button @click="filterOrder('filter_pending',ORDERSTATUS.PENDING)" id="filter_pending" class="sort_item">
                                    To Ship
                                </button>
                            </li>
                            <!-- to recive -->
                            <li>
                                <button @click="filterOrder('filter_in_progress',ORDERSTATUS.INPROGRESS)" id="filter_in_progress" class="sort_item">
                                    To Recive
                                </button>
                            </li>
                            <!-- complete -->
                            <li>
                                <button @click="filterOrder('filter_complete',ORDERSTATUS.COMPLETED)" id="filter_complete" class="sort_item">
                                    Complete
                                </button>
                            </li>
                            <!-- cancelled -->
                            <li>
                                <button @click="filterOrder('filter_canceled',ORDERSTATUS.CANCELED)" id="filter_canceled" class="sort_item">
                                    Cancelled
                                </button>
                            </li>
                            <!-- return refund -->
                            <!-- <li>
                                <button>
                                    Return Refun
                                </button>
                            </li> -->
                        </ul>
                    <!-- </div> -->
                </div>
                <!-- search -->
                <div class="search_purchase">
                    <label for="search_purchase_input" class="icon">
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
                    </label>
                    <input type="text" v-model="searchText" @keyup.enter="getOrders()" id="search_purchase_input" placeHolder="Search by Seller name or Product name">
                    <div v-show="searchText.length!=0" @click="clearSearch " class="icon">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.293031 1.29308C0.480558 1.10561 0.734866 1.00029 1.00003 1.00029C1.26519 1.00029 1.5195 1.10561 1.70703 1.29308L6.00003 5.58608L10.293 1.29308C10.3853 1.19757 10.4956 1.12139 10.6176 1.06898C10.7396 1.01657 10.8709 0.988985 11.0036 0.987831C11.1364 0.986677 11.2681 1.01198 11.391 1.06226C11.5139 1.11254 11.6255 1.18679 11.7194 1.28069C11.8133 1.37458 11.8876 1.48623 11.9379 1.60913C11.9881 1.73202 12.0134 1.8637 12.0123 1.99648C12.0111 2.12926 11.9835 2.26048 11.9311 2.38249C11.8787 2.50449 11.8025 2.61483 11.707 2.70708L7.41403 7.00008L11.707 11.2931C11.8892 11.4817 11.99 11.7343 11.9877 11.9965C11.9854 12.2587 11.8803 12.5095 11.6948 12.6949C11.5094 12.8803 11.2586 12.9855 10.9964 12.9878C10.7342 12.99 10.4816 12.8892 10.293 12.7071L6.00003 8.41408L1.70703 12.7071C1.51843 12.8892 1.26583 12.99 1.00363 12.9878C0.741432 12.9855 0.49062 12.8803 0.305212 12.6949C0.119804 12.5095 0.0146347 12.2587 0.0123563 11.9965C0.0100779 11.7343 0.110873 11.4817 0.293031 11.2931L4.58603 7.00008L0.293031 2.70708C0.10556 2.51955 0.000244141 2.26525 0.000244141 2.00008C0.000244141 1.73492 0.10556 1.48061 0.293031 1.29308Z" fill="#757575"/>
                        </svg>
                    </div>
                </div>
                <!-- content -->
                <div class="content_purchase">
                    <!-- product list earch shop-->
                    <BaseEmptyList name="my_purchase_list" title="You don’t have order yet." :showEmpty="getDataStatus" />

                    <div v-if="getDataStatus==true" class="shop_list">
                        <!-- shop item -->
                        <!-- <div v-for="(shop,index) of orderList"  :key=index >
                            <BaseOrderItem name="purchase" :orderId="shop.orderId"  :shopName="shop.itemOwner" :orderStatus="shop.status"
                            :orderDetail="shop.order_details" :orderTotal="shop.total" @goPurchaseDetail="goPurchaseDetail" @goProfile="goProfile(shop.itemOwner)" @refresh-data="getOrders" />
                        </div> -->
                        <div v-for="(shop,index) of orderList" :key="index">
                            <BaseOrderGroup v-if="shop.orders!=undefined" name="purchase" :orderList="shop.orders" :orderGroupId="shop.orderGroupId"   
                            :order-group-total="shop.total" :order-group-all-item="shop.totalQty"  @refreshData="getOrders" />
                            
                            <BaseOrderItem v-else name="purchase" :orderId="shop.orderId"  :shopName="shop.itemOwner" :orderStatus="shop.status"
                            :orderDetail="shop.order_details" :orderTotal="shop.total" @goPurchaseDetail="goPurchaseDetail" @goProfile="goProfile(shop.itemOwner)" @refresh-data="getOrders" />
                        </div>
                    </div>
                </div>
                <!-- move page -->
                <BaseSelectPage v-if="getDataStatus==true" name="my_purchase_select_page" :current-page="currentPage" :total-page="allPage" @change-page="getCurrentPage" @move-left="moveLeft" @move-right="moveRight" />
            </div>
            <!-- alert  :show-alert="isShowAlert"-->
            <BaseAlert name="purchase_list" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange" />
        </div>
    <!-- </div> -->
</template>
<style scoped>
* {
    box-sizing: border-box;
}
.header_purchase .sort_item_active{
    border-bottom: 2px solid #26AC34 ;
    color: #212121;
}
/* .wrapper_all {
    overflow: hidden;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    gap: 24px;
} */
.wrapper_purchase{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: 24px;
    position:relative;
}
.purchase{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 16px;
}
/* header */
.header_purchase{
    display:flex;
    width:100%;
    height:52px;
    justify-content:center;
    align-items:center;
    border:none;
    border-radius:8px;
    box-shadow: 0px 1px 3px 0px #0000001A;
    background-color:#fff;
    overflow:hidden;
}
.header_purchase ul{
    display:flex;
    width:100%;
    height:100%;
    list-style: none;
    justify-content:center;
    align-items:center;
}
.header_purchase ul li{
    display:flex;
    width:100%;
    height:100%;
}
.header_purchase ul li button{
    display:flex;
    width:100%;
    min-width:132px;
    height:100%;
    border:none;
    /* border-width: 0px 0px 2px 0px; */
    justify-content:center;
    align-items:center;
    font-size:14px;
    font-weight:500;
    color:#9E9E9E;
    cursor:pointer;
    background-color:transparent;
}
/* search */
.search_purchase{
    display:flex;
    width:100%;
    height:40px;
    padding:8px 12px;
    gap:12px;
    background-color:#EEEEEE;
    overflow:hidden;
    border:none;
    border-radius:8px;
    align-items:center;
}
.search_purchase:focus-within{
    outline:auto;
}
.search_purchase .icon{
    display:flex;
    width:20px;
    height:20px;
    justify-content:center;
    align-items:center;
    cursor:pointer
}
.search_purchase .icon svg{
    width:16px;
    height:auto;
}
.search_purchase input{
    display:flex;
    width:100%;
    height:100%;
    outline:none;
    border:none;
    background-color:transparent;
    color:#757575;
    font-size:16px;
    font-weight:400;
}
/* content */
.content_purchase{
    display:flex;
    width:100%;
    /* max-width:100%; */
    height:fit-content;
    max-height:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.shop_list{
    display:flex;
    width:100%;
    height:fit-content;
    max-height:100%;
    flex-direction:column;
    gap:16px;
}



</style>