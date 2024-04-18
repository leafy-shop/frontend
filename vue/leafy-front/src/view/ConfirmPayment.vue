<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import {ref,onBeforeMount} from 'vue'
import { useRouter, useRoute } from 'vue-router';
import validation from '../JS/validation'
import BaseAlert from '../components/BaseAlert.vue';
import fetch from '../JS/api';
// link
let{params}=useRoute()
const myRouter=useRouter()
const goMyPurchaseDetail=()=>myRouter.push({name:'MyPurchaseDetail',params:{id:orderId.value}})
const goPurchase =()=>myRouter.push({name:'MyPurchase'})
const goCart=()=>myRouter.push({name:'CartList'})
const goHome=()=>myRouter.push({name:'Home'})
// common attribute
const orderId=ref('')
const myTimeOut=ref('')
const orderDetail=ref({})
// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)


// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
    clearTimeout(myTimeOut.value)
    // goPurchase()
}

// get order detail
const getOrderDetail=async()=>{
    let inputData={
        orderId:orderId.value
    }
    let{status,data}=await fetch.getAllOrder(false,inputData)
    if(await status){
        console.log(data)
        orderDetail.value=await data
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}
// for change status become to pay
const payOrder=async()=>{
    if(orderId.value!=undefined){
        let {status,msg}=await fetch.changeOrderStatus(orderId.value,'nodata','paid_order')
        if(await status){// change to 
            alertType.value=0
            alertDetail.value='Payment successful!'
            alertTime.value=3
            isShowAlert.value=true
            myTimeOut.value=setTimeout(()=>goMyPurchaseDetail(),3*1000)
            //
        }else{
            alertType.value=1
            alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
            alertTime.value=10
            isShowAlert.value=true
        }
    }else{
        alertType.value=2
        alertDetail.value="Looks like some information is missing, so we can't complete the process right now."
        alertTime.value=10
        isShowAlert.value=true
    }
}
onBeforeMount(async()=>{
    // assign id
    orderId.value=validation.decrypt(params.id)

    await getOrderDetail()
})
</script>
<template>
    <BaseMenu class="menu" />
        <div class="container_access">
            <!-- home icon -->
            <svg
            @click="goHome"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M10.707 2.293C10.5195 2.10553 10.2652 2.00021 10 2.00021C9.73485 2.00021 9.48054 2.10553 9.29301 2.293L2.29301 9.293C2.11085 9.4816 2.01006 9.7342 2.01234 9.9964C2.01461 10.2586 2.11978 10.5094 2.30519 10.6948C2.4906 10.8802 2.74141 10.9854 3.00361 10.9877C3.26581 10.99 3.51841 10.8892 3.70701 10.707L4.00001 10.414V17C4.00001 17.2652 4.10537 17.5196 4.2929 17.7071C4.48044 17.8946 4.73479 18 5.00001 18H7.00001C7.26523 18 7.51958 17.8946 7.70712 17.7071C7.89465 17.5196 8.00001 17.2652 8.00001 17V15C8.00001 14.7348 8.10537 14.4804 8.2929 14.2929C8.48044 14.1054 8.73479 14 9.00001 14H11C11.2652 14 11.5196 14.1054 11.7071 14.2929C11.8947 14.4804 12 14.7348 12 15V17C12 17.2652 12.1054 17.5196 12.2929 17.7071C12.4804 17.8946 12.7348 18 13 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8947 17.5196 16 17.2652 16 17V10.414L16.293 10.707C16.4816 10.8892 16.7342 10.99 16.9964 10.9877C17.2586 10.9854 17.5094 10.8802 17.6948 10.6948C17.8802 10.5094 17.9854 10.2586 17.9877 9.9964C17.99 9.7342 17.8892 9.4816 17.707 9.293L10.707 2.293Z"
                fill="#757575"
            />
            </svg>
            <!-- right arrow -->
            <svg
            class="right_arrow"
            viewBox="0 0 24 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M0.292999 0L22.293 22L0.292999 44H1.707L23.707 22L1.707 0H0.292999Z"
                fill="#EEEEEE"
            />
            </svg>
            <!-- product -->
            <h5 @click="goCart" class="link">Cart</h5>
            <svg
            class="right_arrow"
            viewBox="0 0 24 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M0.292999 0L22.293 22L0.292999 44H1.707L23.707 22L1.707 0H0.292999Z"
                fill="#EEEEEE"
            />
            </svg>
            <h5 @click="goShop" class="link">Confirmation</h5>
        </div>

    <div class="wrapper_confirm_payment">
        <div class="confirm_payment">
            <!-- header -->
            <div class="header_confirm_payment">
                <h6>
                    Payment Infomation
                </h6>
            </div>
            <!-- total payment -->
            <div class="container_payment_detail">
                <!-- total -->
                <div class="payment_total">
                    <h5>
                        Total Payment
                    </h5>
                    <h6>
                        ฿{{ orderDetail.total }}
                    </h6>
                </div>
                <!-- payment within -->
                <!-- <div class="payment_within">
                    <h5>
                        Payment Within
                    </h5>
                    <div class="container_time_date">
                        time
                        <h6 class="time">
                            23 : 59 : 44
                        </h6>
                        data
                        <h6 class="date">
                            on 27-08-2021 13:57
                        </h6>
                    </div>
                </div> -->
            </div>

            <!-- sample container qr -->
            <div class="container_qr_sample">
                <!-- header -->
                <div class="header_qr">
                    <img src="../assets/icon/thai_qr_icon.png" alt="payment_type_icon">
                </div>
                <!-- qr code -->
                <div class="qr_img">
                    <img src="../assets/promp_pay_img.png" alt="qr_sample_img">
                </div>
                <!-- destination -->
                <div class="qr_destination">
                    <h6>
                        ฿{{orderDetail.total}}
                    </h6>
                    <p>
                        LEAFY CO.,LTD
                    </p>
                </div>
            </div>

            <!-- inistruction -->
            <div class="container_instruction">
                <!-- header -->
                <h6 class="header_instruction">
                    Please follow these instruction
                </h6>

                <ul class="description_instruction">
                    <li>
                        Click on "Save QR Code" button or screenshot this page.
                    </li>
                    <li>
                        Open Mobile Banking App (or Authorized 3PP APP) on your device.
                    </li>
                    <li>
                        Choose "Scan" or "QR code" icon on app to scan or upload picture.
                    </li>
                    <li>
                        Attach your QR screenshot and then make payment, please make sure the recipient is "LEAFY CO.,LTD"
                    </li>
                    <li>
                        When successfully making payment, please manually go back to Leafy and will see payment status updated. (If the payment status has not been updatedม please wait a moment and refresh.)
                    </li>
                    <li>
                        You can scan QR code only once per transaction. If you need to scan again, please refresh the QR code.
                    </li>
                </ul>

                <p class="description_remark">
                    Remark: PromptPay only allows payment on Mobile Banking App, bank counters and ATM are not allowed.
                </p>
                
            </div>
        </div>
        <!-- container btn -->
        <div class="wrapper_btn">
            <div class="container_btn">
                <button @click="goPurchase" class="back">
                    Back
                </button >
                <button @click="payOrder" class="pay_complete">
                    Payment Completed
                </button>
            </div>
        </div>
        <BaseAlert name="confirm_payment_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"  />
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
/* access layer */
.container_access {
  display: flex;
  width: auto;
  height: min(3.056dvw, 44px);
  background-color: #ffffff;
  border-bottom: min(0.069dvw, 1px) solid;
  border-color: #eeeeee;
  padding: 0px min(11.111dvw, 160px);
  align-items: center;
  gap: min(1.111dvw, 16px);
}

.container_access svg:nth-child(1) {
  width: min(1.667dvw, 24px);
  height: min(1.667dvw, 24px);
  cursor: pointer;
}

.container_access svg:nth-child(1):hover path {
  fill: #26ac34;
}

.link {
  font-size: min(0.972dvw, 14px);
  font-weight: 500;
  color: #757575;
  cursor: pointer;
}

.link:hover {
  color: #26ac34;
}

.right_arrow {
  display: flex;
  width: min(1.667dvw, 24px);
  height: min(3.056dvw, 44px);
}
.wrapper_confirm_payment{
    display: flex;
    width: 100%;
    height: fit-content;
    min-height: 90dvh;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding : 20px 0px;
}
.confirm_payment{
    display: flex;
    width: 600px;
    max-width: 100%;
    height: fit-content;
    gap: 24px;
    flex-direction: column
}
/* header */
.header_confirm_payment{
    display: flex;
    width: 100%;
    height: 24px;
    justify-content: start;
    align-items: center;
}
.header_confirm_payment h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 24px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* total container */
.container_payment_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}
/* payment total */
.container_payment_detail .payment_total{
    display: flex;
    width: 100%;
    height:32px;
    justify-content: space-between;
    align-items: start;
    border-bottom: 1px solid #EEEEEE;
}
.payment_total h5{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.payment_total h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 700;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* payment_within */
.container_payment_detail .payment_within{
    display: flex;
    width: 100%;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0px;
}
.payment_within h5{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.payment_within .container_time_date{
    display: flex;
    width: 283px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: end;
}
.container_time_date h6{
    width: fit-content;
    max-width: 100%;
    height: 20px;
    white-space: nowrap;
    
    overflow: hidden;
    text-overflow: ellipsis;
}
.container_time_date .time{
    width: fit-content;
    max-width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #26AC34;
}
.container_time_date .date{
    width: fit-content;
    max-width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #757575;
}
/* qr sample */
.container_qr_sample{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    align-items: center;
}
/* header */
.container_qr_sample .header_qr{
    display: flex;
    width: 100%;
    height: 40px;;
    background-color: #1A3761;
    justify-content: center;
    align-items: center;
}
.header_qr img{
    width: 100px;
    height: auto;
}
.container_qr_sample .qr_img{
    display: flex;
    width: 200px;
    height: 200px;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.qr_img img{
width: 100%;
height: auto;
}
/* destination */
.qr_destination{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    align-items: center;
}
.qr_destination h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 400;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
.qr_destination p{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 500;
    color: #757575;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* instruction */
.container_instruction{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 12px;
}
.container_instruction .header_instruction{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
}
.container_instruction .description_instruction{
    /* display: flex; */
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    /* padding-left: 2px; */
    list-style-position: inside;
    /* list-style: decimal; */
    font-size: 12px;
    font-weight: 400;
    color: #757575;

}
/* remark */
.description_remark{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color: #757575;
}
/* container button */
.wrapper_btn{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 0px;
}
.container_btn{
    display: flex;
    width: 600px;
    height: fit-content;
    justify-content: end;
    align-items: center;
    /* background-color: #000000 */
    gap: 8px;
}
.container_btn >button{
    display: flex;
    width: fit-content;
    height: 36px;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
    border: none;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
}
.container_btn .back{
    border: 1px solid #E0E0E0;
    background-color: #fff;
    color: #212121;
}
.container_btn .pay_complete{
    background-color: #26AC34;
    color: #fff;
}
</style>