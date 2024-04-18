<script setup>
import {ref,onBeforeMount,onMounted,onUpdated} from 'vue'
import BaseOrderItem from '../../../components/myPurchase/BaseOrderItem.vue';
import BaseBankItemList from '../../../components/bank/BaseBankItemList.vue';
import {useRouter,useRoute} from 'vue-router'
import validation from '../../../JS/validation'
import fetch from '../../../JS/api'
import ORDERSTATUS from '../../../JS/enum/order';
import BaseAlert from '../../../components/BaseAlert.vue';
// link

const myRouter=useRouter()
const goMyPurchase=()=>myRouter.push({name:'MyPurchase'})
const goProfile =(shopName)=>myRouter.push({name:'Profile',params:{id:shopName}})

// common attribute
let {params} =useRoute()
const orderId=ref('')
const orderDetail=ref({})
const address =ref('')
const isCancel=ref(false)
// step element
const orderStatusIndex=ref(-1)

// step information
const placeDate=ref(undefined)
const paidDate=ref(undefined)
const shippedDate=ref(undefined)
const receivedDate=ref(undefined)
const rateDate=ref(undefined)
const calcelDate=ref(undefined)

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// getOrder
const getOrderDetail=async()=>{
    let inputData={
        orderId:orderId.value
    }
    let{status,data}=await fetch.getAllOrder(false,inputData)
    if(await status){
        console.log(data)
        orderDetail.value=await data
        address.value=await data.address
        checkOrderStatus()

        let{
            createdAt,
            paidOrderDate,
            shippedOrderDate,
            receivedOrderDate,
            rateOrderDate
        }= await data
        placeDate.value=createdAt
        paidDate.value=paidOrderDate
        shippedDate.value=shippedOrderDate
        receivedDate.value=receivedOrderDate
        rateDate.value=rateOrderDate
        // calcelDate
        // assign index of order status 
        if(await data.status!="canceled"){
            let arrayValue=Object.values(ORDERSTATUS)
            orderStatusIndex.value=arrayValue.indexOf(orderDetail.value.status)
            if(await rateOrderDate!=undefined){// เพิ่มค่า หากมีการรีวิวแล้ว
                orderStatusIndex.value+=1
            }
            activeStatus(orderStatusIndex.value)
        }
        // step date
        
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}
// for check cancel status
const checkOrderStatus=()=>{
    if(orderDetail.value.status==ORDERSTATUS.CANCELED){
        isCancel.value=true
    }else{
        isCancel.value=false
    }
}

// for 
const activeStatus=(number)=>{
    let allStepElement=document.getElementsByClassName('step_element')
    let allStepLine=document.getElementsByClassName('line_step')
    for(let i=0;i<=number;i++){//element first
        allStepElement[i].classList.add('step_element_active')
    }
    for(let i=0;i<=number-1;i++){//element first
        allStepLine[i].classList.add('step_line_active')
    }
}

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onUpdated(()=>{
    if(orderDetail.value.status!="canceled"&&orderStatusIndex.value!=-1){
        activeStatus(orderStatusIndex.value)
    }
})

onMounted(()=>{
    
    // let statusIndex = arrayValue.map(x=>{
    //     if(x==orderDetail.value.status){
    //         return arrayValue.indexOf(x)
    //     }
    // })
    // arrayValue.indexOf(orderDetail.value.status)
    // console.log(arrayValue)
    // console.log(orderDetail.value)
    // activeStatus(statusIndex)
})

onBeforeMount(async()=>{
    orderId.value=params.id
    
    await getOrderDetail()

    
})
</script>
<template>
    <div class="wrapper_purchase_detail">
        <div class="container_purchase_detail">
            <!-- transition -->
            <div class="purchase_transition">
                <div class="header_transition">
                    <!-- back btn -->
                    <button @click="goMyPurchase" class="back_btn">
                        <div>
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.70679 0.293031C5.89426 0.480558 5.99957 0.734866 5.99957 1.00003C5.99957 1.26519 5.89426 1.5195 5.70679 1.70703L2.41379 5.00003L5.70679 8.29303C5.88894 8.48163 5.98974 8.73423 5.98746 8.99643C5.98518 9.25863 5.88001 9.50944 5.6946 9.69485C5.5092 9.88026 5.25838 9.98543 4.99619 9.9877C4.73399 9.98998 4.48139 9.88919 4.29279 9.70703L0.292787 5.70703C0.105316 5.5195 0 5.26519 0 5.00003C0 4.73487 0.105316 4.48056 0.292787 4.29303L4.29279 0.293031C4.48031 0.10556 4.73462 0.000244141 4.99979 0.000244141C5.26495 0.000244141 5.51926 0.10556 5.70679 0.293031Z" fill="#212121"/>
                            </svg>
                        </div>
                        <h6>
                            Back
                        </h6>
                    </button>
                    <div class="container_order_id_stauts">
                        <!-- order id -->
                        <h6>
                            Order ID: 
                            <span>
                                {{ orderDetail.orderId }}                                
                            </span>
                            <!-- <span>
                                {{placeDate}}
                            </span> -->
                        </h6>
                        
                        <!-- status -->
                        <!-- <div>
                            <div>
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3" cy="3" r="3" fill="#212121"/>
                                </svg>
                            </div>
                            <h6>
                                Complete
                            </h6>
                        </div> -->
                    </div>
                </div>
                <!-- if status cancel  -->
                <div v-if="isCancel" class="transition_detail_calcel">
                    <h6>
                        Cancellation Completed
                    </h6>
                    <p v-show="calcelDate!=undefined">
                        {{calcelDate}}
                    </p>
                </div>
                <!-- detail -->
                <div v-else class="transition_detail">
                    <!-- icon -->
                    <div class="step_list">
                        <!-- placed step -->
                        <div class="step_item ">
                            <!-- circle -->
                            <div class="circle step_element">
                                <div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6668 17.4939L13.3335 15.8272L10.0002 17.4997L6.66683 15.8272L3.3335 17.4939V4.16056C3.3335 3.23973 4.07933 2.4939 5.00016 2.4939H15.0002C15.921 2.4939 16.6668 3.23973 16.6668 4.16056V17.4939Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.66699 5.82731H13.3337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.66699 9.16056H13.3337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.66699 12.4938H10.8337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <!-- line -->
                        <hr class="line_step ">
                        <!-- paid step -->
                        <div class="step_item ">
                            <div class="circle step_element">
                                <div>
                                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2118 16.6607H4.78766C3.156 16.6607 1.8335 15.3382 1.8335 13.7057V6.28239C1.8335 4.64989 3.156 3.32739 4.78766 3.32739H17.2118C18.8435 3.32739 20.1668 4.64989 20.1668 6.28239V13.7057C20.1668 15.3382 18.8435 16.6607 17.2118 16.6607Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.3332 7.38906C19.0665 7.45739 18.7873 7.49406 18.4998 7.49406C16.659 7.49406 15.1665 6.00156 15.1665 4.16073C15.1665 3.87323 15.2032 3.59406 15.2715 3.32739" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M2.6665 12.5989C2.93317 12.5306 3.21234 12.4939 3.49984 12.4939C5.34067 12.4939 6.83317 13.9864 6.83317 15.8272C6.83317 16.1147 6.7965 16.3947 6.72817 16.6614" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.0002 5.82739V7.49406" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.0002 12.4939V14.1606" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.33333 12.4939H12.25C12.94 12.4939 13.5 11.9339 13.5 11.2439V11.2439C13.5 10.5539 12.94 9.9939 12.25 9.9939H11H9.75C9.06 9.9939 8.5 9.4339 8.5 8.7439V8.7439C8.5 8.0539 9.06 7.4939 9.75 7.4939H12.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <!-- line -->
                        <hr class="line_step ">
                        <!-- order shipped out step -->
                        <div class="step_item ">
                            <div class="circle step_element">
                                <div>
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.83333 10.3334V2.00008C9.83333 1.77907 9.74554 1.56711 9.58926 1.41083C9.43297 1.25455 9.22101 1.16675 9 1.16675H2.33333C2.11232 1.16675 1.90036 1.25455 1.74408 1.41083C1.5878 1.56711 1.5 1.77907 1.5 2.00008V10.3334C1.5 10.5544 1.5878 10.7664 1.74408 10.9227C1.90036 11.079 2.11232 11.1667 2.33333 11.1667H3.16667M9.83333 10.3334C9.83333 10.5544 9.74554 10.7664 9.58926 10.9227C9.43297 11.079 9.22101 11.1667 9 11.1667H6.5M9.83333 10.3334V3.66675C9.83333 3.44573 9.92113 3.23377 10.0774 3.07749C10.2337 2.92121 10.4457 2.83341 10.6667 2.83341H12.8217C13.0427 2.83346 13.2546 2.92129 13.4108 3.07758L16.2558 5.92258C16.4121 6.07883 16.5 6.29075 16.5 6.51175V10.3334C16.5 10.5544 16.4122 10.7664 16.2559 10.9227C16.0996 11.079 15.8877 11.1667 15.6667 11.1667H14.8333M9.83333 10.3334C9.83333 10.5544 9.92113 10.7664 10.0774 10.9227C10.2337 11.079 10.4457 11.1667 10.6667 11.1667H11.5M3.16667 11.1667C3.16667 11.6088 3.34226 12.0327 3.65482 12.3453C3.96738 12.6578 4.39131 12.8334 4.83333 12.8334C5.27536 12.8334 5.69928 12.6578 6.01184 12.3453C6.3244 12.0327 6.5 11.6088 6.5 11.1667M3.16667 11.1667C3.16667 10.7247 3.34226 10.3008 3.65482 9.98824C3.96738 9.67568 4.39131 9.50008 4.83333 9.50008C5.27536 9.50008 5.69928 9.67568 6.01184 9.98824C6.3244 10.3008 6.5 10.7247 6.5 11.1667M14.8333 11.1667C14.8333 11.6088 14.6577 12.0327 14.3452 12.3453C14.0326 12.6578 13.6087 12.8334 13.1667 12.8334C12.7246 12.8334 12.3007 12.6578 11.9882 12.3453C11.6756 12.0327 11.5 11.6088 11.5 11.1667M14.8333 11.1667C14.8333 10.7247 14.6577 10.3008 14.3452 9.98824C14.0326 9.67568 13.6087 9.50008 13.1667 9.50008C12.7246 9.50008 12.3007 9.67568 11.9882 9.98824C11.6756 10.3008 11.5 10.7247 11.5 11.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <!-- line -->
                        <hr class="line_step ">
                        <!-- received shipped out step -->
                        <div class="step_item ">
                            <div class="circle step_element">
                                <div>
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.66683 2.33333H3.00016C2.55814 2.33333 2.13421 2.50893 1.82165 2.82149C1.50909 3.13405 1.3335 3.55797 1.3335 4V14C1.3335 14.442 1.50909 14.866 1.82165 15.1785C2.13421 15.4911 2.55814 15.6667 3.00016 15.6667H13.0002C13.4422 15.6667 13.8661 15.4911 14.1787 15.1785C14.4912 14.866 14.6668 14.442 14.6668 14V4C14.6668 3.55797 14.4912 3.13405 14.1787 2.82149C13.8661 2.50893 13.4422 2.33333 13.0002 2.33333H11.3335M8.00016 1.5V8.16667M8.00016 8.16667L10.5002 5.66667M8.00016 8.16667L5.50016 5.66667M1.3335 9.83333H3.4885C3.70949 9.83338 3.92142 9.92121 4.07766 10.0775L6.08933 12.0892C6.24557 12.2455 6.4575 12.3333 6.6785 12.3333H9.32183C9.54283 12.3333 9.75475 12.2455 9.911 12.0892L11.9227 10.0775C12.0789 9.92121 12.2908 9.83338 12.5118 9.83333H14.6668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <!-- line -->
                        <hr class="line_step ">
                        <!-- received shipped out step -->
                        <div class="step_item ">
                            <div class="circle step_element">
                                <div>
                                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5L11.3175 6.16333L16.5 6.91083L12.75 10.5408L13.635 15.6667L9 13.2467L4.365 15.6667L5.25 10.5408L1.5 6.91083L6.6825 6.16333L9 1.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- text -->
                    <div class="step_detail">
                        <!-- order placed step -->
                        <div class="step_item ">
                            <div>
                                <h6>
                                    Order Placed
                                </h6>
                                <p v-show="placeDate!=undefined">
                                    {{placeDate}}
                                </p>
                            </div>
                        </div>
                        <!-- order placed step -->
                        <div class="step_item ">
                            <div>
                                <h6>
                                    Order Paid
                                </h6>
                                <p v-show="paidDate!=undefined">
                                    {{paidDate}}
                                </p>
                            </div>
                        </div>
                        <!-- order placed step -->
                        <div class="step_item ">
                            <div>
                                <h6>
                                    Order Shipped Out
                                </h6>
                                <p v-show="shippedDate!=undefined">
                                    {{shippedDate}}
                                </p>
                            </div>
                        </div>
                        <!-- order placed step -->
                        <div class="step_item ">
                            <div>
                                <h6>
                                    Order Received
                                </h6>
                                <p v-show="receivedDate!=undefined">
                                    {{receivedDate}}
                                </p>
                            </div>
                        </div>
                        <!-- order placed step -->
                        <div class="step_item ">
                            <div>
                                <h6>
                                    Order Rated
                                </h6>
                                <p v-show="rateDate!=undefined">
                                    {{rateDate}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- deliver address -->
            <div class="deliver_address">
                <h6 class="header_address">
                    Delivery Address
                </h6>
                <!-- <BaseBankItemList name="address_purchase_detail" :is-default="true" :show-edit-btn="false" :show-default-icon="false" :data-list="[{}]"  /> -->
                <p>
                    {{ address }}
                </p>
            </div>
            <!-- order detail -->
            <BaseOrderItem name="my_purchase_detail" :shop-name="orderDetail.itemOwner" :order-status="orderDetail.status" :isDisabled="true"
            :orderId="orderDetail.orderId" :order-detail="orderDetail.order_details" :order-total="orderDetail.total" @goProfile="goProfile(orderDetail.itemOwner)"/>
        </div>
        <BaseAlert name="purchase_detail_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
    </div>

</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_purchase_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
}
.container_purchase_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.purchase_transition{
    display: flex;
    width: 100%;
    /* height: 220px; */
    height: fit-content;
    background-color: #fff;
    border: none;
    border-radius: 8px;
    gap: 20px;
    padding: 20px;
    box-shadow: 0px 1px 2px 0px #0000000F;
    flex-direction: column;
    align-items: center;
}
/* header */
.purchase_transition .header_transition{
    display: flex;
    width: 100%;
    height: 56px;
    padding-bottom: 20px;
    border-bottom: 1px solid;
    border-color: #EEEEEE;
    align-items: center;
    justify-content: space-between;
}
/* back button */
.header_transition .back_btn{
    display: flex;
    width: fit-content;
    height: 36px;
    border: 1px solid;
    border-radius: 4px;
    border-color: #E0E0E0;
    gap: 4px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 2px 0px #0000000D;
    background-color: transparent;
    cursor: pointer;
}
.back_btn> div{
    display: flex;
    width: 20px ;
    height: 20px;
    justify-content: center;
    align-items: center;
}
.back_btn >div svg{
    width: 6px;
    height: auto;
}
.back_btn h6{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
}
/* order id */
.header_transition .container_order_id_stauts{
    display: flex;
    width: fit-content;
    height: 20px;
    gap: 12px;
    justify-content: end;
    align-items: center;
}
.container_order_id_stauts >h6{
    /* display: flex; */
    width: fit-content;
    max-width: 40dvw;
    height: fit-content;
    padding-right: 12px;
    border-right: 1px solid #E0E0E0;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
    gap: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* order status */
.container_order_id_stauts >div{
    display: flex;
    width: fit-content;
    height: 100%;
    gap: 6px;
    padding: 2px 10px 2px 8px;
    border: none;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: #E0E0E0;
}
.container_order_id_stauts >div> div{
    display: flex;
    width: 8px;
    height: 8px;
    justify-content: center;
    align-items: center;
}
.container_order_id_stauts >div> div svg{
    width:6px;
    height: auto;
}
.container_order_id_stauts >div> div h6{
    width: fit-content;
    height: fit-content;
    color: #212121;
    font-size: 12px;
    font-weight: 500;
}
/* detail step icon*/
.purchase_transition .transition_detail{
    display: flex;
    width: 816px;
    height: fit-content;
    flex-direction: column;
    gap: 20px;
}
.transition_detail .step_list{
    display: flex;
    width:100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    /* gap: 40px; */
    justify-content: center;
}
.step_list .step_item{
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
}

.step_list .step_item .circle{
    display: flex;
    width: 44px;
    height: 44px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #E0E0E0;
}
/* active status */
.step_element_active{
    background-color: #26AC34 !important;
}
.step_line_active{
    background-color:#26AC34 !important;
}
/* line step */
.line_step{
    display: flex;
    width: 130px;
    height: 2px;
    border: none;
    background-color: #E0E0E0;
}
/* detail step */
.transition_detail .step_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 40px;
    align-items: center;
    justify-content: center;
}
.step_detail .step_item{
    display: flex;
    width: 132px;
    height: 40px;
    /* flex-direction: column; */
}
.step_item >div{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}
.step_item >div h6{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
    white-space: nowrap;
}
.step_item >div p{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#9E9E9E;
    white-space: nowrap;
}
/* cancel transition */
.purchase_transition .transition_detail_calcel{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}
.transition_detail_calcel >h6{
    width: fit-content;
    height: fit-content;
    font-size: 18px;
    font-weight: 500;
    color:#26AC34;
    white-space: nowrap;
}
.transition_detail_calcel >p{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
    white-space: nowrap;
}
/* deliver address */
.deliver_address{
    display: flex;
    width: 100%;
    height: fit-content;
    border: none;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    flex-direction: column;
    gap: 8px;
}
.deliver_address .header_address{
    display: flex;
    width: fit-content;
    height:fit-content;
    font-size: 18px;
    font-weight: 500;
    color:#212121;
}
.deliver_address p{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#616161;
}
</style>