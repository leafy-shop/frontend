<script setup>
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import {useRoute,useRouter} from 'vue-router'
import {ref,onBeforeMount} from 'vue'
import cookie from '../JS/cookie';
import fetch from '../JS/api';
import validation from '../JS/validation'


// link
const myRoute=useRouter()
const {params}=useRoute()
//common attribute
const addressList=ref([])
const addressDefault=ref({})
const userName=ref('')
const cartList=ref([])

const getAddress=async()=>{
  let {status,data}=await fetch.getAllAddress(userName.value)
  if(status){
    data.map(x=>{ //assign default address
      if(x.isDefault){
        addressDefault.value=x
      }
    })
    console.log(addressDefault.value)
    
  }
}
onBeforeMount(async()=>{
    // cookie
    cartList.value=validation.decrypt(params.cartList).split(',')
    // console.log(validation.decrypt(params.cartList).split(','))
    console.log(cartList.value)

    userName.value=cookie.decrypt().username //username
    await getAddress() //get address

})
</script>
<template>
    <BaseMenu/>
    <!-- content -->
    <div class="wrapper_payment">
        <div class="payment">
            <!-- address -->
            <div class="wrapper_address">

            </div>
            <!-- shop name -->
            <div>

            </div>
            <!-- payment method -->
            <div>

            </div>
            <!-- place order -->
            <div>

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
    width: 100%;
    height: fit-content;
    min-height: 90dvh;
    max-height: 200dvh;
}
</style>