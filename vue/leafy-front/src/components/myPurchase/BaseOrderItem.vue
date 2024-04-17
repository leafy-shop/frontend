<script setup>
import {ref,computed} from 'vue'
import fetch from '../../JS/api';
import ORDERSTATUSCOLOR from '../../JS/enum/orderStatusColor';
import ORDERSTATUS from '../../JS/enum/order';
import validation from '../../JS/validation'
import {useRouter} from 'vue-router'
import BaseStar from '../../components/productDetail/BaseStar.vue'
import BaseStarInput from '../shop_page/BaseStarInput.vue';
import BaseSubmit from '../../components/accountSetting/BaseSubmit.vue'
import BaseAlert from '../BaseAlert.vue';
import BaseShowErrorInput from '../../components/accountSetting/BaseShowErrorInput.vue'
// import validation from '../../JS/validation'
// link
const  origin = `${import.meta.env.VITE_BASE_URL}`;
const myRouter=useRouter()
// const goProfile =(shopId)=>myRouter.push({name:'Profile',params:{id:validation.encrypt(shopId)}})
const goCart=()=>myRouter.push({name:"CartList"})
// common attribute
const emit=defineEmits(['refreshData'])
const props=defineProps({
    name:{
        type:String,
        required:true,
        default:''
    },
    orderId:{
        type:String,
        default:'',
        // required:true
    },
    shopName:{
        type:String,
        required:true,
        default:'ShopName'
    },
    // shopId:{
    //     type:String,
    //     // required:true,
    //     default:''
    // },
    orderStatus:{
        type:String,
        // required:true,
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
    },
    isPayment:{
        type:Boolean,
        default:false
    },
    isDisabled:{
        type:Boolean,
        default:false
    }

})
// common attribute

const isPayment=computed(()=>props.isPayment)
const orderStatus=computed(()=>props.orderStatus)
// get img
// const getImage=async(productId)=>{
//     let element= document.getElementById(`product_img_${productId}`)//product id
//     let defaultElement= document.getElementById(`default_product_img_${productId}`)//product id
//     let {status,data}= await fetch.getImage('products',productId)
//     if(status){
//         defaultElement.setAttribute('style',"display:none;")
//         element.setAttribute('style',"display:flex;")
//         element.setAttribute('src',URL.createObjectURL(data))
//         // return 
//     }else{
       
//         defaultElement.setAttribute('style',"display:flex;")
//         element.setAttribute('style',"display:none;")
//         // return  `../../assets/vue.svg`
//     }
// }
// pay order
const payOrder=async()=>{
    if(props.orderId!=undefined){
        let {status,msg}=await fetch.changeOrderStatus(props.orderId,'nodata','paid_order')
        if(await status){// change to 
            alertType.value=0
            alertDetail.value='Product paid successfully'
            alertTime.value=3
            isShowAlert.value=true
            return emit('refreshData') //
        }else{
            alertType.value=2
            alertDetail.value='There is a problem with the server. Please try again later.'
            alertTime.value=10
            isShowAlert.value=true
        }
    }
}
// receive order
const receiveOrder=async()=>{
    let inputData={
        orderStatus:"completed"
    }
    if(props.orderStatus!=undefined){
        let {status,msg}=await fetch.changeOrderStatus(props.orderId,inputData,'check_order')
        if(await status){// change to 
            alertType.value=0
            alertDetail.value='Receive order successfully'
            alertTime.value=2
            isShowAlert.value=true
            return setTimeout(()=>emit('refreshData'),2*1000) //
        }else{
            alertType.value=2
            alertDetail.value='There is a problem with the server. Please try again later.'
            alertTime.value=10
            isShowAlert.value=true
        }
    }
}
// cancel order
const cencelOrder=async()=>{
    let inputData={
        orderStatus:"canceled"
    }
    if(props.orderStatus!=undefined){
        let {status,msg}=await fetch.changeOrderStatus(props.orderId,inputData,'check_order')
        if(await status){// change to 
            alertType.value=0
            alertDetail.value='Cancel order successfully'
            alertTime.value=2
            isShowAlert.value=true
            return setTimeout(()=>emit('refreshData'),2*1000) //
        }else{
            alertType.value=2
            alertDetail.value='There is a problem with the server. Please try again later.'
            alertTime.value=10
            isShowAlert.value=true
        }
    }
}

// buy again
const buyAgain=async()=>{
    let statusList=[]
    let falseCount=0
    if(props.orderDetail!=undefined){
        for(let product of props.orderDetail){
            let inputData={
                itemId: product.itemId,
                size: product.itemSize,
                style: product.itemStyle 
            }
            let {status}=await fetch.addToCart(inputData)
            if(await status){
                statusList.push(true)
            }else {
                statusList.push(false)
                falseCount+=1
            }
        }
        // check product out of stock
        if(statusList.includes(false)){// some product cannot
            if(falseCount==props.orderDetail.length){//all data false
                alertType.value=1
                alertDetail.value='Unable to add products to cart, please try again later.'
                alertTime.value=10
                isShowAlert.value=true
            }else{ //some data false
                setTimeout(()=>goCart(),4*1000)//go cart
                alertType.value=2
                alertDetail.value='There are some products out of stock.'
                alertTime.value=4
                isShowAlert.value=true
            }
            
        }else{
            setTimeout(()=>goCart(),2*1000)//go cart
            alertType.value=0
            alertDetail.value='Add item to cart successful'
            alertTime.value=3
            isShowAlert.value=true
        }
    }
}




// review
// common attribute 
const showReviewOverlay=ref(false) //for show overlay
const isUpdateReview=ref(false) //for show list or container input
const productDetail=ref({}) //product detail 1 product
const reviewDescription=ref('')
const pqStar=ref(0)
const SSStar=ref(0)
const dsStar=ref(0)
const reviewList=ref([])
// const submitStatus=ref(false)
// attribute status
const reviewDescriptionS=ref(false)
const pqStarS=ref(false)
const SSStarS=ref(false)
const dsStarS=ref(false)
const productDetailS=ref(false) //product detail 1 product
const orderIdS=ref(false)
// attribute msg
const productDetailM=ref('') //product detail 1 product
const reviewDescriptionM=ref('')
const pqStarM=ref('')
const SSStarM=ref('')
const dsStarM=ref('')
const orderIdM=ref('')
// attribute alert
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)
// mode
const isShowReviewService=ref(false) //for show ss and sd when create new review only
const reviewId=ref('')
// get review
const getReview=async()=>{
    // let getReviewStatus=undefined //status for check is that edit?
    let {status,data,msg} =await fetch.getProductReviewByOrder(props.orderId)
    await msg
    if(await status){//แสดงว่าเคยมีรีวิวแล้ว
        reviewList.value=await data
        console.log(data)
        // getReviewStatus=await status //use for check is up date
        return true
    }else
    if(await msg=='404'){//error
        // getReviewStatus=await status
        return false
    }else{
        closeReview()
        clearStatusReview()
        clearMessageReview()
        alertType.value=2
        alertDetail.value='Server error try again later'
        isShowAlert.value=true
        alertTime.value=10
        return undefined
    }
    
}
// make review 
const makeReviewProduct=async(product)=>{ //click to write
    let isEdit = await getReview()// get review first for change mode
    if(isEdit){ //have data review
        //loop for get old review
        let[oldReview]=reviewList.value.filter(review=>Number(review.itemId)===Number(product.itemId))
        console.log(oldReview)
        console.log(product)
        if(oldReview!=undefined&&oldReview.itemId==product.itemId){
            console.log(oldReview)
            isShowReviewService.value=false
            // assign data
            reviewId.value=oldReview.itemReviewId
            reviewDescription.value=oldReview.comment
            pqStar.value=oldReview.PQrating
            SSStar.value=oldReview.SSrating
            dsStar.value=oldReview.DSrating
            productDetail.value=product
            isUpdateReview.value=true
        }else{
            isShowReviewService.value=true
            // assign data
            productDetail.value=product
            isUpdateReview.value=true
        }
    }else{//create new review
        // console.log('let create new data')
        isShowReviewService.value=true
        // assign data
        productDetail.value=product
        isUpdateReview.value=true
       
    }
    
}
// close review
const closeReview=()=>{ //close all review
    showReviewOverlay.value=false
    isUpdateReview.value=false
    reviewList.value=[]
    productDetail.value={}
    reviewDescription.value=''
    pqStar.value=0
    SSStar.value=0
    dsStar.value=0
}
// submit
const submitReview=async()=>{
    let submitStatus=true
    // props order id
    if(String(props.orderId).length==0){
        submitStatus=false
        orderIdM.value="Order id missing"
        orderIdS.value=true
    }
    if(Object.keys(productDetail.value).length==0){
        submitStatus=false
        productDetailM.value='Product detail missing'
        productDetailS.value=true
    }
    // description
    if(reviewDescription.value.length==0){
        submitStatus=false
        reviewDescriptionS.value=true
        reviewDescriptionM.value='Review comment missing'
    }
    // rq star
    if(pqStar.value==0){
        submitStatus=false
        pqStarS.value=true
        pqStarM.value='Product quantlity require'
    }
    // ss star
    if(SSStar.value==0&&isShowReviewService.value){
        submitStatus=false
        SSStarS.value=true
        SSStarM.value='Seller service require'
    }
    // ds star
    if(dsStar.value==0&&isShowReviewService.value){
        submitStatus=false
        dsStarS.value=true
        dsStarM.value='Delivery service require'
    }
    // form data
    let inputData={}
    if(props.orderId!=undefined)inputData["orderId"]=props.orderId
    if(reviewDescription.value!=undefined)inputData["comment"]=reviewDescription.value
    if(pqStar.value!=undefined)inputData["PQrating"]=pqStar.value
    if(SSStar.value!=undefined&&SSStar.value!=0)inputData["SSrating"]=SSStar.value
    if(dsStar.value!=undefined&&dsStar.value!=0)inputData["DSrating"]=dsStar.value
    if(productDetail.value.itemSize!=undefined)inputData["size"]=productDetail.value.itemSize
    if(productDetail.value.itemStyle!=undefined)inputData["style"]=productDetail.value.itemStyle

    if(submitStatus){
        if(isShowReviewService.value){//is create mode ?
            let {status,data}=await fetch.addReview(productDetail.value.itemId,inputData)
            if(await status){
                console.log('submit review')
                closeReview()
                clearStatusReview()
                clearMessageReview()
                alertType.value=0
                alertDetail.value='Review successful'
                isShowAlert.value=true
                alertTime.value=4
            }else{
                closeReview()
                clearStatusReview()
                clearMessageReview()
                alertType.value=1
                alertDetail.value='Can not write review'
                isShowAlert.value=true
                alertTime.value=10
            }
        }else{//this is edit mode
            console.log(inputData)
            let {status,msg}=await fetch.updateReview(productDetail.value.itemId,reviewId.value,inputData)
            if(await status){
                console.log('update successful')
                closeReview()
                clearStatusReview()
                clearMessageReview()
                alertType.value=0
                alertDetail.value='Update review successful'
                isShowAlert.value=true
                alertTime.value=4
            }else{
                closeReview()
                clearStatusReview()
                clearMessageReview()
                alertType.value=1
                alertDetail.value='Can not update review'
                isShowAlert.value=true
                alertTime.value=10
            }
        }
    }
}

// clear Status
const clearStatusReview=()=>{
    pqStarS.value=false
    SSStarS.value=false
    dsStarS.value=false
    productDetailS.value=false //product detail 1 product
    orderIdS.value=false
} 
const clearMessageReview=()=>{
    pqStarM.value=''
    SSStarM.value= ''
    dsStarM.value=''
    productDetailM.value='' //product detail 1 product
    orderIdM.value=''
}
// alert
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    isShowAlert.value=false
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
    // setTimeout(()=>isShowAlert.value=false,second*1000)
}
</script>
<template>
     <div v-if="props.orderDetail.length!=0" :id="props.name "  class="shop_item">
        <!-- shop name and status -->
        <div class="header_shop">
            <!-- name and button -->
            <div class="shop_name">
                <h5 >
                    {{props.shopName}}
                </h5>
                <div v-if="!isPayment">
                    <!-- chat now -->
                    <!-- <button class="chat_now">
                        Chat now
                    </button> -->
                    <!-- view shop -->
                    <button @click="$emit('goProfile')" class="view_shop">
                        View Shop
                    </button>
                </div>
            </div>

            <!-- status -->
            <div v-if="!isPayment" class="status" :style="[`background-color:${validation.calculateStatusStepColor(orderStatus).bg}`]">
                <div >
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" :style="[`fill:${validation.calculateStatusStepColor(orderStatus).font};`]"/>
                    </svg>
                </div>
                <h6 :style="[`color:${validation.calculateStatusStepColor(orderStatus).font};`]">
                    {{ props.orderStatus }}
                    <!-- To Ship -->
                </h6>

            </div>
        </div>   
        <!-- product list -->
        <div class="product_list">
            <!-- product item -->
            <button @click="$emit('goPurchaseDetail',props.orderId)" v-if="props.orderDetail.length!=0" v-for="(product,index) of props.orderDetail" :disabled="props.isDisabled" class="product_item">
                <!-- img -->
                <div class="product_img">
                    <img v-if="product.image!=undefined" :src="`${origin}/api/image/products/${product.itemId}`" :id="`product_img_${product.itemId}`" alt="product_img">
                    <img v-else src="../../assets/vue.svg" :id="`default_product_img_${product.itemId}`" alt="product_img">
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
                                {{product.itemStyle}} :
                            </span>
                            <span>
                                {{product.itemSize}}
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
            </button>
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
            <!-- to pay  set -->
            <div v-if="!isPayment&&ORDERSTATUS.REQUIRED==props.orderStatus" class="container_btn">
                <!-- buy again -->
                <button  @click="payOrder" class="buy_again">
                    Pay now
                </button>
                <!-- view mt rating -->
                <button  @click="cencelOrder" class="view_my_rating">
                    Cancel Order
                </button>
                <!-- <button  @click="" class="view_my_rating">
                    Change Payment Method
                </button> -->
            </div>
            <!-- to receive  set -->
            <div v-if="!isPayment&&ORDERSTATUS.INPROGRESS==props.orderStatus" class="container_btn">
                <!-- buy again -->
                <button  @click="receiveOrder" class="buy_again">
                    Order Received
                </button>
                <!-- view mt rating -->
                <!-- <button  @click="showReviewOverlay=true" class="view_my_rating">
                    View My Rating
                </button> -->
            </div>
            <!-- complete  set -->
            <div v-if="!isPayment&&ORDERSTATUS.COMPLETED==props.orderStatus" class="container_btn">
                <!-- buy again -->
                <button  @click="buyAgain" class="buy_again">
                    Buy Again
                </button>
                <!-- view mt rating -->
                <button  @click="showReviewOverlay=true" class="view_my_rating">
                    View My Rating
                </button>
            </div>
            <!-- calcel  set -->
            <div v-if="!isPayment&&ORDERSTATUS.CANCELED==props.orderStatus" class="container_btn">
                <!-- buy again -->
                <button  @click="buyAgain" class="buy_again">
                    Buy Again
                </button>
                <!-- view mt rating -->
                <button  @click="$emit('goPurchaseDetail',props.orderId)" class="view_my_rating">
                    View Cancellation Details
                </button>
            </div>
        </div>
        <!-- review -->
        <div v-if="showReviewOverlay" :id="`${props.name}`" class="overlay_review">
            <!-- list -->
            <div v-if="!isUpdateReview" class="wrapper_review">
                <h5 class="header_review_list">
                    My Rating
                </h5>
                <div class="review_list">
                    <div v-for="(product,index) of props.orderDetail" :key="index" class="review_item">
                        <!-- img -->
                        <div class="product_img">
                            <img v-if="product.image!=undefined" :src="`${origin}/api/image/products/${product.itemId}`" :id="`product_img_${product.itemId}`" alt="product_img">
                            <img v-else src="../../assets/vue.svg" :id="`default_product_img_${product.itemId}`" alt="product_img">
                
                        </div>
                        <!-- name -->
                        <div class="product_name">
                            <h6 >
                                {{ product.itemname }}
                            </h6> 
                            <p>
                                {{ product.itemStyle }}: {{ product.itemSize }}
                            </p>
                        </div>
                        
                        <!-- rating -->
                        <div class="product_star">
                            <BaseStar :isGap="false" :rating="product.totalRating" :name="`star_${props.name}_${index}`" :size="60" />
                        </div>
                        <!-- operation -->
                        <div class="product_operation">
                            <button @click="makeReviewProduct(product)">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16634 4.16664H4.99967C4.55765 4.16664 4.13372 4.34223 3.82116 4.65479C3.5086 4.96736 3.33301 5.39128 3.33301 5.83331V15C3.33301 15.442 3.5086 15.8659 3.82116 16.1785C4.13372 16.491 4.55765 16.6666 4.99967 16.6666H14.1663C14.6084 16.6666 15.0323 16.491 15.3449 16.1785C15.6574 15.8659 15.833 15.442 15.833 15V10.8333M14.6547 2.98831C14.8084 2.82912 14.9923 2.70215 15.1957 2.6148C15.399 2.52746 15.6177 2.48148 15.839 2.47956C16.0603 2.47763 16.2798 2.5198 16.4846 2.6036C16.6894 2.6874 16.8755 2.81116 17.032 2.96765C17.1885 3.12414 17.3122 3.31022 17.396 3.51505C17.4798 3.71988 17.522 3.93934 17.5201 4.16064C17.5182 4.38194 17.4722 4.60064 17.3848 4.80398C17.2975 5.00732 17.1705 5.19123 17.0113 5.34497L9.85634 12.5H7.49967V10.1433L14.6547 2.98831Z" stroke="#F75555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
                <!-- button -->
                <div class="close_review_list">
                    <button @click="showReviewOverlay=false">
                        OK
                    </button>
                </div>
            </div>
            <!-- add or edit -->
            <div v-else class="wrapper_review_input">
                <!-- detail -->
                <div class="container_review_input">
                    <!-- header -->
                    <div class="header_edit">
                        <button @click="isUpdateReview=false">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7068 5.29303C12.8943 5.48056 12.9996 5.73487 12.9996 6.00003C12.9996 6.26519 12.8943 6.5195 12.7068 6.70703L9.41379 10L12.7068 13.293C12.8889 13.4816 12.9897 13.7342 12.9875 13.9964C12.9852 14.2586 12.88 14.5094 12.6946 14.6948C12.5092 14.8803 12.2584 14.9854 11.9962 14.9877C11.734 14.99 11.4814 14.8892 11.2928 14.707L7.29279 10.707C7.10532 10.5195 7 10.2652 7 10C7 9.73487 7.10532 9.48056 7.29279 9.29303L11.2928 5.29303C11.4803 5.10556 11.7346 5.00024 11.9998 5.00024C12.265 5.00024 12.5193 5.10556 12.7068 5.29303Z" fill="#212121"/>
                            </svg>
                            <h6>
                                Back
                            </h6>
                        </button>
                    </div>
                    <!-- review input -->
                    <div class="review_input">
                        <!-- product -->
                        <div class="container_product">
                            <!-- product detail -->
                            <div class="product_item">
                                <!-- img -->
                                <div class="product_item_image">
                                    <img v-if="productDetail.image!=undefined" :src="`${origin}/api/image/products/${productDetail.itemId}`" :id="`product_img_${productDetail.itemId}`" alt="product_img">
                                    <img v-else src="../../assets/vue.svg" :id="`default_product_img_${productDetail.itemId}`" alt="product_img">
                                </div>
                                <!-- product info -->
                                <div class="product_item_detail">
                                    <h6>
                                        {{productDetail.itemname}}
                                    </h6>
                                    <p>
                                        {{productDetail.itemStyle}}: {{productDetail.itemSize}}
                                    </p>
                                </div>
                            </div>
                            <!-- quantity -->
                            <div class="container_input"> 
                                <div class="product_quantity">
                                    <h6>
                                        Product Quality
                                    </h6>
                                    <div>
                                        <input v-model="pqStar" type="text" >
                                        <!-- <BaseStarInput name="product_qty" :isGap="false" :size="100" :rating="4" /> -->
                                    </div>
                                </div>
                                <BaseShowErrorInput name="product_qty" :show="pqStarS" :msg="pqStarM" />
                            </div>
                            <!-- description -->
                            <div class="container_input">
                                <textarea v-model="reviewDescription" class="product_input_desc" name="" placeholder="Share more thoughts on the product to help other buyers."></textarea>
                                <BaseShowErrorInput name="product_description" :show="reviewDescriptionS" :msg="reviewDescriptionM" />

                            </div>
                            <!-- img container -->
                            <!-- <div>
                                <button>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.46957 5 2.96086 5.21071 2.58579 5.58579C2.21071 5.96086 2 6.46957 2 7V15C2 15.5304 2.21071 16.0391 2.58579 16.4142C2.96086 16.7893 3.46957 17 4 17H16C16.5304 17 17.0391 16.7893 17.4142 16.4142C17.7893 16.0391 18 15.5304 18 15V7C18 6.46957 17.7893 5.96086 17.4142 5.58579C17.0391 5.21071 16.5304 5 16 5H14.414C14.1488 4.99994 13.8945 4.89455 13.707 4.707L12.586 3.586C12.211 3.2109 11.7024 3.00011 11.172 3H8.828C8.29761 3.00011 7.78899 3.2109 7.414 3.586L6.293 4.707C6.10551 4.89455 5.85119 4.99994 5.586 5H4ZM10 14C10.394 14 10.7841 13.9224 11.1481 13.7716C11.512 13.6209 11.8427 13.3999 12.1213 13.1213C12.3999 12.8427 12.6209 12.512 12.7716 12.1481C12.9224 11.7841 13 11.394 13 11C13 10.606 12.9224 10.2159 12.7716 9.85195C12.6209 9.48797 12.3999 9.15726 12.1213 8.87868C11.8427 8.6001 11.512 8.37913 11.1481 8.22836C10.7841 8.0776 10.394 8 10 8C9.20435 8 8.44129 8.31607 7.87868 8.87868C7.31607 9.44129 7 10.2044 7 11C7 11.7956 7.31607 12.5587 7.87868 13.1213C8.44129 13.6839 9.20435 14 10 14Z" fill="white"/>
                                    </svg>
                                    <h6>
                                        Add Photo
                                    </h6>
                                </button>
                            </div> -->
                        </div>
                        <!-- service -->
                        <div  class="container_service">
                            <!-- header -->
                            <h5 class="header_service">
                                About Service
                            </h5>
                            <!-- Seller Service -->
                            <div class="container_input">
                                <div class="seller_service">
                                    <h6>
                                        Seller Service
                                    </h6>
                                    <div>
                                        <input v-model="SSStar" type="text" name="" id="">
                                        <!-- <BaseStarInput name="product_qty" :isGap="false" :size="100" :rating="4" /> -->
                                    </div>
                                </div>
                                <BaseShowErrorInput name="seller_service" :show="SSStarS" :msg="SSStarM" />
                            </div>
                            <!-- Delivery Service -->
                            <div class="container_input">
                                <div class="deliver_service">
                                    <h6>
                                        Delivery Service
                                    </h6>
                                    <div>
                                        <input v-model="dsStar" type="text">
                                        <!-- <BaseStarInput name="product_qty" :isGap="false" :size="100" :rating="4" /> -->
                                    </div>
                                </div>
                                <BaseShowErrorInput name="delivery_service" :show="dsStarS" :msg="dsStarM" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- submit -->
                <BaseSubmit :name="`${props.name}_submit`" @goBack="closeReview" @submit="submitReview" :disabled="false" />
                <!-- <div class="container_submit">
                    <button>
                        Cancel
                    </button>
                    <button>
                        Submit
                    </button>
                </div> -->
            </div>
        </div>
        <BaseAlert name="order_item_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"  />
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
    border: none;
    background-color: transparent;
    border-bottom: 1px solid;
    border-color: #EEEEEE;
    cursor: v-bind('props.isDisabled==true?'default':'pointer'');
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

/* review */
.overlay_review{
    display: flex;
    position: fixed;
    width: 100%;
    height: 100dvh;
    background-color:#00000040;
    top: 0;
    left: 0;
    z-index: 999;
    justify-content: center;
    align-items: center;
}
.wrapper_review{
    display: flex;
    width: 544px;
    height: fit-content;
    flex-direction: column;
    border: none;
    border-radius: 8px;
    padding: 32px;
    gap: 24px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0px 1px 2px 0px #0000000F;
}
.wrapper_review .header_review_list{
    display: flex;
    width: 100%;
    height: fit-content;
    font-size: 16px;
    font-weight: 500;
    color: #212121;
}
/* list */
.review_list{
    display: flex;
    width: 100%;
    height:fit-content ;
    max-height: 50dvh;
    flex-direction: column;
    overflow-y: auto;
}
.review_item{
    display: flex;
    width: 100%;
    height: 64px;
    padding:12px 0px;
    border-bottom: 1px solid #EEEEEE;
    align-items: center;
}
/* img */
.review_item .product_img{
    display: flex;
    width: 52px;
    height: 52px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: none;
    border-radius: 4px;
}
.product_img img{
    width: 100%;
    height: auto;
}
/* name */
.review_item .product_name{
    display: flex;
    width: 312px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    padding: 6px 12px;
}
.product_name > h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product_name> p{
    width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color:#616161;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* star */
.review_item .product_star{
    display: flex;
    width: 84px;
    height: 100%;
    justify-content: center;
    align-items: center;
}
/* operator */
.review_item .product_operation{
    display: flex;
    width: 32px;
    height: 100%;
    justify-content: end;
    align-items: center;
}
.product_operation button{
    display: flex;
    width: 20px;
    height: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.close_review_list{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: end;
    align-items: center;
}
.close_review_list button{
    display: flex;
    width: 80px;
    height: 36px;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
}

/* make review */
.wrapper_review_input{
    display: flex;
    width: 544px;
    height: fit-content;
    flex-direction: column;
    border: none;
    border-radius: 8px;
    /* padding: 32px; */
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px #0000000F;
}
/* detail */
.wrapper_review_input .container_review_input{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: 32px;
    gap: 24px;
}
/* back btn */
.container_review_input .header_edit{
    display: flex;
    width: 100%;
    height: fit-content;
    align-items: center;
    justify-content: start;
}
.header_edit button{
    display: flex;
    width:fit-content;
    height: 36px;
    border: 1px solid #E0E0E0 ;
    border-radius: 4px;
    padding: 8px 12px;
    gap: 8px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    box-shadow: 0px 1px 2px 0px #0000000D;
}
.header_edit button svg{
    width: 20px;
    height: 20px;
}
.header_edit button h6{
    display: flex;
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
}
/* review input */
.review_input{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
/* product */
.container_product{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 12px;
    flex-direction: column;
}
.container_product .product_item{
    display: flex;
    width: 100%;
    height: fit-content;
}
/* img */
.product_item .product_item_image{
    display: flex;
    width: 52px;
    height: 52px;
    border: none;
    border-radius: 4px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.product_item .product_item_image img{
    width: 100%;
    height: auto;
}
/* name */
.product_item .product_item_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 6px 12px;
    gap: 4px;
    flex-direction: column;
}
.product_item_detail h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product_item_detail p{
    width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color:#616161;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.container_input{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap:4px;
}
/* product_quantity */
.container_product .product_quantity{
    display: flex;
    width: 100%;
    height: fit-content;
}
.container_product .product_quantity h6{
    display: flex;;
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
}
.container_product .product_quantity >div{
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
}
/* description */
.container_product .product_input_desc{
    display: flex;
    width: 100%;
    height: 50px;
    min-height: 36px;
    max-height: 100px;
    padding: 12px;
    border: 1px solid #D1D5DB;
    border-radius: 4px;
    resize: vertical;
    box-shadow: 0px 1px 2px 0px #0000000D;

}
/* service */
.review_input .container_service{
    display: flex;
    width:100%;
    height: fit-content;
    gap: 12px;
    flex-direction: column;
}
/* header */
.container_service .header_service{
    display: flex;
    width: 100%;
    height: fit-content;
    font-size: 16px;
    font-weight: 700;
    color:#212121;
}
/* sellery */
.container_service .seller_service{
    display: flex;
    width: 100%;;
    height: 20px;
    justify-content: space-between;
    align-items: center;
}
.container_service .seller_service h6{
    width: 100%;;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.container_service .seller_service div{
    display: flex;
    width: fit-content;
    height: 100%;
}
/* delivery */
.container_service .deliver_service{
    display: flex;
    width: 100%;;
    height: 20px;
    justify-content: space-between;
    align-items: center;
}
.container_service .deliver_service h6{
    width: 100%;;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.container_service .deliver_service div{
    display: flex;
    width: fit-content;
    height: 100%;
}

/* submit */
/* .container_submit{
    display: flex;
    width:100%;
    height: fit-content;
    gap: 8px;
    padding: 12px 24px;
    background-color: #FAFAFA;
    justify-content: end;
    align-items: center;
}
.container_submit button{
    display: flex;
    width: ;
} */


</style>
