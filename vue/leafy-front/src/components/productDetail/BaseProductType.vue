<script setup>
import { ref, computed, onUpdated, onMounted } from "vue";
import { useRouter } from "vue-router";
import validation from "../../JS/validation";
import BaseStar from "./BaseStar.vue";
import fetch from "./../../JS/api";
import cookie from "./../../JS/cookie";
import BaseAlert from "../BaseAlert.vue";
let origin = `${import.meta.env.VITE_BASE_URL}`;

const emit = defineEmits(["styleSelected","addToCart"]);

let props = defineProps({
  productStyle: {
    type: Object,
    default: {},
    required: true,
  },
  selectedStyle: {
    type: Object,
    default: {},
    required: true,
  },
  changeStyle: {
    type: Function,
    required: true,
  },
  itemOwner:{
    type:String,
    required:true,
    default:''
  }
});
//common attribute
const sizeObj = ref({}); // this for store style

let stepInput = ref(1);
let slideImage = ref(0);
let maxImage = ref(0);
const userName = ref("");
// link
const myRouter = useRouter();
const goCartList = () => myRouter.push({ name: "CartList" });
const goPayment = (cartList) =>
  myRouter.push({
    name: "Payment",
    params: { cartList: validation.encrypt(cartList) },
  });
const goSignIn = () => myRouter.push({ name: "SignIn" });

// attribute alert
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

let detectNumber = (input) => {
  // console.log(input.target.value)

  // Remove any non-digit characters
  const sanitizedInput = input.target.value.replace(/\D/g, "");
  // console.log(sanitizedInput)

  // Parse the input as a number
  const parsedNumber = parseInt(sanitizedInput);
  // console.log(sanitizedInput)

  // Check if the parsed number is a valid positive number
  if (!isNaN(parsedNumber) && parsedNumber > selectedStyle.value.stock) {
    stepInput.value = selectedStyle.value.stock;
  } else if (!isNaN(parsedNumber) && parsedNumber > 0) {
    stepInput.value = parsedNumber;
  } else {
    stepInput.value = 1;
  }
};

let rightAdd = () => {
  // console.log(sizeObj.value);
  stepInput.value =
    stepInput.value < sizeObj.value.stock
      ? stepInput.value + 1
      : stepInput.value;
};

let leftSubstract = () => {
  // console.log(stepInput.value > 1);
  stepInput.value = stepInput.value > 1 ? stepInput.value - 1 : stepInput.value;
};

const itemOwner=computed(()=>props.itemOwner)

let productStyle = computed(() => {
  console.log(props.productStyle,"helllllll")
  // console.log(props.selectedStyle,'asldfjal;sdfjlasd')
  return props.productStyle;
});

let selectedStyle = computed(() => {
  console.log(props.selectedStyle, "tttttt");
  // if props of selected style have size
  //
  //   props.selectedStyle.size = props.selectedStyle.sizes[0].size;
  //   props.selectedStyle.price = props.selectedStyle.sizes[0].price;
  //   props.selectedStyle.stock = props.selectedStyle.sizes[0].stock;
  //   console.log(props.selectedStyle, "sizesize");
  //
  if (props.selectedStyle.sizes) {
    sizeObj.value = {
      style: props.selectedStyle.style,
      stock: props.selectedStyle.sizes[0].stock,
      size: props.selectedStyle.sizes[0].size,
      price: props.selectedStyle.sizes[0].price,
    };
  }
  // style:props.selectedStyle.style,
  // sizes:[

  // ]
  // }
  stepInput.value = 1;
  slideImage.value = 0;
  maxImage.value =
    props.selectedStyle.images == undefined ||
    props.selectedStyle.images.length < 1
      ? 1
      : props.selectedStyle.images.length - 1;
  console.log(props.selectedStyle, "T-T");
  return props.selectedStyle;
});

let addToCart = async () => {
  if (userName.value != undefined) {
    // console.log(productStyle.value, 'product style')
    // console.log(selectedStyle.value,'seleced style')
    // console.log(selectedStyle.value, "selected style");
    // console.log(productStyle.value, "selected style");
    if(stepInput.value<=sizeObj.value.stock&&stepInput.value>0){
      return emit("addToCart", productStyle.value.itemId, selectedStyle.value.style, sizeObj.value.size, stepInput.value)
    }else{
      alertType.value=2
      alertDetail.value="It seems like the item is currently out of stock."
      isShowAlert.value=true
      alertTime.value=3
    }
    // console.log("cart", cart);
    // console.log(cart);
    // let { status, msg } = await fetch.addToCart(cart);

    
    // console.log(status);
    // if (status) {
    //   if (movePage) {
    //     //move to cartlist
    //     // goCartList();
    //   }
    //   //do something
    // } else {
    //   // error
    // }
  } else {
    //go sign in
    goSignIn();
  }
};

// let addressDefaultId = ref("");
// get address
// const getAddress = async (userName) => {
//   let { status, data } = await fetch.getAllAddress(userName);
//   if (status) {
//     data.map((x) => {
//       //assign default address
//       if (x.isDefault) {
//         addressDefaultId.value = x.addressId;
//       }
//     });
//     console.log(addressDefaultId.value);
//   }
// };

// direct to payment page
let payInOrder = async () => {
  if (userName.value != undefined) {
    if(Number(sizeObj.value.stock)!=0&&stepInput.value <= sizeObj.value.stock){ //stock not 0
      let paymentOrder = [
        {
          //array
          shopName:itemOwner.value,
          orderTotal:Number(stepInput.value)*Number(sizeObj.value.price),
          order_detail:[
            {
              itemId: productStyle.value.itemId, //(use)
              image:productStyle.value.image,
              itemStyle: selectedStyle.value.style, //style (use)
              itemname:productStyle.value.name,//name
              priceEach:Number(sizeObj.value.price), //price
              qtyOrder:Number(stepInput.value), //qty (use)
              itemSize: sizeObj.value.size, //(use) //size
              stock: sizeObj.value.stock,
            }
          ],
          // addressId: addressDefaultId.value,
          
        },
      ];
      console.log(sizeObj.value)
      let inputData={
        isBuyNow:true,
        dataList:paymentOrder
      }
      // console.log(JSON.stringify(paymentOrder).toString()) //convert to json
      // check stock
      console.log(stepInput.value)
      console.log(sizeObj.value)
      if (stepInput.value<=sizeObj.value.stock&&stepInput.value>0) {
        goPayment(JSON.stringify(inputData).toString()); //tranform data to text
        // console.log(selectedStyle.value)
      } else {
        //error can not buy
        
      }
    }else{
      // stock 0
      alertType.value=2
      alertDetail.value="Oops! It seems like the item is currently out of stock."
      isShowAlert.value=true
      alertTime.value=3
    }
    // await fetch.BuyNowWithoutCart(paymentOrder);

    // if (status) {
    //   console.log("buy successful");
    // } else {
    //   console.log("can not buy");
    // }
  } else {
    //go sign in
    goSignIn();
  }
};

const selectedImage = (idx) => {
  console.log(idx,'testing')
  slideImage.value = idx
  // let element =document.getElementById("show_image_selected")
  // element.src=`${origin}/api/image/products/${productStyle.value.itemId}/${selectedStyle.value.style}/${selectedStyle.value.images[slideImage.value]}`
  // console.log('change image')
}

let selectedSize = (size) => {
  sizeObj.value = size; //for store size obj
  console.log(size, "sizes");
  // selectedStyle.value.price = size.price
  // selectedStyle.value.stock = size.stock
};

let imageLeft = () => {
  // console.log("T")
  slideImage.value = slideImage.value ? slideImage.value - 1 : slideImage.value;
};

let imageRight = () => {
  // console.log("T")
  slideImage.value =
    slideImage.value < maxImage.value ? slideImage.value + 1 : slideImage.value;
};

// const changeStyle=(index)=>{
//     return emit("styleSelected",index)
// }

// alert
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}


// show border what we selected
const selectedItemStyle=(name,index)=>{
  const element =document.getElementById(name)// style
  const allElement=document.getElementsByClassName('grid_item')// style

  // clear first
  for(let element of allElement){
    element.classList.remove('item_style_active')
  }
  if(element!=undefined&&element!=null){
    element.classList.add('item_style_active')

  }
  selectedItemSize('item_size_0')
  if(index!=undefined){
    props.changeStyle(index)
    // selectedItemSize('item_size_0')
  }
}
// size
const selectedItemSize=(name,value)=>{
  const element =document.getElementById(name)
  const allElement=document.getElementsByClassName('size_btn')
  for(let element of allElement){
    element.classList.remove('item_size_active')
  }
  if(element!=undefined&&element!=null){
  element.classList.add('item_size_active')
  }
  if(value!=undefined){
    selectedSize(value)
  }
}

onMounted(() => {
  // validation.ratingStar("star_item","path",productStyle.value.ratingFloor)
  userName.value = cookie.get("information")
    ? cookie.decrypt().username
    : undefined;
    selectedItemStyle(`item_style_0`)

    // selectedItemSize('item_size_0')
  // first selected
  // if (userName.value !== undefined) getAddress(userName.value);
});
onUpdated(() => {
  // validation.ratingStar(productStyle.value.totalRating)
  // console.log(props.productStyle,'product style')
  console.log(props.selectedStyle, "style selected");
  console.log(sizeObj.value, "size selected");
  // selectedItemStyle(`item_style_0`)

});
</script>
<template>
  <div class="wrapper_Product_type">
    <div class="images">
      <div class="styles">
        <ul>
          <li
            v-if="
              selectedStyle.images &&
              selectedStyle.images.length &&
              Object.keys(selectedStyle).length != 0 &&
              selectedStyle.images.length &&
              selectedStyle.images.length != 1
            "
            v-for="(value, idx) in selectedStyle.images"
            :key="idx"
          >
            <button v-if="selectedStyle.stock" @click="selectedImage(idx)">
              <img
                v-if="selectedStyle.images.length == 0"
                src="../../assets/default_image.png"
                alt="image_style"
                draggable="false"
                loading="lazy"
              />
              <img
                v-else
                :src="`${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${value}`"
                alt="image_style"
                draggable="false"
                loading="lazy"
              />
            </button>
            <button v-else @click="selectedImage(idx)">
              <img
                v-if="selectedStyle.images.length == 0"
                src="../../assets/default_image.png"
                alt="image_style"
                draggable="false"
                loading="lazy"
              />
              <img
                v-else
                :src="`${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${value}`"
                alt="image_style"
                draggable="false"
                loading="lazy"
              />
            </button>
          </li>
        </ul>
      </div>

      <div class="show_image">
        <img
          v-if="selectedStyle.images && selectedStyle.images.length"
          :src="`${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${selectedStyle.images[slideImage]}`"
          alt="image_style"
          id="show_image_selected"
          draggable="false"
                loading="lazy"
        />
        <!-- <img
          v-if="selectedStyle.images && selectedStyle.images.length"
          :src="`${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${selectedStyle.images[slideImage]}`"
          alt="image_style"
          draggable="false"
        /> -->
        <!-- <img v-else-if="productStyle.image && selectedStyle.images" :src="`${origin}/api/image/products/${productStyle.itemId}/${productStyle.image}`" alt="image_style"> -->
        <!-- <img v-else-if="selectedStyle.images && selectedStyle.images.length === 0" src="../../assets/vue.svg" alt="image_style"> -->
        <img v-else src="../../assets/default_image.png" alt="image_style" draggable="false" loading="lazy" />
        <!-- {{ productStyle }} -->
        <div
          v-show="
            selectedStyle.images !== undefined &&
            selectedStyle.images.length > 1
          "
        >
          <button @click="imageLeft">
            <!-- <img src="../../assets/home_p/icon/left.png" alt="previous"> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12.4001 15.5997L6.80011 9.99966L12.4001 4.39966"
                stroke="#212121"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button @click="imageRight">
            <!-- <img src="../../assets/home_p/icon/right.png" alt="next"> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.6001 4.39966L13.2001 9.99966L7.6001 15.5997"
                stroke="#212121"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="container_information">
      <div class="information_header">
        <h4>
          {{ productStyle.name }}
        </h4>
        <!-- <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_3219_22258"
            style="mask-type: luminance"
            maskUnits="userSpaceOnUse"
            x="2"
            y="3"
            width="21"
            height="20"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 3H22.4725V22.501H2V3Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_3219_22258)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.82371 12.1231C5.22571 16.4851 10.7647 20.0121 12.2367 20.8851C13.7137 20.0031 19.2927 16.4371 20.6497 12.1271C21.5407 9.34112 20.7137 5.81212 17.4277 4.75312C15.8357 4.24212 13.9787 4.55312 12.6967 5.54512C12.4287 5.75112 12.0567 5.75512 11.7867 5.55112C10.4287 4.53012 8.65471 4.23112 7.03771 4.75312C3.75671 5.81112 2.93271 9.34012 3.82371 12.1231ZM12.2377 22.5011C12.1137 22.5011 11.9907 22.4711 11.8787 22.4101C11.5657 22.2391 4.19271 18.1751 2.39571 12.5811C2.39471 12.5811 2.39471 12.5801 2.39471 12.5801C1.26671 9.05812 2.52271 4.63212 6.57771 3.32512C8.48171 2.70912 10.5567 2.98012 12.2347 4.03912C13.8607 3.01112 16.0207 2.72712 17.8867 3.32512C21.9457 4.63412 23.2057 9.05912 22.0787 12.5801C20.3397 18.1101 12.9127 22.2351 12.5977 22.4081C12.4857 22.4701 12.3617 22.5011 12.2377 22.5011Z"
              fill="#FF5E65"
            />
          </g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.1537 10.6248C17.7667 10.6248 17.4387 10.3278 17.4067 9.93578C17.3407 9.11378 16.7907 8.41978 16.0077 8.16678C15.6127 8.03878 15.3967 7.61578 15.5237 7.22278C15.6527 6.82878 16.0717 6.61478 16.4677 6.73878C17.8307 7.17978 18.7857 8.38678 18.9027 9.81378C18.9357 10.2268 18.6287 10.5888 18.2157 10.6218C18.1947 10.6238 18.1747 10.6248 18.1537 10.6248Z"
            fill="#FF5E65"
          />
        </svg> -->
      </div>
      <div class="information_details">
        <!-- for show rating and sold -->
        <div class="rating_list">
          <div class="rating_item">
            <p>
              {{ productStyle.rating }}
            </p>
            <BaseStar
              :rating="productStyle.rating"
              :size="100"
              name="product"
            />
            <!-- <div class="star_list">
                            <svg v-for="(star,index) in 5" :key="index" xmlns="http://www.w3.org/2000/svg" class="star_item"   width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path 
                                    d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                                     />
                            </svg>
                        </div> -->
          </div>
          <p>{{ productStyle.sold }} sold</p>
        </div>
        <!-- for show price -->
        <div class="price">
          <h3>
            ฿<span>
              {{ sizeObj.price }}
            </span>
          </h3>
        </div>
        <!-- for show type -->
        <div class="grid_container">
          <button
            @click="selectedItemStyle(`item_style_${index}`,index)"
            v-for="(style, index) in productStyle.styles"
            class="grid_item " 
            :id="`item_style_${index}`"
            :key="index" :disabled="(style.sizes.length==1)&&(style.sizes[0].stock==0)" :style="[(style.sizes.length==1)&&(style.sizes[0].stock==0)?'background-color:#00000066;cursor:not-allowed;':'']"
          >
            <div class="product_img" :style="[(style.sizes.length==1)&&(style.sizes[0].stock==0)?'border:1px solid #FF5E65;':'']">
              <img
                v-if="style.images && style.images.length" :style="[(style.sizes.length==1)&&(style.sizes[0].stock==0)?'filter: grayscale(90%);':'']"
                :src="`${origin}/api/image/products/${productStyle.itemId}/${style.style}/${style.images[0]}`"
                alt="product_style" draggable="false" loading="lazy"
              />
              <img v-else src="../../assets/default_image.png" alt="product_style" draggable="false" loading="lazy"   />
            </div>
            <!-- {{ style }} -->
          </button>
        </div>
        <!-- button for select style -->
        <div
          v-if="selectedStyle.sizes && selectedStyle.sizes.length > 1"
          class="sizes"
        >
          <h6>Size</h6>
          <ul>
            <li v-for="(value, idx) in selectedStyle.sizes" :key="idx" >
              <button @click="selectedItemSize(`item_size_${idx}`,value)" :id="`item_size_${idx}`" class="size_btn" :disabled="value.stock==0" :style="[value.stock==0?'background-color: #00000066;color:#fff;cursor:not-allowed;':'']">
                {{ value.size }}
              </button>
            </li>
          </ul>
        </div>
        <!-- for select quantity and show stock -->
        <div class="stocks">
          <h6>Quantity</h6>
          <div class="stocks_list">
            <button class="reduce" @click="leftSubstract">-</button>
            <input type="text" @input="detectNumber" v-model="stepInput" />
            <button class="add" @click="rightAdd">+</button>
          </div>
          <p :style="[sizeObj.stock==0?'color:#F75555':'']">
            {{ sizeObj.stock }} pieces avaliable
          </p>
        </div>
      </div>
      <div class="wrapper_apply_buy">
        <button @click="addToCart()">Add to Cart</button>
        <button @click="payInOrder()">Buy Now</button>
      </div>
    </div>

  </div>
  <BaseAlert name="product_detail_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"  />

</template>
<style scoped>
* {
  box-sizing: border-box;
}

.wrapper_Product_type {
  display: flex;
  /* width: min(77.778dvw, 1120px); */
  /* height: fit-content; */
  /* height: min(33.611dvw, 484px); */
  height: fit-content;
  padding: min(1.389dvw, 20px);
  gap: min(1.389dvw, 20px);
  background-color: #fff;
  border-radius: min(0.556dvw, 8px);
}

.images {
  display: flex;
  /* width: min(27.5dvw, 396px); */
  width: fit-content;
  height: min(30.833dvw, 444px);
  gap: min(0.833dvw, 12px);
}

.styles {
  width: fit-content;
  height: inherit;
  overflow-y: auto;
}

.styles ul {
  display: flex;
  flex-direction: column;
  width: inherit;
  height: fit-content;
  gap: min(0.556dvw, 8px);
}
.styles ul li {
  list-style: none;
  width: min(5.556dvw, 80px);
  height: min(5.556dvw, 80px);
}

.styles ul li button {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: min(0.278dvw, 4px);
  background-color: rgb(196, 196, 196);
  cursor: pointer;
}

.styles ul li button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.styles::-webkit-scrollbar {
  display: none;
}

.show_image {
  display: flex;
  width: min(21.111dvw, 304px);
  /* width: 100%; */
  height: min(30.833dvw, 444px);
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: min(0.278dvw, 4px);
  background-color: transparent;
  overflow: hidden;
}

.show_image div {
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: min(0.833dvw, 12px);
  position: absolute;
  gap: min(0.556dvw, 8px);
  right: 0;
  bottom: 0;
}

.show_image div button {
  display: flex;
  width: min(2.222dvw, 32px);
  height: min(2.222dvw, 32px);
  border-radius: 50%;
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* flex-grow: 1; */
}
.show_image div button svg {
  width: min(1.389dvw, 20px);
  height: min(1.389dvw, 20px);
  object-fit: cover;
}
.show_image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.container_information {
  display: flex;
  /* width: fit-content; */
  /* width: min(46.111dvw, 664px); */
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: min(1.111dvw, 16px);
}

.information_header {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
}
.information_header h4 {
  width: inherit;
  height: inherit;
  font-size: min(1.667dvw, 24px);
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: normal;
  line-height: 152%;
  color: #212121;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.information_header svg {
  display: flex;
  width: min(21.667dvw, 24px);
  height: min(21.667dvw, 24px);
}
.information_details {
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: min(1.111dvw, 16px);
  /* background-color: aquamarine; */
}
.rating_list {
  display: flex;
  width: 100%;
  height: fit-content;
  gap: min(0.556dvw, 8px);
  font-size: min(0.833dvw, 12px);
  align-items: center;
  text-align: center;
  color: #212121;
}
.rating_item {
  display: flex;
  gap: min(0.278dvw, 4px);
  padding-right: min(0.556dvw, 8px);
  border-right: min(0.069dvw, 1px) solid;
  border-color: #e0e0e0;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: min(0.833dvw, 12px);
  letter-spacing: min(0.014dvw, 0.2px);
  color: #212121;
}
.rating_item p {
  width: fit-content;
  height: inherit;
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  text-decoration: underline;
}
.price {
  display: flex;
  width: 100%;
  height: min(3.333dvw,48px);
  align-items: center;
}
.price h3 {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  font-size: min(2.222dvw, 32px);
  font-weight: 400;
  color: #26ac34;
}
.grid_container {
  /* display: grid; */
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  /* grid-template-columns: auto auto auto auto auto auto auto ; */
  gap: min(0.556dvw, 8px);
}
/* active */
.item_style_active{
  border: 1px solid #26AC34 !important;
  filter: drop-shadow(0px min(0.069dvw,1px) min(0.208dvw,3px) rgba(0, 0, 0, 0.1)) drop-shadow(0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06));
}
.grid_item {
  display: flex;
  /* width: min(v-bind(changeSize(6.111,'dvw')),v-bind(changeSize(88)));
    height: min(v-bind(changeSize(6.111,'dvw')),v-bind(changeSize(88))); */
  width: min(6.111dvw, 88px);
  height: min(6.111dvw, 88px);
  flex-direction: column;
  border-radius: min(0.278dvw, 4px);
  overflow: hidden;
  border: none;
  cursor: pointer;
  box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px rgba(0, 0, 0, 0.05);
}
.grid_item:hover {
  border: min(0.069dvw,1px) solid #26AC34;
  filter: drop-shadow(0px min(0.069dvw,1px) min(0.208dvw,3px) rgba(0, 0, 0, 0.1)) drop-shadow(0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06));
}
.product_img {
  display: flex;
  width: 100%;
  height: min(6.111dvw, 88px);
  /* height: min(v-bind(changeSize(15.278,'dvw')),v-bind(changeSize(220))); */
  overflow: hidden;
  justify-content:center;
  align-items:center;
}
.product_img img{
  width:100%;
  height:100%;
  object-fit: cover;
}
/* .grid_container button {
    width: min(6.111dvw, 88px);
    height: min(6.111dvw, 88px);
    border-radius: min(0.278dvw, 4px);
}
.grid_container button img {
    width: max-content;
    height: min-content;
} */
.stocks {
  display: flex;
  width: 100%;
  height: min(2.5dvw,36px);
  align-items: center;
  text-align: center;
  gap: min(0.556dvw, 8px);
}
.stocks h6 {
  display: flex;
  width: min(5.556dvw,80px);
  height: fit-content;
  font-size: min(1.111dvw, 16px);
  color: #616161;
  font-weight: 400;
}
.stocks p {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  font-size: min(0.972dvw, 14px);
  letter-spacing: min(0.014dvw, 0.2px);
  color: #9e9e9e;
}
.stocks_list {
  display: flex;
  width: fit-content;
  height: min(2.5dvw,36px);
  border-radius: min(0.278dvw,4px);
  /* overflow: hidden; */
  /* border: min(0.069dvw,1px); */
  /* border-color: #E0E0E0; */
  /* border: 1px solid #E0E0E0; */
  align-items: center;
  justify-content: center;
}

.stocks_list input {
  display: flex;
  width: fit-content;
  min-width: min(2.778dvw,40px);
  max-width: min(6.944dvw,100px);
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
.stocks_list input:hover{
  background-color: #F5F5F5;
}
.stocks_list >button {
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
}
.stocks_list button:hover{
  background-color: #F5F5F5;
}
.stocks_list >button {
  /* border-right: none;
  border-radius: min(0.278dvw,4px) 0px 0px min(0.278dvw,4px); */
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  font-weight: 500;
  color: #212121;
}
.stocks_list .reduce {
  border-right: none;
  border-radius: min(0.278dvw,4px) 0px 0px min(0.278dvw,4px);
}
.stocks_list .add {
  border-left: none;
  border-radius: 0px min(0.278dvw,4px) min(0.278dvw,4px) 0px;
} 
.sizes {
  display: flex;
  width: fit-content;
  max-width: 100%;
  height: min(2.5dvw,36px);
  gap: min(0.556dvw,8px);
  justify-content: center;
  align-items: center;
}
.sizes h6 {
  display: flex;
  width: min(5.556dvw,80px);
  height: fit-content;
  font-size: min(1.111dvw,16px);
  font-weight: 400;
}
.sizes ul {
  display: flex;
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  flex-wrap: wrap;
  list-style: none;
  gap: min(1.389dvw,20px);
}
.sizes li {
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: min(0.694dvw,10px);
}
.sizes li button {
  display: flex;
  width: fit-content;
  height: min(1.944dvw,28px);
  border: min(0.069dvw,1px) solid;
  border-color: #e0e0e0;
  border-radius: min(0.278dvw,4px);
  padding: min(0.278dvw,4px) min(0.833dvw,12px);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 400;
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  letter-spacing: min(0.014dvw,0.2px);
  background-color: #fff;
  color: #212121;
  box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px rgba(0, 0, 0, 0.05);
}
.sizes li button:hover {
  border-color: #26AC34;
}
.sizes li button:active {
  background-color: #58d264;
  color: #fff;
  border-color: #58d264;
}
/* size active */
.item_size_active{
  border: 1px solid #26AC34 !important;
}
.wrapper_apply_buy {
  display: flex;
  width: inherit;
  height: fit-content;
  /* flex-direction: column; */
  gap: min(0.833dvw, 12px);
}

.wrapper_apply_buy button:nth-child(1) {
  background: #fff;
  color: #26ac34;
  border: min(0.069dvw, 1px) solid;
  border-color: #26ac34;
  border-radius: min(0.278dvw, 4px);
  box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px rgba(0, 0, 0, 0.05);
}
.wrapper_apply_buy button:nth-child(1):hover {
  background-color: #EEFFF0;
  border-color: #26ac34;
}
.wrapper_apply_buy button:nth-child(1):active {
  border-color: #58d264;
  background: #58d264;
  color: #fff;
}
.wrapper_apply_buy button {
  display: flex;
  width: 100%;
  height: min(2.778dvw, 40px);
  background-color: #26ac34;
  color: white;
  border: min(0.069dvw, 1px) solid;
  border-color: #26ac34;
  border-radius: min(0.278dvw, 4px);
  font-size: min(1.111dvw, 16px);
  font-weight: 500;
  box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.wrapper_apply_buy button:hover {
  border-color: #168a22;
  background: #168a22;
}
.wrapper_apply_buy button:active {
  border-color: #58d264;
  background: #58d264;
}

/* mobile */
@media (width<=432px){
  .wrapper_Product_type {
    padding: 0px;
    gap: min(1.852dvw,8px);
    border-radius: 0px;
    flex-direction: column;
  }
  /* container img */
  .images {
    display: flex;
    /* width: min(27.5dvw, 396px); */
    width: auto;
    height: fit-content;
    gap: min(1.852dvw,8px);
    flex-direction: column-reverse;
  }
  /* img list of style */
  .styles {
    width: 100%;
    height: fit-content;
    overflow-x: auto;
  }
  .styles ul {
    display: flex;
    flex-direction: row;
    width: fit-content;
    height: fit-content;
    gap: min(1.852dvw,8px);
    padding: 0px min(4.63dvw,20px);
  }
  .styles ul li {
    width: min(12.037dvw,52px);
    height: min(12.037dvw,52px);
  }
  .styles ul li button {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: min(0.926dvw,4px);
  }
  .show_image {
    display: flex;
    width: 100%;
    height: min(87.963dvw,380px);
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 0px;
    background-color: rgb(50, 50, 50);
    overflow: hidden;
  }
  .show_image div {
    display: flex;
    width: 100%;
    height: 100%;
    padding: min(2.778dvw,12px);
    position: absolute;
    /* gap: min(0.556dvw, 8px); */
    justify-content: space-between;
    align-items: center;
    right: 0;
    bottom: 0;
  }
  .show_image div button {
    display: flex;
    width: min(8.333dvw,36px);
    height: min(8.333dvw,36px);
    border-radius: 50%;
    border: none;
  }
  .show_image div button svg {
    width: min(5.556dvw,24px);
    height: min(5.556dvw,24px);
    object-fit: cover;
  }
  /* product detail info */
  .container_information {
    gap: min(2.778dvw,12px);
    padding: min(1.852dvw,8px) min(2.778dvw,12px);
  }
  /* .information_header {
  } */
  .information_header h4 {
    font-size: min(3.704dvw,16px);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .information_header svg {
    display: none;
  }
  .information_details {
    gap: min(1.852dvw,8px);
  }
  .rating_list {
    gap: min(1.852dvw,8px);
    font-size: min(2.315dvw,10px);
  }
  .rating_item {
    gap: min(0.926dvw,4px);
    padding-right:   min(1.852dvw,8px);
    border-right: min(0.231dvw,1px) solid #E0E0E0;
    font-size:  min(2.315dvw,10px);
  }
  .rating_item p {
    font-size: min(2.315dvw,10px);
  }
  .price {
    width: 100%;
    height: min(7.407dvw,32px);
  }
  .price h3 {
    font-size:  min(4.63dvw,20px);
  }
  .grid_container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    gap: min(0.926dvw,4px);
  }
  .grid_item {
    width: min(13.889dvw,60px);
    height: min(13.889dvw,60px);
    flex-direction: column;
    border-radius: min(0.926dvw,4px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  }
  .product_img {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .stocks {
    height: fit-content;
    gap: min(1.852dvw,8px);
  }
  .stocks h6 {
    width: min(13.889dvw,60px);
    font-size: min(2.778dvw,12px);
  }
  .stocks p {
    font-size: min(2.315dvw,10px);
  }
  .stocks_list {
    height: min(5.556dvw,24px);
    border-radius: min(0.926dvw,4px);
    overflow: hidden;
    /* border: 1px solid #E0E0E0; */
  }
  .stocks_list input {
    
    min-width: min(5.556dvw,24px);
    max-width: min(13.889dvw,60px);
    height: min(5.556dvw,24px);
    border: min(0.231dvw,1px) solid #e0e0e0;
    padding: min(0.926dvw,4px) min(1.852dvw,8px);
    font-size: min(2.778dvw,12px);
  }
  .stocks_list button {
    width: min(5.556dvw,24px);
    height: min(5.556dvw,24px);
    padding: min(0.926dvw,4px) min(1.852dvw,8px);
    border: min(0.231dvw,1px) solid #e0e0e0;
    font-size: min(2.778dvw,12px);
  }

  .stocks_list .reduce {
    border-radius: min(0.926dvw,4px) 0px 0px min(0.926dvw,4px);
  }
  .stocks_list .add {
    border-radius: 0px min(0.926dvw,4px) min(0.926dvw,4px) 0px;
  } 
  .sizes {
    width: 100%;
    height: fit-content;
    justify-content: start;
    gap:min(1.852dvw,8px);
  }
  .sizes h6 {
    width: min(13.889dvw,60px);
    font-size: min(2.778dvw,12px);
    font-weight: 400;
  }
  .sizes ul {
    gap: min(1.852dvw,8px);
    flex-wrap: wrap;
  }
  .sizes li {
    gap: min(1.852dvw,8px);
  }
  .sizes li button {
    height: min(6.481dvw,28px);
    border: min(0.231dvw,1px) solid #e0e0e0;
    border-radius: min(0.926dvw,4px);
    padding: min(0.926dvw,4px)  min(1.852dvw,8px);
    font-size: min(2.778dvw,12px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  }
  .wrapper_apply_buy {
    gap:min(1.852dvw,8px);
  }
  
  .wrapper_apply_buy button {
    height: min(8.333dvw,36px);
    border: min(0.231dvw,1px) solid #26ac34;
    border-radius: min(0.926dvw,4px);
    font-size: min(2.778dvw,12px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  }
  .wrapper_apply_buy button:nth-child(1){
    border: min(0.231dvw,1px) solid #26ac34;
    border-radius: min(0.926dvw,4px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  }

}
</style>
