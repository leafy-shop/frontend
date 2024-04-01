<script setup>
import BaseMenu from "../components/BaseMenu.vue";
import BaseFooter from "../components/BaseFooter.vue";
import { useRouter } from "vue-router";
import { onBeforeMount, ref, computed } from "vue";
import fetch from "../JS/api";
import cookie from "../JS/cookie";
//link
const myRouter = useRouter();
const goHome = () => myRouter.push({ name: "Home" });
let origin = `${import.meta.env.VITE_BASE_URL}`;

// common attribute
const carts = ref([]);
const count = ref(0);
const qty = ref(0);
const addressDefaultId=ref('')
const userName=ref('')

const getCarts = async () => {
  let cartList = await fetch.getCart();
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
  if(status){
    data.map(x=>{ //assign default address
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
  carts.value.carts.forEach((cart) =>
    cart.cartOwner.forEach((detail) => {
      if (detail.isSelected) selectedCart.push(detail.cartId);
    })
  );
  console.log(selectedCart);
  // fetch
  let cartData={
    carts : selectedCart,
    addressId : addressDefaultId.value
  }
  let {status,msg} =await fetch.BuyNow(cartData)
  if(status){
    console.log('buy successful')
    await getCarts()
  }else{
    console.log('can not buy')
  }
};

// clear state ment

// confirmation delete
const reduceQty = async (cartId, qty) => {
  await fetch.getUpdateCart(cartId, { qty: qty - 1 });
  await getCarts();
};

const addQty = async (cartId, qty) => {
  // console.log(qty)
  await fetch.getUpdateCart(cartId, { qty: qty + 1 });
  await getCarts();
};

const deleteCart = async (cartId) => {
  await fetch.deleteCart(cartId);
  await getCarts();
};

onBeforeMount(async() => {
  userName.value=cookie.decrypt().username
  await getAddress()
  await getCarts();
});
</script>
<template>
  <BaseMenu class="menu" />
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
    <h5 @click="goShop" class="link">Cart</h5>
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
            <div>
              <h5>
                <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aut unde saepe nam, facere recusandae iure fugit. Enim esse consectetur, quaerat veniam possimus qui commodi neque, dolorem at quibusdam nulla temporibus eveniet atque provident praesentium illum sint dicta, alias fuga dolores? Fuga impedit itaque incidunt unde repudiandae vero quaerat, iste facilis asperiores numquam debitis, minus nostrum dignissimos dolorum iusto ea qui dolore alias temporibus? Omnis accusamus autem quisquam corporis, nemo quia amet quos hic necessitatibus magni eos perspiciatis nulla alias voluptas quae aspernatur eum voluptates, modi eveniet! Fuga ullam, alias incidunt excepturi vel quos molestiae unde aspernatur natus vero eveniet ipsa? Blanditiis qui harum illo ex quia. Et qui, perspiciatis sed dolore voluptas excepturi tempora facere accusantium facilis eos, cumque est. Aspernatur, est? Velit recusandae quo in! Ullam, itaque a. Praesentium fuga numquam rerum, nam obcaecati optio adipisci eligendi ad delectus quae mollitia placeat iste illo sit voluptates eaque accusamus? -->
                {{ shop.itemOwner }}
              </h5>
              <div>
                <svg
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
                </svg>
              </div>
            </div>
          </div>
          <!-- product list -->
          <div class="product_list" v-for="detail in shop.cartOwner">
            <!-- product item -->
            <div class="product_item">
              <div>
                <!-- select -->
                <div class="product_selection">
                  <input
                    type="checkbox"
                    name=""
                    id=""
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
                  <h6>Polyscias Fabian</h6>
                  <!-- variance selection -->
                  <label :for="`variation_${index}`">
                    <p>Variation :&nbsp;</p>
                    <select :id="`variation_${index}`">
                      <option value="">variation</option>
                    </select>
                  </label>
                </div>
              </div>
              <div>
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
                      <svg
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
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- summary -->
      <div class="wrapper_summary">
        <div class="summary">
          <!-- header -->
          <h4>Order Summary</h4>
          <!-- summary list -->
          <div class="summary_list">
            <!--subtotal  -->
            <div class="summary_item">
              <h6>Subtotal</h6>
              <p class="money_bath">฿{{ carts.total }}</p>
            </div>
            <!-- Shipping -->
            <div class="summary_item">
              <h6>Shiping</h6>
              <p class="money_bath">฿{{ carts.shipping }}</p>
            </div>
            <!-- Tax -->
            <div class="summary_item">
              <h6>Tax</h6>
              <p class="money_bath">฿{{ carts.tax }}</p>
            </div>
          </div>
          <!-- total -->
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
        <!-- submit -->
        <button @click="checkOrder">Check Out ({{ countCheckOut }})</button>
      </div>
    </div>
  </div>
  <BaseFooter />
</template>
<style scoped>
* {
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

.wrapper_cart {
  display: flex;
  width: 100%;
  height: fit-content;
  min-height: 90dvh;
  max-height: 200dvh;
  flex-direction: column;
  padding: 20px 160px;
  gap: 20px;
  background-color: #f5f5f5;
}

.cart {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 16px;
}

.header_cart {
  display: flex;
  width: 100%;
  height: 52px;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  border: none;
  border-radius: 8px;
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
  width: 16px;
  height: 16px;
  accent-color: #168a22;
}

/* amount of shop */
.header_cart > div:nth-child(1) {
  gap: 16px;
}

.header_cart > div:nth-child(1) h4 {
  display: flex;
  height: 28px;
  font-size: 18px;
  font-weight: 700;
  color: #212121;
  /* justify-content: center; */
  align-items: center;
}

.header_cart > div:nth-child(1) h4 span {
  display: flex;
  height: 100%;
  font-size: 18px;
  font-weight: 400;
  color: #616161;
  align-items: center;
}

/* typ of unit */
.header_cart > div:nth-child(2) {
  display: flex;
  width: 360px;
  height: 100%;
  /* gap: 16px; */
  align-items: center;
}

.header_cart > div:nth-child(2) h5 {
  display: flex;
  width: auto;
  height: fit-content;
  font-size: 14px;
  font-weight: 400;
  color: #616161;
  justify-content: center;
  align-items: center;
}

.header_cart > div:nth-child(2) h5:nth-child(1),
.header_cart > div:nth-child(2) h5:nth-child(3) {
  width: 100px;
}

.header_cart > div:nth-child(2) h5:nth-child(2) {
  width: 128px;
}

/* shop */
.shop_list {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 16px;
}

.shop_item {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  gap: 12px;
  padding: 20px 0px 8px 0px;
  box-shadow: 0px 1px 2px 0px #0000000f;
}

/* header */
.header_shop {
  display: flex;
  width: 100%;
  height: 36px;
  border-bottom: 1px solid;
  border-color: #eeeeee;
  align-items: center;
  padding: 0px 20px 12px 20px;
  gap: 16px;
}

.header_shop .shop_selection {
  display: flex;
  width: fit-content;
  height: fit-content;
}

.header_shop input {
  width: 16px;
  height: 16px;
  accent-color: #168a22;
}

.header_shop > div {
  display: flex;
  width: 100%;
  height: fit-content;
}

.header_shop > div h5 {
  width: fit-content;
  max-width: 80%;
  font-size: 16px;
  font-weight: 700;
  color: #212121;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header_shop > div div {
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
}

/* product list */
.product_list {
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 0px 20px;
}

.product_item {
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  /* border-top: 1px solid;
    border-color: #EEEEEE; */

  padding-bottom: 12px;
}

.product_item > div {
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
}

/* left of item detail */
.product_item > div:nth-child(1) div {
  width: auto;
  height: 100%;
}

/* selection */
.product_item > div:nth-child(1) .product_selection {
  display: flex;
  width: 32px;
  height: 100%;
  justify-content: start;
  align-items: center;
}

.product_item > div:nth-child(1) .product_selection input {
  width: 16px;
  height: 16px;
  accent-color: #168a22;
}

/* img */
.product_item > div:nth-child(1) .product_img {
  display: flex;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  overflow: hidden;
}

.product_item > div:nth-child(1) .product_img img {
  width: 100%;
  height: auto;
}

/* detail */
.product_item > div:nth-child(1) .product_detail {
  display: flex;
  width: 100%;
  /* max-width: 100%; */
  height: 100%;
  flex-direction: column;
  padding: 4px 12px;
  gap: 4px;
}

.product_item > div:nth-child(1) .product_detail h6 {
  width: fit-content;
  max-width: 100%;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #212121;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item > div:nth-child(1) .product_detail label {
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 24px;
  padding: 4px 8px 4px 12px;
  background-color: #f5f5f5;
  align-items: center;
  border: none;
  border-radius: 4px;
}

.product_item > div:nth-child(1) .product_detail label:focus-within {
  outline: auto;
}

.product_item > div:nth-child(1) .product_detail label p {
  display: flex;
  width: 55px;
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: #616161;
  white-space: nowrap;
}

.product_item > div:nth-child(1) .product_detail label select {
  display: flex;
  width: 100%;
  height: 16px;
  font-size: 12px;
  font-weight: 400px;
  color: #616161;
  border: none;
  outline: none;
  background-color: transparent;
}

/* right price quantity total */
.product_item > div:nth-child(2) {
  display: flex;
  width: fit-content;
  height: fit-content;
  align-items: center;
}

.product_item > div:nth-child(2) .product_price {
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;
  color: #616161;
  font-size: 14px;
  font-weight: 400;
}

.product_item > div:nth-child(2) .product_quantity {
  display: flex;
  width: 128px;
  height: 100%;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
}

.product_item > div:nth-child(2) .product_quantity div {
  display: flex;
  width: 100%;
  height: 36px;
  border: 1px;
  /* border-radius: 4px; */
  /* overflow: hidden; */
  justify-content: center;
  align-items: center;
  border: 1px solid;
  /* border-color: #E0E0E0; */
  box-shadow: 0px 4px 40px 0px #04060f14;
}

.product_item > div:nth-child(2) .product_quantity button {
  display: flex;
  width: 32px;
  height: 100%;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  cursor: pointer;
  box-shadow: none;
  background-color: #fff;
  z-index: 4;
  border-color: #e0e0e0;
  /* border-color: transparent; */
}

.product_item > div:nth-child(2) .product_quantity .reduce {
  border-right: none;
  border-radius: 4px 0px 0px 4px;
}

.product_item > div:nth-child(2) .product_quantity .add {
  border-left: none;
  border-radius: 0px 4px 4px 0px;
}

.product_item > div:nth-child(2) .product_quantity input {
  display: flex;
  width: 100%;
  /* min-width: 32px; */
  height: 100%;
  border-color: #e0e0e0;
  border: 1px solid;
  background-color: #fff;
  padding: 8px 12px;
  outline: none;
  box-shadow: 0px;
  z-index: 5;
  border-color: #e0e0e0;
}

.product_item > div:nth-child(2) .product_total {
  /* display: flex; */
  width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;
  color: #26ac34;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product_item > div:nth-child(2) .product_delete {
  display: flex;
  width: 32px;
  height: 100%;
  /* padding: 16px, 0px, 16px, 12px; */
  justify-content: end;
  align-items: center;
}

.product_item > div:nth-child(2) .product_delete button {
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.product_item > div:nth-child(2) .product_delete button svg {
  width: 13px;
  height: auto;
}

.wrapper_summary {
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
  /* display: flex; */
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
  /* flex-direction: column; */
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
}
</style>
