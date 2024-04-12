<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import {useRoute,useRouter} from 'vue-router'
import {ref,onBeforeMount,computed,onUpdated} from 'vue'
import cookie from '../JS/cookie';
import fetch from '../JS/api';
import validation from '../JS/validation'
import BaseBankItemList from '../components/bank/BaseBankItemList.vue'
import BaseOrderItem from '../components/myPurchase/BaseOrderItem.vue';
import BaseSummary from '../components/cartList/BaseSummary.vue';

// link
const myRoute=useRouter()
const {params}=useRoute()
const myRouter=useRouter()
const goShop=()=>myRouter.push({name:"Shop"})
//common attribute
const addressList=ref([]) //list all
const addressDefault=ref({}) //default selected
const userName=ref('')
const cartList=ref(undefined)
const rawData =ref(undefined)
// common status
const showOverlay=ref(false)
// address selected
const addressSelected=ref({}) // for address selection
// mode selection
const showInputContainer=ref(false) //for 
// input address
const addressName=ref('')
const addressPhone=ref('')
const addressDesc=ref('')
const addressProvince=ref('')
const addressDistrict=ref('')
const addressSubDistrict=ref('')
const addressZip=ref('')
const addressSetDefault=ref(false)
const addressFormData=computed(()=>{
  let inputData ={
    addressname: addressName.value,
    address: addressDesc.value,
    province: addressProvince.value,
    distrinct: addressDistrict.value,
    subDistrinct: addressSubDistrict.value,
    postalCode: addressZip.value,
    phone: addressPhone.value,

  }
  return inputData
})

// mode controller
const inputController=(show)=>{
  if(show){ //add mode
    showInputContainer.value=true
  }else{ //edit mode
    showInputContainer.value=false
  }
}

// show address overlay
const addressOverlayController=(confirm)=>{
  if(confirm){
    showOverlay.value=false
  }else{
    showOverlay.value=false
    addressSelected.value=addressDefault.value
  }
}

// calculate important data summary
const total=computed(()=>{
  let summary=0
  let amountProduct=0
  for(let shop of convertCartList.value){
    shop.order_detail.forEach(product=>{
      summary+=(product.priceEach*product.qtyOrder)
      amountProduct+=1
    })
    
  }
  return {price:summary,product:amountProduct}

})
// convert passing data to array
const convertCartList=computed(()=>{
    let rawType = typeof(rawData.value)
    if(rawType=="string"){// check obj type
      if(rawData.value.includes('{')&&rawData.value.includes('}')){
        console.log('this is obj')
        return JSON.parse(rawData.value) //data from shop direct
      }else{
        return rawData.value.split(',') //data from cart
      }
    }
})
// list all address
const getAddress=async()=>{
  let {status,data}=await fetch.getAllAddress(userName.value)
  if(status){
    // console.log(data)
    for(let x of data){
      if(x.isDefault){
        addressDefault.value=x
        data.splice(data.indexOf(x),1) //remove default
      }
    }
    addressList.value=data
    // assign address default to addressSelected
    addressSelected.value=addressDefault.value
  }
}
// add new address
const createAddress=async()=>{
  let{status,msg,data}=await fetch.addAddress(userName.value,addressFormData.value)
  if(status){
    if(addressSetDefault.value){ //if set default data
      let res=await fetch.updateAddressById(userName.value,data,{isDefault: true})
      if(res.status){
        
        console.log('set default address successful')
         // go back to address list when update successful
      }else{
        console.log('cannot set default address')
      }
    }
    await getAddress()
    inputClear()
    inputController(false)
  }
}
// clear input
const inputClear=()=>{
  addressName.value=""
  addressPhone.value=""
  addressDesc.value=""
  addressProvince.value=""
  addressDistrict.value=""
  addressSubDistrict.value=""
  addressZip.value=""
  addressSetDefault.value=false
}

// place order
const orderSubmit=async()=>{
  let order=[]
  if(convertCartList.value.length>1){//data from cart
    console.log('more then 1')
      for(let shop of convertCartList.value){ //loop by shop
        shop.order_detail.forEach(x=>{ //loop by product
        order.push(x.cartId) 
      })
    }
    
    let inputData={ // set form data before submit
      carts:order,
      addressId:addressSelected.value.addressId
    }
    console.log(inputData)
    // fetch
    let {status,msg}=await fetch.BuyNow(inputData)
    if(status){
      console.log('buy many of the product successful')
      goShop()
    }else{
      console.log('can not buy many of the product')
    }
  }else{ //data from product detail
    let [order]=convertCartList.value
    let [oneOrder]= order.order_detail
    let inputData={
      itemId: oneOrder.itemId,
      style: oneOrder.itemStyle,
      size: oneOrder.itemSize,
      addressId: addressSelected.value.addressId,
      qty: oneOrder.qtyOrder
    }
    
    // fetch
    let {status,msg} =await fetch.BuyNowWithoutCart(inputData);
    if(status){
      console.log('buy 1 product successful')
      goShop()
    }else{
      console.log('can not buy 1 product')
    }
  }  
}



onBeforeMount(async()=>{
    // cookie
    rawData.value=validation.decrypt(params.cartList) //raw data
    console.log(validation.decrypt(params.cartList))

    userName.value=cookie.decrypt().username //username
    await getAddress() //get address
    console.log(convertCartList.value,'raw data type')

    
})
// onUpdated(()=>{
//   console.log(addressSelected.value)
// })
</script>
<template>
    <BaseMenu/>
    <!-- content -->
    <div class="wrapper_payment">
        <div class="payment">
            <!-- container address and payment -->
            <div class="container_address_payment">
              <!-- address -->
              <div  class="wrapper_address">
                <div class="container_header_address">
                  <!-- header -->
                  <div class="header_address">
                    <div>
                      <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.05051 2.04999C3.36333 0.73717 5.14389 -0.000366211 7.0005 -0.000366211C8.85711 -0.000366211 10.6377 0.73717 11.9505 2.04999C13.2633 3.36281 14.0009 5.14338 14.0009 6.99999C14.0009 8.8566 13.2633 10.6372 11.9505 11.95L7.0005 16.9L2.05051 11.95C1.40042 11.3 0.884739 10.5283 0.532912 9.67894C0.181084 8.82961 0 7.9193 0 6.99999C0 6.08068 0.181084 5.17037 0.532912 4.32104C0.884739 3.47172 1.40042 2.70001 2.05051 2.04999ZM7.0005 8.99999C7.53094 8.99999 8.03965 8.78928 8.41472 8.4142C8.78979 8.03913 9.00051 7.53042 9.00051 6.99999C9.00051 6.46956 8.78979 5.96085 8.41472 5.58578C8.03965 5.2107 7.53094 4.99999 7.0005 4.99999C6.47007 4.99999 5.96136 5.2107 5.58629 5.58578C5.21122 5.96085 5.0005 6.46956 5.0005 6.99999C5.0005 7.53042 5.21122 8.03913 5.58629 8.4142C5.96136 8.78928 6.47007 8.99999 7.0005 8.99999Z" fill="#26AC34"/>
                      </svg>
                    </div>
                    <h5>
                      Delivery Address
                    </h5>
                  </div>
                  <!-- address -->
                  <BaseBankItemList name="payment_address" :data-list="[addressSelected]" :is-default="true" :show-edit-btn="false"  />
                </div>
                <!-- <div class="change_btn"> -->
                  <button @click="showOverlay=!showOverlay" class="change_btn">
                    change
                  </button>
                <!-- </div> -->
                <!-- <div v-show="addressDefault!=undefined" class="address_item">
                  header
                  <div>
                    <div>
                      {{ addressSelected.addressname }}
                      {{ addressSelected.phone }}<br/>
                    </div>
                    change detault
                    <button @click="showOverlay=!showOverlay">
                      change
                    </button>
                  </div>
                  detail
                  <div>
                    {{ addressSelected.address }}
                    {{ addressSelected.province }}
                    {{ addressSelected.distrinct }}
                    {{ addressSelected.subDistrinct }}
                    {{ addressSelected.postalCode }}
                  </div>
                  temperary btn
                  <button @click="showOverlay=!showOverlay">
                    change
                  </button>
                </div>-->
              </div> 

              <!-- payment method
              <div class="wrapper_payment_method">
                <h6>
                  Payment
                </h6>
                <div class="method_list">
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                </div>
              </div> -->
            </div>

            <!-- product List -->
            <div v-for="(shop,index) of convertCartList" class="wrapper_product_list">
              <BaseOrderItem name="payment" :shop-name="shop.shopName"  :order-detail="shop.order_detail" :order-total="shop.orderTotal" />  

            </div>
            
            <!-- payment method -->
            <div class="wrapper_payment_method">
                <h6>
                  Payment
                </h6>
                <div class="method_list">
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                  <button @click="">
                    <img src="../assets/vue.svg" alt="thai_payment_icon">
                  </button>
                </div>
              </div>

            <!-- place order -->
            <div class="wrapper_summary_order">
              <BaseSummary name="summary_payment" :total="total.price" :summary-total="total.price" @submit="orderSubmit" />
              <!-- <h6>
                Order Summary
              </h6>
              tax and other
              <div>
                transaction list
                <div>
                  price
                  <div>
                    <h6>
                      Price
                    </h6>
                    <p>
                      ${{total.price}}
                    </p>
                  </div>
                  shipping
                  <div>
                    <h6>
                      Shipping
                    </h6>
                    <p>
                      $0
                    </p>
                  </div>
                  tax
                  <div>
                    <h6>
                      Tax
                    </h6>
                    <p>
                      $0
                    </p>
                  </div>
                </div>
                total price
                <div>
                  total Payment:: ${{total.price}}
                </div>
              </div>
              <button @click="orderSubmit()">
                Place Order
              </button> -->
            </div>
        </div>

        <!-- overlay -->
        <!-- myAddress -->
        <div v-show="showOverlay" class="overlay">
          <!-- address -->
          <div v-if="!showInputContainer" class="wrapper_address_overlay">
            <div class="address_overlay">
              <!-- header -->
              <div>
                <h6>
                  My address
                </h6>
              </div>
              <!-- list -->
              <div class="address_list_overlay">
                <!-- default -->
                  <label for="address_default" v-show="addressDefault!=undefined" class="address_item_overlay">
                    <!-- input -->
                    <div>
                      <input v-model="addressSelected" :value="addressDefault" type="radio" name="address" id="address_default">
                    </div>
                    <!-- info -->
                    <div>
                      <!-- header -->
                      <div>
                        <div>
                          {{ addressDefault.addressname }}
                          {{ addressDefault.phone }}<br/>
                        </div>
                        
                      </div>
                      <!-- detail -->
                      <div>
                        {{ addressDefault.address }}
                        {{ addressDefault.province }}
                        {{ addressDefault.distrinct }}
                        {{ addressDefault.subDistrinct }}
                        {{ addressDefault.postalCode }}
                      </div>
                      
                    </div>
                  </label>

                  <!-- list -->
                  <label :for="`address_${index}`" v-show="addressList.length!=0" v-for="(address,index) of addressList" :key="index" class="address_item_overlay">
                    <!-- input -->
                    <div>
                      <input v-model="addressSelected" :value="address" type="radio" name="address" :id="`address_${index}`">
                    </div>
                    <!-- info -->
                    <div>
                      <!-- header -->
                      <div>
                        <div>
                          {{ address.addressname }}
                          {{ address.phone }}<br/>
                        </div>
                        
                      </div>
                      <!-- detail -->
                      <div>
                        {{ address.address }}
                        {{ address.province }}
                        {{ address.distrinct }}
                        {{ address.subDistrinct }}
                        {{ address.postalCode }}
                      </div>
                      <!-- temperary btn -->
                      <!-- <button>
                        change
                      </button> -->
                    </div>
                  </label>
                  <!-- new address -->
                  <div>
                    <button @click="inputController(true)">
                      + New Address
                    </button>
                  </div>
              </div>
              <!-- submit -->
              <div>
                <button @click="addressOverlayController(false)">
                  Cancel
                </button>
                <button @click="addressOverlayController(true)">
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <!-- add address -->
          <div v-else class="wrapper_add_address_overlay">
            <div class="add_address_overlay">
              <!-- header -->
              <div>
                <h6>
                  add Address
                </h6>
              </div>
              <!-- detail -->
              <div class="container_add_address">
                <!-- name & Phone-->
                <div class="input_list">
                  <!-- name -->
                  <div class="input_field">
                    <h6>
                      Full name
                    </h6>
                    <input v-model="addressName" type="text">
                  </div>
                  <!-- Phone -->
                  <div class="input_field">
                    <h6>
                      Phone
                    </h6>
                    <input v-model="addressPhone" maxlength="11" type="text">
                  </div>
                </div>
                <!-- address -->
                <div class="input_field">
                  <h6>
                    address
                  </h6>
                  <input v-model="addressDesc" type="text">
                </div>
                <!-- province & district -->
                <div class="input_list">
                  <!-- province -->
                  <div class="input_field">
                    <h6>
                      Province
                    </h6>
                    <input v-model="addressProvince" type="text">
                  </div>
                  <!-- district -->
                  <div class="input_field">
                    <h6>
                      District
                    </h6>
                    <input v-model="addressDistrict" type="text">
                  </div>
                </div>
                <!-- sub district & zip -->
                <div class="input_list">
                  <!-- sub disctrict -->
                  <div class="input_field">
                    <h6>
                      Sub district
                    </h6>
                    <input v-model="addressSubDistrict" type="text">
                  </div>
                  <!-- zip -->
                  <div class="input_field">
                    <h6>
                      Zip / Postal
                    </h6>
                    <input v-model="addressZip" maxlength="5" type="text">
                  </div>
                </div>
                <!-- set as Default Address -->
                <div class="set_default">
                  <input v-model="addressSetDefault"  type="checkbox" name="set_default" id="">
                  <label for="set_default">
                    Set as Default Address
                  </label>
                </div>
                <!-- submit -->
                <div class="">
                  <button @click="inputController(false)">
                    Cancel
                  </button>
                  <button @click="createAddress()">
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_payment{
    display: flex;
    position: relative;
    width: 100%;
    height: fit-content;
    min-height: 90dvh;
    max-height: 200dvh;
    justify-content: center;
    align-items: start;
    background-color:  #f5f5f5;
    padding: 20px 160px;
}
.payment{
  display: flex;
  width: fit-content;
  min-width: 100%;
  max-width: 100%;
  height: fit-content;
  /* background-color: #fff; */
  flex-direction: column;
  border: none;
  border-radius: 8px;
  gap: 20px;
}
/* container of address and payment method */
.container_address_payment{
  display: flex;
  width: 100%;
  height: fit-content;
  /* justify-content: space-between; */
  align-items: center;
  gap: 32px;
  flex-direction: column;
}
.wrapper_address{
  display: flex;
  width: 100%;
  /* min-width: 736px; */
  height: fit-content;
  min-height: 160px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  gap: 20px;
  background-color: #fff;
  align-items: start;
  /* flex-direction: column; */
}
.container_header_address{
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 4px;
}
.container_header_address .header_address{
  display: flex;
  width: fit-content;
  height: 24px;
  gap: 8px;
  align-items: center;
}
.header_address >div{
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
}
.header_address >div svg{
  width: 14px;
  height: auto;
}
.header_address  h5{
  width: fit-content;
  height: fit-content;
  font-size: 16px;
  font-weight: 500;
  color: #26AC34;
}
.wrapper_address .change_btn{
  display: flex;
  width: 76px;
  height: 36px;
  border: 1px solid;
  border-color: #E0E0E0;
  border-radius:4px ;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #212121;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
}
/* payment method */
.wrapper_payment_method{
  display: flex;
  width: 100%;
  min-width: 352px;
  height: fit-content;
  min-height: 160px;
  max-height: 100%;
  border: none;
  border-radius: 8px;
  padding: 20px;
  gap: 16px;
  background-color: #fff;
  box-shadow: 0px 1px 2px 0px #0000000F;
  flex-direction: column;
}
.wrapper_payment_method .method_list{
  display: flex;
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
  gap: 8px;
}
.method_list button{
  display: flex;
  width: 72px;
  height: 36px;
  border: 1px solid;
  border-radius: 4px;
  border-color: #EEEEEE;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
}
.method_list button img{
  width: auto;
  height: 16px;
  
}
.method_list button:hover{
  border-color: #26AC34;
}


.wrapper_product_list{
  display: flex;
  width: 100%;
  height: fit-content;
  max-height: 100%;
  /* background-color: #fff; */
}

.wrapper_summary_order{
  background-color: #fff;
}


.overlay{
  display: flex;
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  background: #00000040;
}
.wrapper_address_overlay{
  display: flex;
  width: 544px;
  height: fit-content;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px #0000000F;
  padding: 32px

}
.wrapper_add_address_overlay{
  display: flex;
  width: 544px;
  height: fit-content;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px #0000000F;
  padding: 32px

}
</style>