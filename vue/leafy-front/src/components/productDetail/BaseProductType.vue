<script setup>
import { ref, computed } from 'vue'

let origin = `${import.meta.env.VITE_BASE_URL}`;

defineEmits(["selectedStyle"])

let props = defineProps({
    productStyle: {
        type: Object,
        default: {},
        required: true
    },
    selectedStyle: {
        type: Object,
        default: {},
        required: true
    }
})

let stepInput = ref(1)
let slideImage = ref(0)
let maxImage = ref(0)

let detectNumber = (input) => {
    // console.log(input.target.value)

    // Remove any non-digit characters
    const sanitizedInput = input.target.value.replace(/\D/g, '');
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
}

let rightAdd = () => {
    console.log(stepInput.value < selectedStyle.value.stock)
    stepInput.value = stepInput.value < selectedStyle.value.stock ? stepInput.value + 1 : stepInput.value
}

let leftSubstract = () => {
    console.log(stepInput.value > 1)
    stepInput.value = stepInput.value > 1 ? stepInput.value - 1 : stepInput.value
}

let productStyle = computed(() => {
    return props.productStyle
})

let selectedStyle = computed(() => {
    stepInput.value = 1
    slideImage.value = 0
    maxImage.value = (selectedStyle.images == undefined || selectedStyle.images.length < 1) ? 1 : selectedStyle.images.length - 1
    return props.selectedStyle
})

let selectedImage = (idx) => {
    // console.log(idx)
    slideImage.value = idx
}

let imageLeft = () => {
    // console.log("T")
    slideImage.value = slideImage.value ? slideImage.value - 1 : slideImage.value
}

let imageRight = () => {
    // console.log("T")
    slideImage.value = slideImage.value < maxImage.value ? slideImage.value + 1 : slideImage.value
}

</script>
<template>
    <div class="wrapper_Product_type">
        <div class="images">
            <div class="styles">
                <ul>
                    <li v-for="(value, idx) in selectedStyle.images" :key="idx">
                        <button @click="selectedImage(idx)">
                            <!-- {{ `${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${value}` }} -->
                            <!-- `${origin}/api/image/users/${designer.userId}/${designer.image}` -->
                            <img :src="`${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${value}`" alt="image_style">
                        </button>
                    </li>
                </ul>
            </div>
            <div class="show_image">
                <img v-if="selectedStyle.images && selectedStyle.images.length" :src="`${origin}/api/image/products/${productStyle.itemId}/${selectedStyle.style}/${selectedStyle.images[slideImage]}`" alt="image_style">
                <img v-else-if="productStyle.image && selectedStyle.images == undefined" :src="`${origin}/api/image/products/${productStyle.itemId}/${productStyle.image}`" alt="image_style">
                <img v-else-if="selectedStyle.images && selectedStyle.images.length === 0" src="../../assets/vue.svg" alt="image_style">
                <img v-else src="../../assets/vue.svg" alt="image_style">
                <!-- {{ productStyle }} -->
                <div v-show="selectedStyle.images !== undefined && selectedStyle.images.length > 1">
                    <button @click="imageLeft">
                        <!-- <img src="../../assets/home_p/icon/left.png" alt="previous"> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.4001 15.5997L6.80011 9.99966L12.4001 4.39966" stroke="#212121" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button @click="imageRight">
                        <!-- <img src="../../assets/home_p/icon/right.png" alt="next"> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.6001 4.39966L13.2001 9.99966L7.6001 15.5997" stroke="#212121" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="information">
            <!-- <h4>
                Prolyscias Fabian {{ productStyle }}
            </h4> -->
            <h4>
                {{ productStyle.name }}
            </h4>
            <div class="">
                <!-- for show rating and sold -->
                <div>
                    <div>
                        <!-- <h5>4.6</h5> -->
                        <div> {{ productStyle.totalRating }}
                            {{ Math.floor(productStyle.totalRating) === 5 ? "⭐⭐⭐⭐⭐" :
                                Math.floor(productStyle.totalRating) === 4 ? "⭐⭐⭐⭐" :
                                    Math.floor(productStyle.totalRating) === 3 ? "⭐⭐⭐" :
                                        Math.floor(productStyle.totalRating) === 2 ? "⭐⭐" :
                                            Math.floor(productStyle.totalRating) === 1 ? "⭐" : "" }}
                        </div>

                        <!-- <div v-for="(n, index) of Math.floor(product.totalRating)" :key="index" class="rating_fill">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path
                                    d="M5.42934 1.75625C5.60934 1.20365 6.39114 1.20365 6.57054 1.75625L7.21254 3.73145C7.25176 3.85174 7.32801 3.95655 7.43038 4.03091C7.53275 4.10526 7.65601 4.14535 7.78254 4.14545H9.85974C10.4411 4.14545 10.6823 4.88945 10.2125 5.23145L8.53254 6.45185C8.42995 6.52626 8.35357 6.63125 8.31434 6.75176C8.2751 6.87226 8.27503 7.0021 8.31414 7.12265L8.95614 9.09785C9.13614 9.65045 8.50314 10.1106 8.03214 9.76865L6.35214 8.54825C6.24966 8.47385 6.12627 8.43378 5.99964 8.43378C5.873 8.43378 5.74961 8.47385 5.64714 8.54825L3.96714 9.76865C3.49674 10.1106 2.86434 9.65045 3.04374 9.09785L3.68574 7.12265C3.72484 7.0021 3.72477 6.87226 3.68554 6.75176C3.6463 6.63125 3.56992 6.52626 3.46734 6.45185L1.78794 5.23205C1.31814 4.89005 1.55994 4.14605 2.14074 4.14605H4.21734C4.34396 4.14608 4.46736 4.10605 4.56985 4.03169C4.67234 3.95732 4.74868 3.85244 4.78794 3.73205L5.42994 1.75685L5.42934 1.75625Z"
                                    fill="#FFCE3D" />
                            </svg>
                        </div>
                        <div v-for="(n, index) of 5 - Math.floor(product.totalRating)" :key="index" class="rating_empty">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path
                                    d="M5.42934 1.75625C5.60934 1.20365 6.39114 1.20365 6.57054 1.75625L7.21254 3.73145C7.25176 3.85174 7.32801 3.95655 7.43038 4.03091C7.53275 4.10526 7.65601 4.14535 7.78254 4.14545H9.85974C10.4411 4.14545 10.6823 4.88945 10.2125 5.23145L8.53254 6.45185C8.42995 6.52626 8.35357 6.63125 8.31434 6.75176C8.2751 6.87226 8.27503 7.0021 8.31414 7.12265L8.95614 9.09785C9.13614 9.65045 8.50314 10.1106 8.03214 9.76865L6.35214 8.54825C6.24966 8.47385 6.12627 8.43378 5.99964 8.43378C5.873 8.43378 5.74961 8.47385 5.64714 8.54825L3.96714 9.76865C3.49674 10.1106 2.86434 9.65045 3.04374 9.09785L3.68574 7.12265C3.72484 7.0021 3.72477 6.87226 3.68554 6.75176C3.6463 6.63125 3.56992 6.52626 3.46734 6.45185L1.78794 5.23205C1.31814 4.89005 1.55994 4.14605 2.14074 4.14605H4.21734C4.34396 4.14608 4.46736 4.10605 4.56985 4.03169C4.67234 3.95732 4.74868 3.85244 4.78794 3.73205L5.42994 1.75685L5.42934 1.75625Z"
                                    fill="#E0E0E0" />
                            </svg>
                        </div> -->
                    </div>
                    <!-- <h5>
                        1 sold
                    </h5> -->
                    <h5>
                        {{ productStyle.sold }} sold
                    </h5>
                </div>
                <!-- for show price -->
                <div>
                    <!-- <h5>
                        80.00
                    </h5> -->
                    <h5>
                        ฿{{ productStyle.price }}
                    </h5>
                </div>
                <!-- for show type -->
                <div v-for="(style, idx) in productStyle.styles" :key="idx">
                    <button @click="$emit('selectedStyle', idx)"> 
                        <img v-if="style.images !== undefined && style.images[0] !== undefined"
                        :src="`${origin}/api/image/products/${productStyle.itemId}/${productStyle.styles[idx].style}/${productStyle.styles[idx].images[0]}`"
                        alt="product_type" width="88" height="88">
                        <img v-else src="../../assets/vue.svg" alt="product_type" width="88" height="88">
                    </button>
                    <!-- <button>
                        <img src="../../assets/vue.svg" alt="product_type">
                    </button> -->
                </div>
                <!-- for select quantity and show stock -->
                <div>
                    <h5>
                        quantity
                    </h5>
                    <div>
                        <button @click="leftSubstract">
                            &lt;
                        </button>
                        <input type="text" @input="detectNumber" v-model="stepInput"/>
                        <button @click="rightAdd">
                            &gt;
                        </button>
                    </div>
                    <!-- <h5>
                        13 pieces avaliable
                    </h5> -->
                    <h5>
                        {{ selectedStyle.stock }} pieces avaliable
                    </h5>
                </div>
                <!-- button for add and buy -->
                <div>
                    <button>
                        Add to Cart
                    </button>
                    <button>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_Product_type {
    display: flex;
    width: 1120px;
    height: fit-content;
    padding: 20px;
    gap: 20px;
}

.images {
    display: flex;
    width: 396px;
    height: 448px;
    gap: 12px;
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
    gap: 8px;
}

.styles ul li {
    width: 80px;
    height: 80px;
}

.styles ul li button {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: rgb(196, 196, 196);
}

.styles ul li button img {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
}

.styles::-webkit-scrollbar {
    display: none;
}

.show_image {
    display: flex;
    width: 304px;
    height: 448px;
    position: relative;
    justify-content: center;
    align-items: center;
}

.show_image div {
    display: flex;
    width: fit-content;
    height: fit-content;
    padding: 12px;
    position: absolute;
    gap: 8px;
    right: 0;
    bottom: 0;
}

.show_image div button {
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    justify-content: center;
    align-items: center;
    /* flex-grow: 1; */
}

.show_image div button svg {
    width: 19px;
    height: 19px;
}

.show_image img {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
}

.information {
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
}

/* Chrome, Safari, Edge, Opera */
/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */
</style>