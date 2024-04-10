<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import {useRoute,useRouter} from 'vue-router'
import {ref,onBeforeMount,computed,onUpdated} from 'vue'
import cookie from '../JS/cookie';
import fetch from '../JS/api';
import validation from '../JS/validation'


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
  for(let product of convertCartList.value){
    summary+=(product.price*product.qty)
    amountProduct+=1
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
  if(convertCartList.value.length>1){//data from cart
    console.log('more then 1')
    let order =convertCartList.value.map(x=>{
      return x.cartId
    })
    let inputData={ // set form data before submit
      carts:order,
      addressId:addressSelected.value.addressId
    }
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
    order["addressId"]=addressSelected.value.addressId
    // fetch
    let {status,msg} =await fetch.BuyNowWithoutCart(order);
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
            <!-- address -->
            <div  class="wrapper_address">
              <div v-show="addressDefault!=undefined" class="address_item">
                <!-- header -->
                <div>
                  <div>
                    {{ addressSelected.addressname }}
                    {{ addressSelected.phone }}<br/>
                  </div>
                  <!-- change detault -->
                  <!-- <button>
                    change
                  </button> -->
                </div>
                <!-- detail -->
                <div>
                  {{ addressSelected.address }}
                  {{ addressSelected.province }}
                  {{ addressSelected.distrinct }}
                  {{ addressSelected.subDistrinct }}
                  {{ addressSelected.postalCode }}
                </div>
                <!-- temperary btn -->
                <button @click="showOverlay=!showOverlay">
                  change
                </button>
              </div>
            </div>
            <!-- product List -->
            <div class="wrapper_product">
                <!-- header -->
                <h5>
                  Product List
                </h5>
                <div v-for="(product,index) of convertCartList" :key="index"  class="product_list">
                  <div class="product_item">
                      <!-- img -->
                      <div>
                          <img src="../assets/vue.svg" alt="product_img">
                      </div>
                      <!-- info -->
                      <div>
                        <h6>
                          {{product.name}}
                        </h6>
                        <p>
                           {{product.style}} : {{product.size}}
                        </p>
                      </div>
                      <!-- price each-->
                      <div>
                        <h6>
                          ${{ product.price }}
                        </h6>
                      </div>
                      <!-- qty -->
                      <div>
                        <h6>
                          {{product.qty}}
                        </h6>
                      </div>
                      <!-- total product -->
                      <div>
                        <h6>
                          ${{product.qty*product.price}}
                        </h6>
                      </div>

                  </div>
              </div>
              <!-- summary -->
              <div>
                <!-- <h6>
                  order Total 
                  <span>
                    ({{total.product}} items): 
                  </span>
                  <span>
                    ${{total.price}}
                  </span>
                </h6> -->
              </div>
            </div>
            <!-- payment method -->
            <div class="wrapper_payment_method">
              <h6>
                Payment
              </h6>
              <div class="method_list">
                <button @click="">
                  Prompay
                </button>
                <button @click="">
                  Prompay
                </button>
              </div>
            </div>
            <!-- place order -->
            <div class="wrapper_summary_order">
              <h6>
                Order Summary
              </h6>
              <!-- tax and other -->
              <div>
                <!-- transaction list -->
                <div>
                  <!-- price -->
                  <div>
                    <h6>
                      Price
                    </h6>
                    <p>
                      ${{total.price}}
                    </p>
                  </div>
                  <!-- shipping -->
                  <div>
                    <h6>
                      Shipping
                    </h6>
                    <p>
                      $0
                    </p>
                  </div>
                  <!-- tax -->
                  <div>
                    <h6>
                      Tax
                    </h6>
                    <p>
                      $0
                    </p>
                  </div>
                </div>
                <!-- total price -->
                <div>
                  total Payment:: ${{total.price}}
                </div>
              </div>
              <button @click="orderSubmit()">
                Place Order
              </button>
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
.wrapper_address{
  background-color: #fff;
}
.wrapper_product{
  background-color: #fff;
}
.wrapper_payment_method{
  background-color: #fff;
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