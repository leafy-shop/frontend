<script setup>
import BaseOrderItem from './BaseOrderItem.vue';
import {computed,ref} from 'vue'
import {useRouter} from 'vue-router'
import ORDERSTATUS from '../../JS/enum/order';
import validation from '../../JS/validation'
import fetch from '../../JS/api';
import BaseAlert from '../BaseAlert.vue';
// link
const myRouter=useRouter()
const goPurchaseDetail=(orderId)=>myRouter.push({name:'MyPurchaseDetail',params:{id:orderId}})
const goProfile =(shopName)=>myRouter.push({name:'Profile',params:{id:shopName}})
const goConfirmPayment=()=>myRouter.push({name:"ConfirmPayment",params:{id:validation.encrypt(orderGroupId.value)}})

//common attribute
const emit =defineEmits(['refreshData'])
const props =defineProps({
    name:{
        type:String,
        default:'',
        required:true
    },
    // order group
    orderList:{
        type:Array,
        default:[]
    },
    orderGroupId:{
        type:String,
        default:''
    },
    orderGroupTotal:{
        type:Number,
        default:0
    },
    orderGroupAllItem:{
        type:Number,
        default:0
    },

    // order item
    // orderId:{
    //     type:String,
    //     default:'',
    //     // required:true
    // },
    // shopName:{
    //     type:String,
    //     required:true,
    //     default:'ShopName'
    // },
    // orderStatus:{
    //     type:String,
    //     // required:true,
    //     default:""
    // },
    // orderDetail:{
    //     type:Array,
    //     required:true,
    //     default:[]
    // },
    // orderTotal:{
    //     type:Number,
    //     required:true,
    //     default:0
    // },
    // isPayment:{
    //     type:Boolean,
    //     default:false
    // },
    // isDisabled:{
    //     type:Boolean,
    //     default:false
    // }
})
// attribute alert
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

const orderList=computed(()=>{
    // console.log('this is order list', props.orderList)
    if(props.orderList==undefined){
        return []
    }else{
        return props.orderList
    }
})
const orderGroupAllItem=computed(()=>props.orderGroupAllItem)
const orderGroupTotal=computed(()=> props.orderGroupTotal)
const name=computed(()=>props.name)
const orderGroupId=computed(()=>props.orderGroupId) //use for payment
// order item
// const orderId=computed(()=>{
//     if(props.orderId==undefined)'';
//     else props.orderId;
// })
// const shopName=computed(()=>{
//     if(props.shopName==undefined)'';
//     else props.shopName;
// })
// const orderStatus=computed(()=>{
//     if(props.orderStatus==undefined)'';
//     else props.orderStatus;
// })
// const orderDetail=computed(()=>{
//     if(props.orderDetail==undefined)[];
//     else props.orderDetail
// })
// const orderTotal=computed(()=>{
//     if(props.orderTotal==undefined)0;
//     else props.orderTotal;
// })
// const isPayment=computed(()=>props.isPayment)
// const is  

//     isPayment:{
//         type:Boolean,
//         default:false
//     },
//     isDisabled:{
//         type:Boolean,
//         default:false
//     }

// const getOrders=()=>{
    
// }

// alert
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

const cencelOrder=async()=>{
    let inputData={
        orderStatus:ORDERSTATUS.CANCELED
    }
    // if(props.orderStatus!=undefined){
    let {status,msg}=await fetch.changeOrderStatus(orderGroupId.value,inputData,'paid_order')
    if(await status){// change to 
        alertType.value=0
        alertDetail.value='Cancel order successfully'
        alertTime.value=2
        isShowAlert.value=true
        setTimeout(()=>emit('refreshData'),1*1000) //
        return emit('refreshData')
    }else{
        alertType.value=1
        alertDetail.value='There is a problem with the server. Please try again later.'
        alertTime.value=10
        isShowAlert.value=true
    }
    // }
}
</script>
<template>
    <div  class="wrapper_order_group">
        <div v-for="(order,groupOrderIndex) of orderList" :key="groupOrderIndex" class="order_item">
            <BaseOrderItem :name="`${name}_${groupOrderIndex}`" :orderId="order.orderId"  :shopName="order.itemOwner" :orderStatus="order.status" :isGroup="true"
            :orderDetail="order.order_details" :orderTotal="order.total" @goPurchaseDetail="goPurchaseDetail" @goProfile="goProfile(order.itemOwner)" />
        </div>

        <!-- order detail -->
        <div class="order_detail">
            <!-- info -->
            <div class="order_info">
                <p>
                    Order Total (
                    <span>
                        {{ orderGroupAllItem }}
                    </span> items) : 
                </p>
                <h6 class="money_bath">
                    <!-- ฿77.99 -->
                    
                    <span>
                        {{ orderGroupTotal }}
                    </span>
                </h6>
            </div>
            <!-- payment -->
            <div class="container_btn">
                <button  @click="goConfirmPayment" class="buy_again">
                    Pay now
                </button>
                <button  @click="cencelOrder" class="view_my_rating">
                    Cancel Order
                </button>
            </div>
        </div>
        <BaseAlert name="order_group_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"  />

    </div>
    <!-- order -->
    <!-- <div v-else-if="true" class="wrapper_order"> -->
        <!-- <BaseOrderItem v-else :name="name" :orderId="orderId"  :shopName="shopName" :orderStatus="orderStatus"
            :orderDetail="orderDetail" :orderTotal="orderTotal" @goPurchaseDetail="goPurchaseDetail" @goProfile="goProfile(shop.itemOwner)" @refresh-data="getOrders" /> -->
    <!-- </div> -->
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.money_bath::before{
    content:"฿"
}
.wrapper_order_group{
    display:flex;
    width:100%;
    height:fit-content;
    flex-direction:column;
    overflow:hidden;
    background-color:#fff;
    border:none;
    border-radius:min(0.556dvw,8px);
    /* padding-top:min(1.389dvw,20px); */
}

/* order detail */
.order_detail{
    display: flex;
    width: 100%;
    height: min(4.167dvw,60px);
    justify-content: end;
    align-items: center;
    gap: min(1.389dvw,20px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
}
.order_detail .order_info{
    display: flex;
    width: fit-content;
    height: min(1.389dvw,20px);
    gap: min(0.556dvw,8px);
    align-items: center
}
.order_info p{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: min(0.833dvw,12px);
    font-weight: 400;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.order_info h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 700;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
/*container button */
.container_btn{
    display: flex;
    width:fit-content;
    height: 100%;
    gap: min(0.556dvw,8px);
}
.container_btn button{
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
    /* border: none; */
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
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
    border: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
    background-color: transparent;
}
/* mobile */
@media (width<=432px){
    .wrapper_order_group{
    border-radius: 0px;
    }
    .order_detail{
        height: 60px;
        gap:20px;
        padding: 12px 20px;
    }
    .order_detail .order_info{
        height: 20px;
        gap: 8px;
    }
    .order_info p{
        font-size: 12px;
    }
    .order_info h6{
        font-size: 14px;
    }
    /* container button */
    .container_btn{
        gap: min(0.556dvw,8px);
    }
    .container_btn button{
        height: 36px;
        font-size:14px;
        box-shadow: 0px 1px 2px 0px #0000000D;
        border-radius: 4px;
        padding: 8px 12px;
    }
    .container_btn .view_my_rating{
        border: min(0.069dvw,1px) solid #E0E0E0;
    }
}


</style>