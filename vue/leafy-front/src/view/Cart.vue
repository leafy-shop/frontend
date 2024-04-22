<script setup>
import BaseMenu from "../components/BaseMenu.vue";
import BaseFooter from "../components/BaseFooter.vue";
import { useRouter } from "vue-router";
import { onBeforeMount, ref, computed } from "vue";
import fetch from "../JS/api";
import cookie from "../JS/cookie";
import validation from '../JS/validation'
import BaseSummary from "../components/cartList/BaseSummary.vue";
import BaseAlert from "../components/BaseAlert.vue";
import BaseConfirm from "../components/BaseConfirm.vue";
//link
const myRouter = useRouter();
const goHome = () => myRouter.push({ name: "Home" });
const goPayment=(list)=>myRouter.push({name:'Payment',params:{cartList:validation.encrypt(list)}})
const goBack=()=>myRouter.go(-1)
let origin = `${import.meta.env.VITE_BASE_URL}`;

// common attribute
const carts = ref([]);
const count = ref(0);
const qty = ref(0);
const addressDefaultId=ref('')
const userName=ref('')
// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)
// show confirm
const showConfirm=ref(false)

const getCarts = async () => {
  let cartList = await fetch.getCart();
  if(await cartList.status){
    let cartCount = await fetch.getCartCount();
    carts.value = cartList.data;
    carts.value.isAllSelected = false;
    carts.value.carts = cartList.data.carts.map((cart) => {
      cart.isGroupSelected = false;
      cart.cartOwner = cart.cartOwner.map((cartDetail) => {
        cartDetail.isSelected = false;
        return cartDetail;
      });
      return cart;
    });
    count.value = cartCount.data.count;
    console.log(carts.value);
  }else{//error
    isShowAlert.value=true
    alertType.value=1
    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
    alertTime.value=10
  }
  
};

const makeGroupSelection = (owner) => {
  carts.value.carts.map((cart) => {
    if (owner === cart.itemOwner) {
      if (
        cart.isGroupSelected &&
        cart.cartOwner.every((cartDetail) => cartDetail.isSelected)
      ) {
        cart.cartOwner = cart.cartOwner.map((cartDetail) => {
          cartDetail.isSelected = false;
          return cartDetail;
        });
        return cart;
      } else {
        cart.cartOwner = cart.cartOwner.map((cartDetail) => {
          cartDetail.isSelected = true;
          return cartDetail;
        });
        return cart;
      }
    }
  });
};

const makeAllSelection = () => {
  // console.log(carts.value.isAllSelected)
  if (
    carts.value.isAllSelected &&
    carts.value.carts.every((cart) => cart.isGroupSelected)
  ) {
    console.log("T");
    carts.value.carts.map((cart) => {
      cart.isGroupSelected = false;
      cart.cartOwner = cart.cartOwner.map((cartDetail) => {
        cartDetail.isSelected = false;
        return cartDetail;
      });
      return cart;
    });
  } else {
    carts.value.carts.map((cart) => {
      cart.isGroupSelected = true;
      cart.cartOwner = cart.cartOwner.map((cartDetail) => {
        cartDetail.isSelected = true;
        return cartDetail;
      });
      return cart;
    });
  }
};

const countCheckOut = computed(() => {
  let selectedCart = [];
  if (carts.value.carts !== undefined) {
    carts.value.carts.forEach((cart) =>
      cart.cartOwner.forEach((detail) => {
        if (detail.isSelected) selectedCart.push(detail);
      })
    );
  }

  return selectedCart.length;
});

// let detectNumber = (input, detail) => {
//     // console.log(input.target.value)

//     // Remove any non-digit characters
//     const sanitizedInput = input.target.value.replace(/\D/g, '');
//     // console.log(sanitizedInput)

//     // Parse the input as a number
//     const parsedNumber = parseInt(sanitizedInput);
//     // console.log(sanitizedInput)

//     // Check if the parsed number is a valid positive number
//     if (!isNaN(parsedNumber) && parsedNumber > selectedStyle.value.stock) {
//         detail.value.qty = selectedStyle.value.stock;
//     } else if (!isNaN(parsedNumber) && parsedNumber > 0) {
//         detail.value = parsedNumber;
//     } else {
//         detail.value = 1;
//     }
// }
// get address
const getAddress=async()=>{
  let {status,data}=await fetch.getAllAddress(userName.value)
  if(await status){
    await data.map(x=>{ //assign default address
      if(x.isDefault){
        addressDefaultId.value=x.addressId
      }
    })
    // console.log(addressDefaultId.value)
    
  }
}

// for buy item selected

const checkOrder = async() => {
  let selectedCart = [];
  //get info of cart id
  carts.value.carts.forEach((cart) =>
    cart.cartOwner.forEach((detail) => {
      if (detail.isSelected&&detail.stock!=0){

        if(selectedCart.length==0){ //add data first if length equal 0
          selectedCart.push({
            
            shopName:detail.itemOwner,
            orderTotal:Number(detail.qty)*Number(detail.priceEach),

            order_detail:[
              {
                cartId:detail.cartId, //(use)
                itemId:detail.itemId,
                image:detail.image,
                itemStyle:detail.itemStyle,//style
                itemname:detail.itemName,//name
                priceEach:Number(detail.priceEach), //price
                qtyOrder:Number(detail.qty),//qty
                itemSize:detail.itemSize,
                stock:Number(detail.stock), 
              }
            ]

            // addressId:addressDefaultId.value,
          })
        }else{ //if not equal 0
            let isDuplicateName=false
            let indexShopNameDuplicated=undefined
            for(let i=0;i<=selectedCart.length-1;i++){ // ซ้ำ true ไม่ false
              console.log(i)
              if(selectedCart[i].shopName==detail.itemOwner){
                isDuplicateName=true
                indexShopNameDuplicated=i
                // console.log(selectedCart[i])
                // console.log(selectedCart[i].shopName)
                // console.log(detail.itemOwner)
                
              }
            }
              if(isDuplicateName){ //if itemOwner have same shopName push only order_detail
                selectedCart[indexShopNameDuplicated].order_detail.push({
                  cartId:detail.cartId, //(use)
                  itemId:detail.itemId,
                  image:detail.image,
                  itemStyle:detail.itemStyle,//style
                  itemname:detail.itemName,//name
                  priceEach:Number(detail.priceEach), //price
                  qtyOrder:Number(detail.qty),//qty
                  itemSize:detail.itemSize,
                  stock:Number(detail.stock), 
                }) 
                selectedCart[indexShopNameDuplicated].orderTotal+=(Number(detail.qty)*Number(detail.priceEach))
              }else{ //if shopName have not same itemOwner then push all new shopName
                
                selectedCart.push({
                  shopName:detail.itemOwner,
                  orderTotal:Number(detail.qty)*Number(detail.priceEach),
                  order_detail:[{
                    cartId:detail.cartId, //(use)
                    itemId:detail.itemId,
                    image:detail.image,
                    itemStyle:detail.itemStyle,//style
                    itemname:detail.itemName,//name
                    priceEach:Number(detail.priceEach), //price
                    qtyOrder:Number(detail.qty),//qty
                    itemSize:detail.itemSize,
                    stock:Number(detail.stock), 
                    orderTotal:Number(detail.qty)
                }]
                  // addressId:addressDefaultId.value,
                })
                
              }
        }
      }
      // // else{
      //   // out of stock error
      //   console.log("out of stock")
      // }
    })
  );

    let inputData={
      isBuyNow:false,
      dataList:selectedCart
    }
    console.log(selectedCart)

    if(selectedCart.length!=0){//have selected product
      goPayment(JSON.stringify(inputData).toString())
    }else{//alert for no product selected
      isShowAlert.value=true
      alertType.value=2
      alertDetail.value="Please make sure to select the products you want"
      alertTime.value=5
    }
  // fetch
  // let cartData={
  //   carts : selectedCart,
  //   addressId : addressDefaultId.value
  // }
  // let {status,msg} =await fetch.BuyNow(cartData)
  // if(status){
  //   console.log('buy successful')
  //   await getCarts()
  // }else{
  //   console.log('can not buy')
  // }
};


// attribute reduce/delete product from order 
const cartIdDetail=ref(undefined)
const cartQtyDetail=ref(undefined)//use for change type and use for change data
// confirm function
const confirmFunction=async(qtyValue)=>{

    if(qtyValue!=undefined){//qty have data(do reduce)
      await updateCartQTY(cartIdDetail.value,cartQtyDetail.value-1)
      clearAllValue()
    }else{ //not have qty value(do delete)
      await deleteProductFromCart(cartIdDetail.value)
      clearAllValue()
    }

}
// cancel confirm
const clearAllValue=()=>{
  showConfirm.value=false
  cartIdDetail.value=undefined
  cartQtyDetail.value=undefined
}

// for assign cart id & qty
const reduceQty = async (cartId, qty) => {
  cartIdDetail.value=cartId
  cartQtyDetail.value=qty
  if(qty==1){
    showConfirm.value=true
  }else{
    await updateCartQTY(cartIdDetail.value,cartQtyDetail.value-1)
  }
  // await updateCartQTY(cartIdDetail.value,cartQtyDetail.value-1)
  
};
// for assign cart id
const deleteCart = async(cartId) => {
  cartIdDetail.value=cartId
  showConfirm.value=true
  // deleteProductFromCart()
};

// update qty
const updateCartQTY=async(cartId,qty)=>{
  let{status,msg}=await fetch.getUpdateCart(cartId, { qty: qty });
  if(await status){
    await getCarts();
  }else
  if(await msg=='400'){
    isShowAlert.value=true
    alertType.value=2
    alertDetail.value="Sorry, we can't decrease the quantity if the item is out of stock."
    alertTime.value=3
  }else{
    isShowAlert.value=true
    alertType.value=1
    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
    alertTime.value=10
  }
}
const deleteProductFromCart=async(cartId)=>{
  let{status,msg}=await fetch.deleteCart(cartId);
  if(await status){
    cartIdDetail.value=undefined;
    cartQtyDetail.value=undefined
    await getCarts();
  }else{
    isShowAlert.value=true
    alertType.value=1
    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
    alertTime.value=10
  }
}
//add addqty
const addQty = async (cartId, qty) => {
  // console.log(qty)
  let{status,msg}=await fetch.getUpdateCart(cartId, { qty: qty + 1 });
  if(await status){
    await getCarts();
  }else
  if(await msg=='400'){
    isShowAlert.value=true
    alertType.value=2
    alertDetail.value="Sorry, we can't increase the quantity if the item is out of stock."
    alertTime.value=3
  }else{
    isShowAlert.value=true
    alertType.value=1
    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
    alertTime.value=10
  }
};



// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(async() => {
  userName.value=cookie.decrypt().username
  await getAddress()
  await getCarts();
});
</script>
<template>
  <div class="menu wrapper_menu_component" >
    <BaseMenu />
  </div>
  <!-- access -->
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
    <h5 @click="" class="link">Cart</h5>
  </div>

  <!-- mobile -->
  <div class="container_access_mobile menu">
    <!-- back -->
    <button @click="goBack" class="go_back_btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <!-- header -->
    <h5 class="header">
      Shopping Cart 
      <span>
        ({{ count }})
      </span>
    </h5>
    <!-- empty  -->
    <div class="empty">

    </div>
  </div>

  <!-- content -->
  <div class="wrapper_cart">
    <!-- cart -->
    <div class="cart">
      <!-- header -->
      <div class="header_cart">
        <!-- amount of shop -->
        <div>
          <div class="cart_selecetion">
            <input
              type="checkbox"
              v-model="carts.isAllSelected"
              @click="makeAllSelection()"
            />
          </div>
          <h4>
            Cart&nbsp;
            <span>({{ count }}) </span>
          </h4>
        </div>
        <!-- type of unit-->
        <div>
          <h5>Unit Price</h5>
          <h5>Quantity</h5>
          <h5>Total Price</h5>
        </div>
      </div>
      <!-- shop list -->
      <div class="shop_list">
        <div
          v-for="(shop, index) of carts.carts"
          :key="index"
          class="shop_item"
        >
          <!-- header -->
          <div class="header_shop">
            <div class="shop_selection">
              <input
                type="checkbox"
                v-model="shop.isGroupSelected"
                @click="makeGroupSelection(shop.itemOwner)"
              />
            </div>
            <div class="name_shop">
              <h5>
                <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aut unde saepe nam, facere recusandae iure fugit. Enim esse consectetur, quaerat veniam possimus qui commodi neque, dolorem at quibusdam nulla temporibus eveniet atque provident praesentium illum sint dicta, alias fuga dolores? Fuga impedit itaque incidunt unde repudiandae vero quaerat, iste facilis asperiores numquam debitis, minus nostrum dignissimos dolorum iusto ea qui dolore alias temporibus? Omnis accusamus autem quisquam corporis, nemo quia amet quos hic necessitatibus magni eos perspiciatis nulla alias voluptas quae aspernatur eum voluptates, modi eveniet! Fuga ullam, alias incidunt excepturi vel quos molestiae unde aspernatur natus vero eveniet ipsa? Blanditiis qui harum illo ex quia. Et qui, perspiciatis sed dolore voluptas excepturi tempora facere accusantium facilis eos, cumque est. Aspernatur, est? Velit recusandae quo in! Ullam, itaque a. Praesentium fuga numquam rerum, nam obcaecati optio adipisci eligendi ad delectus quae mollitia placeat iste illo sit voluptates eaque accusamus? -->
                {{ shop.itemOwner }}
              </h5>
              <div>
                <!-- <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 1.16666L7.33333 6.99999L1.5 12.8333"
                    stroke="#616161"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg> -->
                <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M7.5 4.16663L13.3333 9.99996L7.5 15.8333" 
                  stroke="#616161" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <!-- product list -->
          <div class="product_list" :style="[detail.stock==0?'background-color:#EEEEEE;':'']" v-for="(detail,index) in shop.cartOwner" :key="index">
            <!-- product item -->
            <div class="product_item">
              <div class="container_info_detail">
                <!-- select -->
                <div class="product_selection">
                  <input 
                    v-show="detail.stock!=0"
                    type="checkbox"
                    name=""
                    id=""
                    :disabled="detail.stock==0"
                    v-model="detail.isSelected"
                  />
                </div>
                <!-- img -->
                <div class="product_img">
                  <img
                    v-if="detail.image"
                    :src="`${origin}/api/image/products/${detail.itemId}`"
                    alt="product_img"
                  />
                  <img v-else src="../assets/vue.svg" alt="product_img" />
                </div>

                <!-- product_detail -->
                <div class="product_detail">
                  <h6>{{ detail.itemName }}</h6>
                  <!-- variance selection -->
                  <div :for="`variation_${index}`">
                    <p>{{detail.itemStyle}} :&nbsp;</p>
                    <h6 :id="`variation_${index}`">
                      {{detail.itemSize}}
                      <!-- <option value=""></option> -->
                    </h6>
                  </div>
                </div>

                <!-- mobile -->
                <div class="wrapper_product_detail">
                  <!-- detail -->
                  <div class="container_product_detail">
                    <div class="product_detail">
                      <h6>
                        {{ detail.itemName }}
                      </h6>
                      <!-- variance selection -->
                      <div :for="`variation_${index}`">
                        <p>
                          {{detail.itemStyle}} :&nbsp;
                        </p>
                        <h6 :id="`variation_${index}`">
                          {{detail.itemSize}}
                          <!-- <option value=""></option> -->
                        </h6>

                      </div>
                    </div>
                    <!-- price each -->
                    <div class="price_each">
                      <h6>
                          {{ detail.priceEach }}
                      </h6>
                    </div>
                  </div>
                  <!-- price qty reduce -->
                  <div class="container_price_qty">
                    <!-- input qty -->
                    <div class="product_quantity">
                      <!-- reduce -->
                      <button
                        class="reduce"
                        @click="reduceQty(detail.cartId, detail.qty)"
                      >
                        -
                      </button>
                      <input type="text" v-model="detail.qty" disabled/>
                      <!-- add -->
                      <button
                        class="add"
                        @click="addQty(detail.cartId, detail.qty)"
                      >
                        +
                      </button>
                    </div>
                    <!-- total -->
                    <div class="product_total">
                      <h6>
                        ฿{{ detail.priceEach * detail.qty }}
                      </h6>
                    </div>
                    <!-- delete -->
                    <div class="product_delete">
                      <button  @click="deleteCart(detail.cartId)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M3.3335 5.83333H16.6668M15.8335 5.83333L15.111 15.9517C15.0811 16.3722 14.8929 16.7657 14.5844 17.053C14.2759 17.3403 13.87 17.5 13.4485 17.5H6.55183C6.13028 17.5 5.72439 17.3403 5.4159 17.053C5.10742 16.7657 4.91926 16.3722 4.88933 15.9517L4.16683 5.83333H15.8335ZM12.5002 5.83333V3.33333C12.5002 3.11232 12.4124 2.90036 12.2561 2.74408C12.0998 2.5878 11.8878 2.5 11.6668 2.5H8.3335C8.11248 2.5 7.90052 2.5878 7.74424 2.74408C7.58796 2.90036 7.50016 3.11232 7.50016 3.33333V5.83333H12.5002Z" stroke="#F75555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              <!-- price qty reduce -->
              <div class="container_info_price">
                <!-- price -->
                <div class="product_price">฿{{ detail.priceEach }}</div>
                <!-- quantity -->
                <div class="product_quantity">
                  <!-- reduce -->
                  <button
                    class="reduce"
                    @click="reduceQty(detail.cartId, detail.qty)"
                  >
                    -
                  </button>
                  <input type="text" v-model="detail.qty" disabled/>
                  <!-- add -->
                  <button
                    class="add"
                    @click="addQty(detail.cartId, detail.qty)"
                  >
                    +
                  </button>
                </div>
                <!-- total -->
                <div class="product_total">
                  ฿{{ detail.priceEach * detail.qty }}
                </div>
                <!-- delete -->
                <div class="product_delete" @click="deleteCart(detail.cartId)">
                  <button>
                    <div>
                      <!-- <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.3335 8.16667V13.1667M9.66683 8.16667V13.1667M1.3335 4.83333H14.6668M13.8335 4.83333L13.111 14.9517C13.0811 15.3722 12.8929 15.7657 12.5844 16.053C12.2759 16.3403 11.87 16.5 11.4485 16.5H4.55183C4.13028 16.5 3.72439 16.3403 3.4159 16.053C3.10742 15.7657 2.91926 15.3722 2.88933 14.9517L2.16683 4.83333H13.8335ZM10.5002 4.83333V2.33333C10.5002 2.11232 10.4124 1.90036 10.2561 1.74408C10.0998 1.5878 9.88784 1.5 9.66683 1.5H6.3335C6.11248 1.5 5.90052 1.5878 5.74424 1.74408C5.58796 1.90036 5.50016 2.11232 5.50016 2.33333V4.83333H10.5002Z"
                          stroke="#F75555"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg> -->
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M3.3335 5.83333H16.6668M15.8335 5.83333L15.111 15.9517C15.0811 16.3722 14.8929 16.7657 14.5844 17.053C14.2759 17.3403 13.87 17.5 13.4485 17.5H6.55183C6.13028 17.5 5.72439 17.3403 5.4159 17.053C5.10742 16.7657 4.91926 16.3722 4.88933 15.9517L4.16683 5.83333H15.8335ZM12.5002 5.83333V3.33333C12.5002 3.11232 12.4124 2.90036 12.2561 2.74408C12.0998 2.5878 11.8878 2.5 11.6668 2.5H8.3335C8.11248 2.5 7.90052 2.5878 7.74424 2.74408C7.58796 2.90036 7.50016 3.11232 7.50016 3.33333V5.83333H12.5002Z" 
                          stroke="#F75555" 
                          stroke-width="2" 
                          stroke-linecap="round" 
                          stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BaseSummary  name="summary_cart" :total="Number(carts.total)" :shipping="carts.shipping" 
      :tax="carts.tax" :summary-total="Number(carts.total) +Number(carts.shipping) + Number(carts.tax)" 
      :count-check-out="countCheckOut" @submit="checkOrder" />
      <!-- summary
      <div class="wrapper_summary">
        <div class="summary">
          header
          <h4>Order Summary</h4>
          summary list
          <div class="summary_list">
            subtotal 
            <div class="summary_item">
              <h6>Subtotal</h6>
              <p class="money_bath">฿{{ carts.total }}</p>
            </div>
            Shipping
            <div class="summary_item">
              <h6>Shiping</h6>
              <p class="money_bath">฿{{ carts.shipping }}</p>
            </div>
            Tax
            <div class="summary_item">
              <h6>Tax</h6>
              <p class="money_bath">฿{{ carts.tax }}</p>
            </div>
          </div>
          total
          <div class="total">
            <h6>Total Payment</h6>
            <p class="money_bath">
              ฿{{
                parseFloat(
                  Number(carts.total) +
                    Number(carts.shipping) +
                    Number(carts.tax)
                ).toFixed(2)
              }}
            </p>
          </div>
        </div>
        submit
        <button @click="checkOrder">Check Out ({{ countCheckOut }})</button>
      </div> -->
    </div>
    <BaseAlert name="cart_list_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
  </div>
  <BaseConfirm name="cart_list_confirm" header-confirm="Do you want to remove this item?" submit-title="Delete" :show-confirm="showConfirm" @submit="confirmFunction(cartQtyDetail)" @cancel="clearAllValue()" />

  <BaseFooter />
</template>
<style scoped>
* {
  box-sizing: border-box;
}

/* access layer */
.container_access_mobile{
  display: none;
}
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

.wrapper_cart {
  display: flex;
  width: 100%;
  height: fit-content;
  min-height: 90dvh;
  max-height: 200dvh;
  flex-direction: column;
  padding: min(1.389dvw,20px) min(11.111dvw, 160px);
  gap: min(1.389dvw,20px);
  background-color: #f5f5f5;
}

.cart {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: min(1.111dvw,16px);
}

.header_cart {
  display: flex;
  width: 100%;
  height: min(3.611dvw,52px);
  padding: min(0.833dvw,12px) min(1.389dvw,20px);
  justify-content: space-between;
  align-items: center;
  gap: min(1.667dvw,24px);
  border: none;
  border-radius: min(0.556dvw,8px);
  background-color: #fff;
}

.header_cart > div {
  display: flex;
  width: auto;
  height: 100%;
  align-items: center;
}

.header_cart .cart_selecetion {
  display: flex;
  width: fit-content;
  height: fit-content;
}

.cart_selecetion input {
  width: min(1.111dvw,16px);
  height: min(1.111dvw,16px);
  accent-color: #168a22;
}

/* amount of shop */
.header_cart > div:nth-child(1) {
  gap: min(1.111dvw,16px);
}

.header_cart > div:nth-child(1) h4 {
  display: flex;
  height: min(1.944dvw,28px);
  font-size: min(1.25dvw,18px);
  font-weight: 700;
  color: #212121;
  /* justify-content: center; */
  align-items: center;
}

.header_cart > div:nth-child(1) h4 span {
  display: flex;
  height: 100%;
  font-size: min(1.25dvw,18px);
  font-weight: 400;
  color: #616161;
  align-items: center;
}

/* typ of unit */
.header_cart > div:nth-child(2) {
  display: flex;
  width: min(25dvw,360px);
  height: 100%;
  /* gap: 16px; */
  align-items: center;
  padding-right: min(2.222dvw,32px);
}

.header_cart > div:nth-child(2) h5 {
  display: flex;
  width: auto;
  height: fit-content;
  font-size: min(0.972dvw,14px);
  font-weight: 400;
  /* line-height: 144%; */
  color: #616161;
  /* justify-content: center; */
  align-items: center;
}

.header_cart > div:nth-child(2) h5:nth-child(1),
.header_cart > div:nth-child(2) h5:nth-child(3) {
  width: min(6.944dvw,100px);
  padding-left: min(0.833dvw,12px);
}

.header_cart > div:nth-child(2) h5:nth-child(2) {
  width: min(8.889dvw,128px);
  justify-content: center;
}

/* shop */
.shop_list {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: min(1.111dvw,16px);
}

.shop_item {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  background-color: #fff;
  border: none;
  border-radius: min(0.556dvw,8px);
  gap: min(0.833dvw,12px);
  padding: min(1.389dvw,20px) 0px min(0.556dvw,8px) 0px;
  box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000f;
}

/* header */
.header_shop {
  display: flex;
  width: 100%;
  height: min(2.5dvw,36px);
  border-bottom: min(0.069dvw,1px) solid;
  border-color: #eeeeee;
  align-items: center;
  padding: 0px min(1.389dvw,20px) min(0.833dvw,12px) min(1.389dvw,20px);
  gap: min(1.111dvw,16px);
}

.header_shop .shop_selection {
  display: flex;
  width: fit-content;
  height: fit-content;
}

.header_shop input {
  width: min(1.111dvw,16px);
  height: min(1.111dvw,16px);
  accent-color: #168a22;
}

/* .header_shop > div {
  display: flex;
  width: 100%;
  height: fit-content;
  background-color: rgb(200, 255, 0);

} */

.header_shop > div h5 {
  width: fit-content;
  max-width: 80%;
  font-size: min(1.111dvw,16px);
  font-weight: 700;
  color: #212121;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header_shop > div div {
  display: flex;
  width: min(1.389dvw,20px);
  height: min(1.389dvw,20px);
  justify-content: center;
  align-items: center;
}
.name_shop {
  display: flex;
  width: 100%;
  height: fit-content;
  gap: min(0.278dvw,4px);
  align-items: center;
}

/* product list */
.product_list {
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 0px min(1.389dvw,20px);
}

.product_item {
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  /* border-top: 1px solid;
    border-color: #EEEEEE; */

  padding-bottom: min(0.833dvw,12px);
}

.product_item > div {
  display: flex;
  width: 100%;
  height: min(3.889dvw,56px);
  align-items: center;
}

/* left of item detail */
.product_item div.container_info_detail div {
  width: auto;
  height: 100%;
}

/* selection */
.product_item div.container_info_detail .product_selection {
  display: flex;
  width: min(2.222dvw,32px);
  height: 100%;
  justify-content: start;
  align-items: center;
}

.product_item div.container_info_detail .product_selection input {
  width: min(1.111dvw,16px);
  height: min(1.111dvw,16px);
  accent-color: #168a22;
}

/* img */
.product_item div.container_info_detail .product_img {
  display: flex;
  width: min(3.611dvw,52px);
  height: min(3.611dvw,52px);
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: min(0.278dvw,4px);
  overflow: hidden;
}

.product_item div.container_info_detail .product_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* detail */
.product_item div.wrapper_product_detail{
  display: none;
}
.product_item div.container_info_detail .product_detail {
  display: flex;
  width: 100%;
  /* max-width: 100%; */
  height: 100%;
  flex-direction: column;
  padding: min(0.278dvw,4px) min(0.833dvw,12px);
  gap: min(0.278dvw,4px);
}

.product_item div.container_info_detail .product_detail >h6 {
  width: fit-content;
  max-width: 100%;
  height: min(1.389dvw,20px);
  font-size: min(0.972dvw,14px);
  font-weight: 500;
  color: #212121;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item div.container_info_detail .product_detail >div {
  display: flex;
  width: 100%;
  max-width: 100%;
  height: min(1.667dvw,24px);
  padding: min(0.278dvw,4px) min(0.556dvw,8px) min(0.278dvw,4px) min(0.833dvw,12px);
  background-color: #f5f5f5;
  align-items: center;
  border: none;
  border-radius: min(0.278dvw,4px);
}

/* .product_item > div:nth-child(1) .product_detail >div:focus-within {
  outline: auto;
} */

.product_item div.container_info_detail .product_detail >div p {
  display: flex;
  width: fit-content;
  height: min(1.111dvw,16px);
  font-size: min(0.833dvw,12px);
  font-weight: 400;
  color: #616161;
  white-space: nowrap;
}

.product_item div.container_info_detail .product_detail >div >h6 {
  display: flex;
  width: 100%;
  height: min(1.111dvw,16px);
  font-size: min(0.833dvw,12px);
  font-weight: 400;
  color: #616161;
  border: none;
  /* outline: none; */
  background-color: transparent;
}

/* right price quantity total */
.product_item div.container_info_price {
  display: flex;
  width: fit-content;
  height: fit-content;
  align-items: center;
}

.product_item div.container_info_price .product_price {
  display: flex;
  width: min(6.944dvw,100px);
  height: min(3.611dvw,52px);
  /* justify-content: center; */
  align-items: center;
  padding: min(1.111dvw,16px) min(0.833dvw,12px);
  color: #616161;
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  font-weight: 400;
}

.product_item div.container_info_price .product_quantity {
  display: flex;
  width: min(8.889dvw,128px);
  height: 100%;
  padding: min(0.556dvw,8px) min(0.833dvw,12px);
  justify-content: center;
  align-items: center;
}

.product_item div.container_info_price .product_quantity div {
  display: flex;
  width: 100%;
  height: min(2.5dvw,36px);
  /* border-radius: 4px; */
  /* overflow: hidden; */
  justify-content: center;
  align-items: center;
  border: min(0.069dvw,1px) solid;
  /* border-color: #E0E0E0; */
  box-shadow: 0px min(0.278dvw,4px) min(2.778dvw,40px) 0px #04060f14;
}

.product_item div.container_info_price .product_quantity button {
  display: flex;
  width: min(2.222dvw,32px);
  height: min(2.5dvw,36px);
  padding: min(0.556dvw,8px) min(0.833dvw,12px);
  justify-content: center;
  align-items: center;
  border: min(0.069dvw,1px) solid;
  cursor: pointer;
  box-shadow: none;
  background-color: #fff;
  z-index: 4;
  border-color: #e0e0e0;
  /* border-color: transparent; */
}
.product_item div.container_info_price .product_quantity button:hover {
  background-color: #F5F5F5;
}
.product_item div.container_info_price .product_quantity .reduce {
  border-right: none;
  border-radius: min(0.278dvw,4px) 0px 0px min(0.278dvw,4px);
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  color: #212121;
}

.product_item div.container_info_price .product_quantity .add {
  border-left: none;
  border-radius: 0px min(0.278dvw,4px) min(0.278dvw,4px) 0px;
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  color: #212121;
}

.product_item div.container_info_price .product_quantity input {
  display: flex;
  width: 100%;
  /* min-width: 32px; */
  height: min(2.5dvw,36px);
  border: min(0.069dvw,1px) solid;
  background-color: #fff;
  padding: min(0.556dvw,8px) min(0.833dvw,12px);
  outline: none;
  box-shadow: 0px;
  z-index: 5;
  border-color: #e0e0e0;
  text-align: center;
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  color: #212121;
}
.product_item div.container_info_price .product_quantity input:hover {
  background-color: #F5F5F5;
}
.product_item div.container_info_price .product_total {
  /* display: flex; */
  width: min(6.944dvw,100px);
  height: min(3.611dvw,52px);
  justify-content: center;
  align-items: center;
  padding: min(1.111dvw,16px) min(0.833dvw,12px);
  color: #26ac34;
  font-size: min(0.972dvw,14px);
  font-weight: 400;
  line-height: 144%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item div.container_info_price .product_delete {
  display: flex;
  width: min(2.222dvw,32px);
  height: min(3.611dvw,52px);
  /* padding: 16px, 0px, 16px, 12px; */
  padding: min(1.111dvw,16px) 0px min(1.111dvw,16px) min(0.833dvw,12px);
  justify-content: end;
  align-items: center;
}

.product_item div.container_info_price .product_delete button {
  display: flex;
  width: min(1.389dvw,20px);
  height: min(1.389dvw,20px);
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.product_item div.container_info_price .product_delete button svg{
  /* width: min(0.833dvw,12px); */
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
}

/* mobile */
@media (width<=432px){
  .wrapper_menu_component{
    /* display: flex;
    width: 100%;
    height: fit-content; */
    display: none;
  }
  /* access layer */
  .container_access {
    display: none
  }
  .container_access_mobile{
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 20px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 1px 3px 0px #0000001A;
    background-color: #fff;
  }
  .container_access_mobile .go_back_btn{
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .container_access_mobile h5.header{
    display: flex;
    width: fit-content;
    height: fit-content;
    font-size:18px ;
    font-weight: 700;
    color: #212121;
    gap: 4px;
    justify-content: center;
    align-items: center;
  }
  .container_access_mobile h5.header span{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
    vertical-align: center;
  }
  .container_access_mobile div.empty{
    display: flex;
    width: 24px;
    height: 24px;
    letter-spacing: 0.20000000298023224px;
  }
  .wrapper_cart {   
    padding: 0px;
    gap: 16px;
  }
  .cart {
    gap: 16px;
  }
  .header_cart{
    display: none;
  }
  
  /* shop */
  .shop_list {
    gap: 8px;
  }
  .shop_item {
    border-radius:0px;
    gap: 12px;
    padding: 12px 0px 0px 0px;
    box-shadow: 0px 1px 2px 0px #0000000f;
  }
  /* header */
  .header_shop {
    height: 36px;
    border-bottom: 1px solid #eeeeee;
    border-color: #eeeeee;
    align-items: center;
    padding: 0px 20px 12px 20px;
    gap: 16px;
  }
  /* .header_shop .shop_selection {
  } */
  .header_shop input {
    width: 16px;
    height: 16px;
  }
  .header_shop > div h5 {
    font-size: 16px;
  }
  .header_shop > div div {
    width: 20px;
    height: 20px;
  }
  .name_shop {
    gap: 4px;
  }
  /* product list */
  .product_list {
    padding: 0px;
  }
  .product_item {
    padding: 0px 20px 12px 20px;
  }
  .product_item > div {
    height: fit-content;
    
    /* height: 92px; */
  }
  /* left of item detail */
  /* .product_item div.container_info_detail div {
  } */

  /* selection */
  .product_item div.container_info_detail .product_selection {
    width: 32px;
  }
  .product_item div.container_info_detail .product_selection input {
    width: 16px;
    height: 16px;
  }
  /* img */
  .product_item div.container_info_detail div.product_img {
    width: 52px;
    height:52px;
    border-radius: 4px;

  }
  /* detail */
  .product_item div.container_info_detail .product_detail {
    display: none;
  }
  /* detail mobile */
  .product_item div.wrapper_product_detail {
    display: flex;
    width: 100%; 
    /* 304px */
    height: fit-content;
    /* max-height: 100%; */
    flex-direction: column;
  }
  .wrapper_product_detail div.container_product_detail{
    display: flex;
    width: 100%;
    height: fit-content;
    /* flex-direction: column; */
  }
  /* detail text */
  .wrapper_product_detail div.container_product_detail div.product_detail{
    display: flex;
    width: 224px;
    height: 56px;
    flex-direction: column;
    padding: 4px 12px;
    gap: 4px
  }
  /* item name */
  .wrapper_product_detail div.container_product_detail div.product_detail >h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#212121;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  /* item style and variance */
  .wrapper_product_detail div.container_product_detail div.product_detail >div{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 4px;
  }
  .wrapper_product_detail div.container_product_detail div.product_detail >div p{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color:#212121;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }
  .wrapper_product_detail div.container_product_detail div.product_detail >div h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color:#212121;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  /* detail price */
  .wrapper_product_detail div.container_product_detail div.price_each{
    display: flex;
    width: 80px;
    height: 52px;
    justify-content: end;
    align-items: center;
    padding: 16px 0px 16px 12px;
  }
  .wrapper_product_detail div.container_product_detail .price_each h6{
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#616161;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: end;
  }

  /* price qty */
  .wrapper_product_detail div.container_price_qty{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
  }
  /* qty */
  .wrapper_product_detail div.container_price_qty .product_quantity{
    display: flex;
    width: fit-content;
    min-width: 95px;
    max-width: 100%;
    height: 36px;
    padding: 6px 12px;
  }
  .wrapper_product_detail div.container_price_qty .product_quantity >input{
    display: flex;
    width: 24px;
    max-width: 90px;
    height: 24px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 0px;
    border: 1px solid #E0E0E0;
  }
  .wrapper_product_detail div.container_price_qty .product_quantity >button{
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid #E0E0E0;
    cursor: pointer;
  }
  .wrapper_product_detail div.container_price_qty .product_quantity button.reduce{
    border-right:0px ;
    border-radius:4px 0px 0px 4px;
  }
  .wrapper_product_detail div.container_price_qty .product_quantity button.add{
    border-left:0px ;
    border-radius:0px 4px 4px 0px;
  }
  /* total price */
  .wrapper_product_detail div.container_price_qty div.product_total{
    display: flex;
    width: 100px;
    height: 36px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
  }
  .wrapper_product_detail div.container_price_qty div.product_total >h6{
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: 14px;
    font-weight: 400;
    color:#26AC34;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  /* bin */
  .wrapper_product_detail div.container_price_qty div.product_delete{
    display: flex;
    width:32px;
    height: 36px;
    padding: 8px 0px 8px 12px;
  }
  .wrapper_product_detail div.container_price_qty div.product_delete >button{
    display: flex;;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .wrapper_product_detail div.container_price_qty div.product_delete >button svg{
    width: 100%;
    height: auto
  }
  /* price qty reduce window */
  .product_item div.container_info_price {
    display: none;
  }

}

/* .wrapper_summary {
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  padding: 12px 20px;
  flex-direction: column;
  background-color: #fff;
  justify-content: start;
  align-items: center;
  gap: 12px;
}

.summary {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 12px;
}

.summary h4 {
  display: flex;
  width: 100%;
  height: 24px;
  font-weight: 700;
  font-size: 16px;
  color: #212121;
  align-items: center;
  justify-content: start;
}

.summary_list {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 4px;
}

.summary_list .summary_item {
  display: flex;
  width: 100%;
  height: 20px;
  justify-content: space-between;
}

.summary_item h6 {
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #616161;
}

.summary_item p {
  width: 108px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  color: #212121;
  text-align: end;
}

.total {
  display: flex;
  width: 100%;
  height: 32px;
  padding-top: 12px;
  border-top: 1px solid;
  border-color: #eeeeee;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.total h6 {
  width: fit-content;
  height: fit-content;
  font-size: 14px;
  font-weight: 700;
  color: #212121;
}

.total p {
  width: 108px;
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  text-align: end;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #26ac34;
}

.wrapper_summary > button {
  display: flex;
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 4px;
  padding: 4px;
  background-color: #26ac34;
  box-shadow: 0px 1px 2px 0px #0000000d;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
} */
</style>
